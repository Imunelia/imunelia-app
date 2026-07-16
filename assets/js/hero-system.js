(() => {
  const stage = document.querySelector('[data-system-stage]');
  if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const updatePointer = (event) => {
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    stage.style.setProperty('--pointer-x', x.toFixed(3));
    stage.style.setProperty('--pointer-y', y.toFixed(3));
  };

  const resetPointer = () => {
    stage.style.setProperty('--pointer-x', '0');
    stage.style.setProperty('--pointer-y', '0');
  };

  stage.addEventListener('pointermove', updatePointer, { passive: true });
  stage.addEventListener('pointerleave', resetPointer, { passive: true });
})();