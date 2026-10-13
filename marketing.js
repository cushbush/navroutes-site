const featureTabs = [...document.querySelectorAll('.product-tabs [role="tab"]')];
const featurePanels = [...document.querySelectorAll('.product-panel')];

function selectFeature(selectedTab) {
  featureTabs.forEach(tab => {
    const selected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  featurePanels.forEach(panel => {
    panel.hidden = panel.id !== selectedTab.getAttribute('aria-controls');
  });
}

if (featureTabs.length) {
  document.querySelector('.product-tabs').hidden = false;
  selectFeature(featureTabs[0]);
  featureTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectFeature(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % featureTabs.length;
      if (event.key === 'ArrowLeft') target = (index + featureTabs.length - 1) % featureTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = featureTabs.length - 1;
      if (target !== undefined) {
        event.preventDefault();
        selectFeature(featureTabs[target]);
        featureTabs[target].focus();
      }
    });
  });
}