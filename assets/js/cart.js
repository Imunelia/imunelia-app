(() => {
  const checkoutConfig = {
    balanceCheckoutUrl: '',
    restartCheckoutUrl: '',
    shieldCheckoutUrl: '',
    flowCheckoutUrl: '',
    nightCheckoutUrl: ''
  };

  window.ImmumaliaCheckoutConfig = checkoutConfig;
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

  const applyProductLogoCorrection = () => {
    if (!document.body.classList.contains('products-page')) return;
    if (document.getElementById('immumalia-product-logo-correction')) return;

    const style = document.createElement('style');
    style.id = 'immumalia-product-logo-correction';
    style.textContent = `
      .products-page .product-card-logo,
      .products-page .pack-logo-overlay {
        display: none !important;
      }

      .products-page .product-photo-stage::before {
        content: "";
        position: absolute;
        top: 34px;
        right: 4%;
        z-index: 3;
        width: clamp(150px, 12vw, 210px);
        aspect-ratio: 620 / 180;
        border-radius: 4px;
        background-color: rgba(248, 245, 238, .96);
        background-image: url("assets/imunelia-logo-nav.svg?v=20260710-swallow1");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 92% auto;
        box-shadow: 0 8px 18px rgba(8, 43, 85, .10), 0 0 0 1px rgba(200, 162, 74, .18);
        pointer-events: none;
      }

      @media (max-width: 760px) {
        .products-page .product-photo-stage::before {
          top: 28px;
          right: 3%;
          width: 124px;
        }
      }
    `;
    document.head.appendChild(style);
  };

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
    applyProductLogoCorrection();
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
