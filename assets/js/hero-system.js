(() => {
  const stage = document.querySelector('[data-system-stage]');
  if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const depthItems = [...stage.querySelectorAll('[data-depth]')];

  const applyPointer = (x, y) => {
    stage.style.setProperty('--stage-rx', `${(-y * 1.5).toFixed(2)}deg`);
    stage.style.setProperty('--stage-ry', `${(x * 1.5).toFixed(2)}deg`);
    stage.style.setProperty('--network-x', `${(x * 8).toFixed(2)}px`);
    stage.style.setProperty('--network-y', `${(y * 8).toFixed(2)}px`);

    depthItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 1);
      item.style.setProperty('--offset-x', `${(x * depth * 3.4).toFixed(2)}px`);
      item.style.setProperty('--offset-y', `${(y * depth * 3.4).toFixed(2)}px`);
    });
  };

  const updatePointer = (event) => {
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    applyPointer(x, y);
  };

  const resetPointer = () => applyPointer(0, 0);

  stage.addEventListener('pointermove', updatePointer, { passive: true });
  stage.addEventListener('pointerleave', resetPointer, { passive: true });
})();