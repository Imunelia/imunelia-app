(() => {
  const demoRows = [
    { id: 'DEMO-001', date: '2026-01-10', index: 18, unit: 'demo index' },
    { id: 'DEMO-001', date: '2026-02-14', index: 21, unit: 'demo index' },
    { id: 'DEMO-001', date: '2026-03-18', index: 19, unit: 'demo index' },
    { id: 'DEMO-002', date: '2026-01-12', index: 12, unit: 'demo index' },
    { id: 'DEMO-002', date: '2026-02-20', index: 15, unit: 'demo index' },
    { id: 'DEMO-002', date: '2026-03-24', index: 14, unit: 'demo index' }
  ];

  const state = { selectedId: 'DEMO-001' };
  const fixedNotice = 'Toto je orientační vizualizace syntetických demo dat. Panel neslouží k diagnostice, léčbě ani samostatnému rozhodování.';

  const $ = (id) => document.getElementById(id);

  function clearNode(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function appendTextCell(row, text, tag = 'td') {
    const cell = document.createElement(tag);
    cell.textContent = String(text ?? '');
    row.appendChild(cell);
    return cell;
  }

  function currentRows() {
    return demoRows.filter((row) => row.id === state.selectedId);
  }

  function renderSelector() {
    const select = $('demo-subject');
    if (!select) return;
    clearNode(select);
    [...new Set(demoRows.map((row) => row.id))].forEach((id) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = id;
      select.appendChild(option);
    });
    select.value = state.selectedId;
  }

  function renderSummary() {
    const rows = currentRows();
    const count = $('summary-count');
    const last = $('summary-last');
    const trend = $('summary-trend');
    if (count) count.textContent = `${rows.length} syntetická demo měření`;
    if (last) {
      const latest = rows[rows.length - 1];
      last.textContent = latest ? `${latest.index} ${latest.unit}` : '--';
    }
    if (trend) trend.textContent = rows.length > 1 ? 'ukázkový trend v čase' : 'demo bez trendu';
  }

  function renderTable() {
    const tbody = document.querySelector('#il8-table tbody');
    if (!tbody) return;
    clearNode(tbody);
    currentRows().forEach((item) => {
      const row = document.createElement('tr');
      appendTextCell(row, item.id);
      appendTextCell(row, item.date);
      appendTextCell(row, item.index);
      appendTextCell(row, item.unit);
      appendTextCell(row, 'syntetická demo data');
      tbody.appendChild(row);
    });
  }

  function renderChart() {
    const canvas = $('il8-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const rows = currentRows();

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#e4d8c5';
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i += 1) {
      const y = 48 + i * 64;
      ctx.beginPath();
      ctx.moveTo(58, y);
      ctx.lineTo(width - 34, y);
      ctx.stroke();
    }

    if (!rows.length) return;

    const values = rows.map((row) => row.index);
    const min = Math.min(...values) - 2;
    const max = Math.max(...values) + 2;
    const xFor = (index) => 70 + (rows.length === 1 ? 0 : index * ((width - 128) / (rows.length - 1)));
    const yFor = (value) => height - 60 - ((value - min) / (max - min || 1)) * (height - 112);

    ctx.strokeStyle = '#08295b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    rows.forEach((row, index) => {
      const x = xFor(index);
      const y = yFor(row.index);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    rows.forEach((row, index) => {
      const x = xFor(index);
      const y = yFor(row.index);
      ctx.fillStyle = '#b88b43';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#26364e';
      ctx.font = '15px Arial';
      ctx.fillText(String(row.index), x - 9, y - 15);
    });

    ctx.fillStyle = '#6c7280';
    ctx.font = '14px Arial';
    ctx.fillText(rows[0].date, 64, height - 24);
    ctx.fillText(rows[rows.length - 1].date, width - 138, height - 24);
  }

  function renderNotice() {
    const notice = $('interpretation');
    if (notice) notice.textContent = fixedNotice;
  }

  function render() {
    renderSelector();
    renderSummary();
    renderTable();
    renderChart();
    renderNotice();
  }

  $('demo-subject')?.addEventListener('change', (event) => {
    state.selectedId = event.target.value;
    render();
  });

  render();
})();
