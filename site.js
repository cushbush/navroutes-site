const languagePrefixes = ['pl', 'de'];
const languagePreference = localStorage.getItem('navroutes-language');
const preferredLanguages = languagePreference
  ? [languagePreference]
  : (navigator.languages.length ? navigator.languages : [navigator.language]);
const supportedLanguage = preferredLanguages
  .map(language => language.toLowerCase().split('-')[0])
  .find(language => ['en', ...languagePrefixes].includes(language));
const isLocalizedPage = /^\/(pl|de)(\/|$)/.test(window.location.pathname);
const localizedPagePaths = {
  pl: {
    '/': '/',
    '/index.html': '/',
    '/marketing.html': '/planowanie-tras-dostaw.html',
    '/privacy.html': '/polityka-prywatnosci.html',
    '/terms.html': '/warunki-korzystania.html',
    '/support.html': '/pomoc.html'
  },
  de: {
    '/': '/',
    '/index.html': '/',
    '/marketing.html': '/lieferroute-planer.html',
    '/privacy.html': '/datenschutzhinweise.html',
    '/terms.html': '/nutzungsbedingungen.html',
    '/support.html': '/support.html'
  }
};

document.querySelectorAll('[data-language]').forEach(link => {
  link.addEventListener('click', () => {
    localStorage.setItem('navroutes-language', link.dataset.language);
  });
});

if (!isLocalizedPage && (supportedLanguage === 'pl' || supportedLanguage === 'de')) {
  const translatedPath = localizedPagePaths[supportedLanguage][window.location.pathname];
  if (translatedPath) {
    window.location.replace(`/${supportedLanguage}${translatedPath}${window.location.search}${window.location.hash}`);
  }
}

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

const localizedStates = {
  pl: {
    parcel: {
      kicker: 'NASTĘPNA DOSTAWA / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Jedna paczka',
      note: 'Numer przesyłki jest przypisany do przystanku.', status: 'Gotowe do doręczenia',
      description: 'Dopasuj paczkę NR–024 do następnego przystanku bez przeszukiwania całej trasy.'
    },
    notes: {
      kicker: 'PRZYDATNA INFORMACJA', title: 'Wejście od strony bocznej.', icon: 'notebook-pen', detail: 'Odbiorca: Alex Morgan',
      note: 'Przy zielonych drzwiach. Zadzwoń dzwonkiem.', status: 'Notatki przy przystanku',
      description: 'Dane odbiorcy i krótka instrukcja doręczenia są pod ręką. To fikcyjny przykład, nie dane klienta.'
    },
    record: {
      kicker: 'PRZYSTANEK ZAKOŃCZONY', title: 'Dostawa zapisana.', icon: 'circle-check', detail: 'NR–024 / Doręczono',
      note: 'Paczka i wynik dostawy pozostają razem.', status: 'Część historii trasy',
      description: 'Zapisz wynik dostawy. To tylko przykład — nie zmienia żadnej prawdziwej trasy ani danych dostawy.'
    }
  },
  de: {
    parcel: {
      kicker: 'NÄCHSTE ZUSTELLUNG / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Ein Paket',
      note: 'Die Sendungsnummer bleibt beim Stopp.', status: 'Zustellung bereit',
      description: 'Ordne das Paket NR–024 dem nächsten Stopp zu, ohne die ganze Tour durchsuchen zu müssen.'
    },
    notes: {
      kicker: 'EIN HILFREICHER HINWEIS', title: 'Seiteneingang benutzen.', icon: 'notebook-pen', detail: 'Empfänger: Alex Morgan',
      note: 'Neben der grünen Tür. Bitte klingeln.', status: 'Hinweise beim Stopp',
      description: 'Empfänger und kurzer Zustellhinweis genau dort, wo du sie brauchst. Dies ist ein fiktives Beispiel, kein Kundendatensatz.'
    },
    record: {
      kicker: 'EIN STOPP ERLEDIGT', title: 'Zustellung erfasst.', icon: 'circle-check', detail: 'NR–024 / Zugestellt',
      note: 'Paket und Zustellergebnis bleiben zusammen.', status: 'Teil des Tourverlaufs',
      description: 'Erfasse das Zustellergebnis. Das Beispiel dient nur der Veranschaulichung und ändert keine echten Tour- oder Zustelldaten.'
    }
  }
};

const pageLanguage = document.documentElement.lang.slice(0, 2);
const statesForLanguage = localizedStates[pageLanguage] || states;

function renderIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.7, 'aria-hidden': 'true' } });
}

document.querySelectorAll('[data-state]').forEach(button => {
  button.addEventListener('click', () => {
    const state = statesForLanguage[button.dataset.state];
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