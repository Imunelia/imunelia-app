(() => {
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-contact-status]');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const message = String(data.get('message') || '').trim();

    const body = [
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      `Typ zájmu: ${interest}`,
      '',
      message
    ].join('\n');

    const subject = interest ? `Immunalia - ${interest}` : 'Immunalia - kontakt';
    const mailto = `mailto:info@imunelia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = 'Zpráva je připravená v e-mailovém klientovi. Do formuláře nevkládejte citlivé zdravotní údaje ani laboratorní výsledky.';
    window.location.href = mailto;
  });
})();
