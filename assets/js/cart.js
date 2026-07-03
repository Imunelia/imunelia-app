(() => {
  const checkoutConfig = {
    balanceCheckoutUrl: '',
    restartCheckoutUrl: '',
    shieldCheckoutUrl: '',
    flowCheckoutUrl: '',
    nightCheckoutUrl: ''
  };

  window.ImuneliaCheckoutConfig = checkoutConfig;

  const checkoutUrlByProduct = {
    balance: checkoutConfig.balanceCheckoutUrl,
    restart: checkoutConfig.restartCheckoutUrl,
    shield: checkoutConfig.shieldCheckoutUrl,
    flow: checkoutConfig.flowCheckoutUrl,
    night: checkoutConfig.nightCheckoutUrl
  };

  const productLabels = {
    balance: 'Balance',
    restart: 'Restart',
    shield: 'Shield',
    flow: 'Flow',
    night: 'Night'
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
    trigger.setAttribute('aria-live', 'polite');
    trigger.dataset.checkoutState = 'placeholder';
    trigger.textContent = `${productLabels[productId] || 'Produkt'}: checkout připravujeme`;

    window.setTimeout(() => {
      trigger.textContent = 'Objednat';
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
