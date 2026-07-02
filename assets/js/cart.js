(() => {
  const CART_KEY = 'imuneliaCart:v1';
  const CONTACT_EMAIL = 'info@imunelia.com';

  const formatLine = (item) => `${item.quantity}x ${item.name} (${item.variant})`;

  const readCart = () => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.name) : [];
    } catch (_) {
      return [];
    }
  };

  const writeCart = (items) => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const createEl = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };

  const getTotalCount = (items) => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  const buildCart = () => {
    const trigger = createEl('button', 'cart-fab', 'Košík');
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Otevřít košík');
    trigger.setAttribute('aria-expanded', 'false');

    const count = createEl('span', 'cart-fab-count', '0');
    trigger.append(count);

    const overlay = createEl('div', 'cart-overlay');
    overlay.hidden = true;

    const panel = createEl('aside', 'cart-panel');
    panel.setAttribute('aria-label', 'Košík Imunelia');

    const header = createEl('div', 'cart-panel-header');
    const titleWrap = createEl('div');
    titleWrap.append(createEl('p', 'section-kicker', 'Košík'));
    titleWrap.append(createEl('h2', null, 'Vaše produktové linie'));
    const close = createEl('button', 'cart-close', 'Zavřít');
    close.type = 'button';
    close.setAttribute('aria-label', 'Zavřít košík');
    header.append(titleWrap, close);

    const notice = createEl('p', 'cart-notice', 'Toto je nezávazná poptávka. Web je statický, objednávka se připraví k odeslání e-mailem.');
    const list = createEl('div', 'cart-items');
    const empty = createEl('p', 'cart-empty', 'Košík je zatím prázdný. Vyberte jednu nebo více produktových linií.');

    const form = createEl('form', 'cart-form');
    form.noValidate = true;

    const nameLabel = createEl('label', null, 'Jméno');
    const nameInput = createEl('input');
    nameInput.name = 'name';
    nameInput.autocomplete = 'name';
    nameInput.placeholder = 'Vaše jméno';
    nameLabel.append(nameInput);

    const emailLabel = createEl('label', null, 'E-mail');
    const emailInput = createEl('input');
    emailInput.name = 'email';
    emailInput.type = 'email';
    emailInput.autocomplete = 'email';
    emailInput.placeholder = 'vas@email.cz';
    emailLabel.append(emailInput);

    const noteLabel = createEl('label', null, 'Poznámka');
    const noteInput = createEl('textarea');
    noteInput.name = 'note';
    noteInput.rows = 4;
    noteInput.placeholder = 'Množství, dotaz k dostupnosti nebo distribuci.';
    noteLabel.append(noteInput);

    const warning = createEl('p', 'cart-warning', 'Do poznámky nevkládejte citlivé zdravotní údaje ani laboratorní výsledky.');
    const submit = createEl('button', 'button primary cart-submit', 'Připravit e-mailovou poptávku');
    submit.type = 'submit';
    const clear = createEl('button', 'button secondary cart-clear', 'Vyprázdnit košík');
    clear.type = 'button';

    form.append(nameLabel, emailLabel, noteLabel, warning, submit, clear);
    panel.append(header, notice, list, empty, form);
    overlay.append(panel);
    document.body.append(trigger, overlay);

    const openCart = () => {
      overlay.hidden = false;
      document.body.classList.add('cart-open');
      trigger.setAttribute('aria-expanded', 'true');
      close.focus();
    };

    const closeCart = () => {
      overlay.hidden = true;
      document.body.classList.remove('cart-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    };

    const render = () => {
      const items = readCart();
      count.textContent = String(getTotalCount(items));
      trigger.classList.toggle('has-items', items.length > 0);
      list.replaceChildren();
      empty.hidden = items.length > 0;
      form.hidden = items.length === 0;

      items.forEach((item) => {
        const row = createEl('article', 'cart-item');
        const info = createEl('div', 'cart-item-info');
        info.append(createEl('h3', null, item.name));
        info.append(createEl('p', null, item.variant));
        info.append(createEl('small', null, 'Cena na dotaz'));

        const controls = createEl('div', 'cart-item-controls');
        const minus = createEl('button', null, '-');
        minus.type = 'button';
        minus.setAttribute('aria-label', `Snížit množství ${item.name}`);
        const qty = createEl('span', null, String(item.quantity));
        const plus = createEl('button', null, '+');
        plus.type = 'button';
        plus.setAttribute('aria-label', `Zvýšit množství ${item.name}`);
        const remove = createEl('button', 'cart-remove', 'Odebrat');
        remove.type = 'button';

        minus.addEventListener('click', () => updateQuantity(item.id, -1));
        plus.addEventListener('click', () => updateQuantity(item.id, 1));
        remove.addEventListener('click', () => removeItem(item.id));

        controls.append(minus, qty, plus, remove);
        row.append(info, controls);
        list.append(row);
      });
    };

    const addItem = (product) => {
      const items = readCart();
      const existing = items.find((item) => item.id === product.id);
      if (existing) existing.quantity += 1;
      else items.push({ ...product, quantity: 1 });
      writeCart(items);
      render();
      openCart();
    };

    const updateQuantity = (id, delta) => {
      const items = readCart()
        .map((item) => item.id === id ? { ...item, quantity: Math.max(0, Number(item.quantity || 0) + delta) } : item)
        .filter((item) => item.quantity > 0);
      writeCart(items);
      render();
    };

    const removeItem = (id) => {
      writeCart(readCart().filter((item) => item.id !== id));
      render();
    };

    document.querySelectorAll('[data-cart-add]').forEach((button) => {
      button.addEventListener('click', () => {
        addItem({
          id: button.dataset.productId,
          name: button.dataset.productName,
          variant: button.dataset.productVariant || '10 podjazykových tablet'
        });
      });
    });

    trigger.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeCart();
    });
    clear.addEventListener('click', () => {
      writeCart([]);
      render();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !overlay.hidden) closeCart();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const items = readCart();
      if (!items.length) return;
      const lines = items.map(formatLine).join('\n');
      const body = [
        'Dobrý den,',
        '',
        'mám zájem o tyto produktové linie Imunelia:',
        lines,
        '',
        `Jméno: ${nameInput.value.trim()}`,
        `E-mail: ${emailInput.value.trim()}`,
        '',
        'Poznámka:',
        noteInput.value.trim(),
        '',
        'Prosím o informace k dostupnosti a dalšímu postupu.'
      ].join('\n');
      const subject = 'Poptávka produktů Imunelia';
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    render();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildCart);
  else buildCart();
})();
