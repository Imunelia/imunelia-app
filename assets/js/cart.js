(() => {
  const isEnglish = document.documentElement.lang === 'en';
  const checkoutConfig = {
    balanceCheckoutUrl: '',
    restartCheckoutUrl: '',
    shieldCheckoutUrl: '',
    flowCheckoutUrl: '',
    nightCheckoutUrl: '',
    ultraCheckoutUrl: ''
  };

  window.ImmunaliaCheckoutConfig = checkoutConfig;
  window.ImuneliaCheckoutConfig = checkoutConfig;

  const checkoutUrlByProduct = {
    balance: checkoutConfig.balanceCheckoutUrl,
    restart: checkoutConfig.restartCheckoutUrl,
    shield: checkoutConfig.shieldCheckoutUrl,
    flow: checkoutConfig.flowCheckoutUrl,
    night: checkoutConfig.nightCheckoutUrl,
    ultra: checkoutConfig.ultraCheckoutUrl
  };

  const productLabels = {
    balance: 'Balance',
    restart: 'Restart',
    shield: 'Shield',
    flow: 'Flow',
    night: 'Night',
    ultra: 'ULTRA'
  };

  const resolveCheckoutUrl = (productId) => checkoutUrlByProduct[productId] || '';

  const handleOrderClick = (event) => {
    const trigger = event.currentTarget;
    const productId = trigger.dataset.product;
    const checkoutUrl = resolveCheckoutUrl(productId);

    if (checkoutUrl) {
      trigger.href = checkoutUrl;
      return;
    }

    event.preventDefault();
    const defaultText = trigger.dataset.defaultText || trigger.textContent;
    trigger.dataset.defaultText = defaultText;
    trigger.setAttribute('aria-live', 'polite');
    trigger.dataset.checkoutState = 'placeholder';
    trigger.textContent = isEnglish
      ? `${productLabels[productId] || 'Product'}: checkout coming soon`
      : `${productLabels[productId] || 'Produkt'}: checkout připravujeme`;

    window.setTimeout(() => {
      trigger.textContent = defaultText;
      delete trigger.dataset.checkoutState;
    }, 2400);
  };

  const initCheckoutButtons = () => {
    document.querySelectorAll('[data-product]').forEach((trigger) => {
      const productId = trigger.dataset.product;
      const checkoutUrl = resolveCheckoutUrl(productId);
      trigger.href = checkoutUrl || '#checkout-placeholder';
      trigger.addEventListener('click', handleOrderClick);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCheckoutButtons);
  else initCheckoutButtons();
})();
