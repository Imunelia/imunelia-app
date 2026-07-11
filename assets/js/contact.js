(() => {
  const isEnglish = document.documentElement.lang === 'en';
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
      `${isEnglish ? 'Name' : 'Jméno'}: ${name}`,
      `E-mail: ${email}`,
      `${isEnglish ? 'Interest type' : 'Typ zájmu'}: ${interest}`,
      '',
      message
    ].join('\n');

    const subject = interest ? `Immunalia - ${interest}` : `Immunalia - ${isEnglish ? 'contact' : 'kontakt'}`;
    const mailto = `mailto:info@imunelia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = isEnglish
      ? 'The message is ready in your email client. Do not include sensitive health data or laboratory results in the form.'
      : 'Zpráva je připravená v e-mailovém klientovi. Do formuláře nevkládejte citlivé zdravotní údaje ani laboratorní výsledky.';
    window.location.href = mailto;
  });
})();
