(() => {
  const state = {
    il8: JSON.parse(localStorage.getItem('imunelia.il8') || '[]'),
    cardio: JSON.parse(localStorage.getItem('imunelia.cardio') || '[]'),
    diagnosis: localStorage.getItem('imunelia.diagnosis') || '',
    note: localStorage.getItem('imunelia.note') || '',
    plDataset: null
  };

  const $ = (id) => document.getElementById(id);
  const normalize = (name) => String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '');
  const parseNumber = (value) => {
    if (value == null) return null;
    const number = Number(String(value).replace(',', '.').replace(/[^0-9.\-]/g, ''));
    return Number.isFinite(number) ? number : null;
  };
  const parseDate = (value) => {
    if (!value) return '';
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
    if (typeof value === 'number' && window.XLSX && XLSX.SSF) {
      const parsed = XLSX.SSF.parse_date_code(value);
      if (parsed) return new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d)).toISOString().slice(0, 10);
    }
    const text = String(value).trim();
    const parts = text.match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{2,4})$/);
    if (parts) {
      const year = parts[3].length === 2 ? '20' + parts[3] : parts[3];
      return year + '-' + parts[2].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
    }
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? text : date.toISOString().slice(0, 10);
  };
  const find = (row, names) => {
    const map = Object.keys(row).reduce((acc, key) => { acc[normalize(key)] = row[key]; return acc; }, {});
    for (const name of names) {
      const value = map[normalize(name)];
      if (value !== undefined && value !== '') return value;
    }
    return '';
  };

  async function readFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (['csv', 'tsv'].includes(ext)) {
      const text = await file.text();
      const delimiter = ext === 'tsv' ? '\t' : (text.includes(';') ? ';' : ',');
      const lines = text.split(/\r?\n/).filter(Boolean);
      const headers = lines.shift().split(delimiter).map(h => h.trim());
      return lines.map(line => {
        const cells = line.split(delimiter).map(c => c.trim());
        return headers.reduce((row, header, i) => { row[header] = cells[i] || ''; return row; }, {});
      });
    }
    if (!window.XLSX) throw new Error('Pro načtení Excelu je potřeba internetové připojení kvůli knihovně XLSX. Soubor můžete uložit také jako CSV.');
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
    const first = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(first, { defval: '' });
  }

  function rowsToIl8(rows) {
    return rows.map(row => ({
      date: parseDate(find(row, ['datum', 'date', 'datum odberu', 'odběr', 'measurement date'])),
      value: parseNumber(find(row, ['il8', 'il-8', 'cxcl8', 'hodnota', 'value', 'result'])),
      unit: find(row, ['jednotka', 'unit', 'units']) || 'pg/ml',
      lab: find(row, ['laborator', 'laboratoř', 'lab', 'laboratory']),
      note: find(row, ['poznamka', 'poznámka', 'note', 'komentar', 'komentář'])
    })).filter(row => row.date && row.value != null).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }
  function patientToIl8(patient) {
    state.diagnosis = patient.diagnosis || '';
    state.note = 'Zdroj: PL odběry výsledky. Rok narození: ' + (patient.year || 'neuvedeno') + '. Souhlas: ' + (patient.consent || 'neuvedeno') + '.';
    return (patient.measurements || []).map(measurement => {
      const il8 = measurement.IL8 || measurement['IL-8'] || measurement.CXCL8;
      if (!il8 || il8.value == null) return null;
      const extras = [];
      ['TNFa','IL6','CRP','PSA','S_RF'].forEach(key => {
        if (measurement[key] && measurement[key].raw) extras.push(key + ': ' + measurement[key].raw);
      });
      return { date: measurement.date, value: il8.value, unit: 'pg/ml', lab: measurement.label || '', note: extras.join(', ') };
    }).filter(Boolean).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }
  function rowsToCardio(rows) {
    return rows.map(row => ({
      date: parseDate(find(row, ['datum', 'date', 'measurement date'])),
      pulse: parseNumber(find(row, ['tep', 'pulse', 'hr', 'heart rate'])),
      sys: parseNumber(find(row, ['systolicky', 'systolický', 'systolic', 'sys'])),
      dia: parseNumber(find(row, ['diastolicky', 'diastolický', 'diastolic', 'dia'])),
      hrv: parseNumber(find(row, ['hrv'])),
      spo2: parseNumber(find(row, ['spo2', 'sp o2', 'saturace'])),
      note: find(row, ['poznamka', 'poznámka', 'note'])
    })).filter(row => row.date || row.pulse || row.sys || row.dia || row.hrv || row.spo2).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }

  function save() {
    localStorage.setItem('imunelia.il8', JSON.stringify(state.il8));
    localStorage.setItem('imunelia.cardio', JSON.stringify(state.cardio));
    localStorage.setItem('imunelia.diagnosis', state.diagnosis);
    localStorage.setItem('imunelia.note', state.note);
  }
  function populatePatients() {
    const select = $('patient-select');
    if (!select || !state.plDataset) return;
    select.innerHTML = '<option value="">Vyberte pacienta</option>' + state.plDataset.patients.map((patient, index) => '<option value="' + index + '">' + patient.name + (patient.diagnosis ? ' - ' + patient.diagnosis : '') + '</option>').join('');
    const context = $('patient-context');
    if (context) context.textContent = 'Dataset načten: ' + state.plDataset.patientCount + ' záznamů ze souboru ' + state.plDataset.source + '.';
  }
  function renderPatientContext(patient) {
    const context = $('patient-context');
    if (!context) return;
    if (!patient) { context.textContent = state.plDataset ? 'Vyberte pacienta pro zobrazení odběrů.' : 'Dataset zatím není načtený.'; return; }
    const il8Count = (patient.measurements || []).filter(m => { const il8 = m.IL8 || m['IL-8'] || m.CXCL8; return il8 && il8.value != null; }).length;
    context.innerHTML = '<b>' + patient.name + '</b><br>Rok narození: ' + (patient.year || 'neuvedeno') + '<br>Diagnóza: ' + (patient.diagnosis || 'neuvedeno') + '<br>Odběry s IL-8: ' + il8Count;
  }

  function renderChart() {
    const canvas = $('il8-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#e5ddd0'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) { const y = 44 + i * 70; ctx.beginPath(); ctx.moveTo(62, y); ctx.lineTo(w - 32, y); ctx.stroke(); }
    const data = state.il8.filter(d => d.value != null);
    if (!data.length) { ctx.fillStyle = '#6c7280'; ctx.font = '22px Arial'; ctx.fillText('Nahrajte data IL-8 pro zobrazení grafu.', 72, 205); return; }
    const values = data.map(d => d.value);
    const min = Math.min(...values, 0), max = Math.max(...values, 1), pad = Math.max((max - min) * 0.12, 1);
    const yMin = min, yMax = max + pad;
    const xFor = (i) => 72 + (data.length === 1 ? 0 : i * ((w - 124) / (data.length - 1)));
    const yFor = (v) => h - 58 - ((v - yMin) / (yMax - yMin || 1)) * (h - 112);
    ctx.strokeStyle = '#08295b'; ctx.lineWidth = 4; ctx.beginPath();
    data.forEach((d, i) => { const x = xFor(i), y = yFor(d.value); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
    data.forEach((d, i) => { const x = xFor(i), y = yFor(d.value); ctx.fillStyle = '#b88b43'; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#061f42'; ctx.font = '16px Arial'; ctx.fillText(String(d.value), x - 10, y - 16); });
    ctx.fillStyle = '#6c7280'; ctx.font = '14px Arial'; ctx.fillText(data[0].date, 72, h - 24); ctx.fillText(data[data.length - 1].date, w - 150, h - 24);
  }
  function interpretation() {
    const box = $('interpretation');
    if (!box) return;
    const data = state.il8;
    if (!data.length) { box.textContent = 'Nahrajte data IL-8 nebo přidejte měření ručně.'; return; }
    const first = data[0].value, last = data[data.length - 1].value, delta = last - first, pct = first ? (delta / first) * 100 : 0;
    const trend = Math.abs(pct) < 10 ? 'stabilní trend' : pct > 0 ? 'rostoucí trend' : 'klesající trend';
    const diagnosis = state.diagnosis ? ' Diagnóza / závěr: ' + state.diagnosis + '.' : '';
    const note = state.note ? ' Popis: ' + state.note : '';
    box.textContent = 'V datech je ' + data.length + ' měření. Od první k poslední hodnotě vychází ' + trend + ' (' + (delta >= 0 ? '+' : '') + delta.toFixed(2) + ' ' + (data[data.length - 1].unit || '') + ').' + diagnosis + note + ' Výsledek je orientační a musí být posouzen odborníkem.';
  }
  function renderTables() {
    const tbody = document.querySelector('#il8-table tbody');
    if (tbody) tbody.innerHTML = state.il8.map(row => '<tr><td>' + row.date + '</td><td>' + row.value + '</td><td>' + (row.unit || '') + '</td><td>' + (row.lab || '') + '</td><td>' + (row.note || '') + '</td></tr>').join('');
    const cbody = document.querySelector('#cardio-table tbody');
    if (cbody) cbody.innerHTML = state.cardio.map(row => '<tr><td>' + (row.date || '') + '</td><td>' + (row.pulse ?? '') + '</td><td>' + (row.sys || row.dia ? (row.sys || '--') + '/' + (row.dia || '--') : '') + '</td><td>' + (row.hrv ?? '') + '</td><td>' + (row.spo2 ?? '') + '</td><td>' + (row.note || '') + '</td></tr>').join('');
  }
  function renderSummary() {
    if ($('diagnosis')) $('diagnosis').value = state.diagnosis;
    if ($('clinical-note')) $('clinical-note').value = state.note;
    const count = state.il8.length;
    if ($('summary-count')) $('summary-count').textContent = count === 1 ? '1 měření' : count + ' měření';
    if ($('summary-last')) $('summary-last').textContent = count ? state.il8[count - 1].value + ' ' + (state.il8[count - 1].unit || '') : '--';
    if ($('summary-trend')) {
      if (count < 2) $('summary-trend').textContent = count ? 'jedna hodnota' : 'bez dat';
      else { const delta = state.il8[count - 1].value - state.il8[0].value; $('summary-trend').textContent = delta > 0 ? 'rostoucí' : delta < 0 ? 'klesající' : 'beze změny'; }
    }
    const cardio = $('cardio-summary');
    if (cardio) {
      if (!state.cardio.length) cardio.textContent = 'Kardio data zatím nejsou nahraná.';
      else { const pulses = state.cardio.map(r => r.pulse).filter(Number.isFinite); const avg = pulses.length ? Math.round(pulses.reduce((a, b) => a + b, 0) / pulses.length) : null; cardio.textContent = 'Nahráno ' + state.cardio.length + ' kardio měření.' + (avg ? ' Průměrný tep v nahraných datech je přibližně ' + avg + ' / min.' : '') + ' Hodnoty je vhodné porovnávat s datem odběru IL-8.'; }
    }
  }
  function render() { state.il8.sort((a, b) => String(a.date).localeCompare(String(b.date))); state.cardio.sort((a, b) => String(a.date).localeCompare(String(b.date))); save(); renderSummary(); renderChart(); interpretation(); renderTables(); }

  $('load-pl-dataset')?.addEventListener('click', async () => { try { const response = await fetch('assets/pl-odbery-vysledky.json'); state.plDataset = await response.json(); populatePatients(); renderPatientContext(null); } catch (error) { alert('Dataset PL odběry se nepodařilo načíst: ' + error.message); } });
  $('patient-select')?.addEventListener('change', (event) => { if (!state.plDataset || event.target.value === '') return; const patient = state.plDataset.patients[Number(event.target.value)]; state.il8 = patientToIl8(patient); renderPatientContext(patient); render(); });
  $('il8-file')?.addEventListener('change', async (event) => { try { const rows = await readFile(event.target.files[0]); state.il8 = rowsToIl8(rows); render(); } catch (error) { alert(error.message); } });
  $('cardio-file')?.addEventListener('change', async (event) => { try { const rows = await readFile(event.target.files[0]); state.cardio = rowsToCardio(rows); render(); } catch (error) { alert(error.message); } });
  $('add-manual')?.addEventListener('click', () => { const value = parseNumber($('manual-value').value); if (!$('manual-date').value || value == null) { alert('Doplňte datum a hodnotu IL-8.'); return; } state.il8.push({ date: $('manual-date').value, value, unit: $('manual-unit').value || 'pg/ml', lab: '', note: 'Ručně přidáno' }); $('manual-value').value = ''; render(); });
  $('diagnosis')?.addEventListener('input', e => { state.diagnosis = e.target.value; render(); });
  $('clinical-note')?.addEventListener('input', e => { state.note = e.target.value; render(); });
  $('clear-il8')?.addEventListener('click', () => { state.il8 = []; render(); });
  $('clear-cardio')?.addEventListener('click', () => { state.cardio = []; render(); });
  $('export-il8')?.addEventListener('click', () => { const rows = [['Datum','IL-8','Jednotka','Laboratoř','Poznámka'], ...state.il8.map(r => [r.date, r.value, r.unit || '', r.lab || '', r.note || ''])]; const csv = rows.map(row => row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(';')).join('\n'); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'imunelia-il8-export.csv'; a.click(); URL.revokeObjectURL(a.href); });
  render();
})();
