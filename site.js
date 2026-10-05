const states = {
  parcel: {
    kicker: 'NEXT DELIVERY / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / One parcel',
    note: 'The reference stays with the stop.', status: 'Ready to deliver',
    description: 'Match parcel NR–024 to the next stop, without searching through the rest of the round.'
  },
  notes: {
    kicker: 'THE DETAIL THAT HELPS', title: 'Use the side entrance.', icon: 'notebook-pen', detail: 'Recipient: Alex Morgan',
    note: 'Beside the green door. Ring the bell.', status: 'Notes beside your stop',
    description: 'A recipient and a short delivery note, right where you need them. This is a fictional example, not a customer record.'
  },
  record: {
    kicker: 'ONE STOP ACCOUNTED FOR', title: 'Delivery recorded.', icon: 'circle-check', detail: 'NR–024 / Completed',
    note: 'The parcel and its outcome stay together.', status: 'Part of the round record',
    description: 'Record the delivery outcome. The sample shows the idea only; no real route or delivery data is changed.'
  }
};

function renderIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.7, 'aria-hidden': 'true' } });
}

document.querySelectorAll('[data-state]').forEach(button => {
  button.addEventListener('click', () => {
    const state = states[button.dataset.state];
    document.querySelectorAll('[data-state]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    document.querySelector('.delivery-scene').dataset.view = button.dataset.state;
    document.querySelector('#callout-kicker').textContent = state.kicker;
    document.querySelector('#callout-title').textContent = state.title;
    const detail = document.querySelector('#callout-detail');
    detail.replaceChildren();
    const icon = document.createElement('i');
    icon.dataset.lucide = state.icon;
    const label = document.createElement('span');
    label.textContent = state.detail;
    detail.append(icon, label);
    document.querySelector('#callout-note').textContent = state.note;
    const status = document.querySelector('#callout-status');
    status.replaceChildren(document.createElement('span'), document.createTextNode(state.status));
    document.querySelector('#state-description').textContent = state.description;
    renderIcons();
  });
});

document.querySelector('a[href="#scan-requirements"]')?.addEventListener('click', () => {
  document.querySelector('#scan-requirements').open = true;
});
renderIcons();