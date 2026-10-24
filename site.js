const languages = [
  { code: 'en', label: 'English', path: '/' },
  { code: 'pl', label: 'Polski', path: '/pl/' },
  { code: 'de', label: 'Deutsch', path: '/de/' },
  { code: 'fr', label: 'Français', path: '/fr/' },
  { code: 'it', label: 'Italiano', path: '/it/' },
  { code: 'de-ch', label: 'Deutsch (CH)', path: '/de-ch/' },
  { code: 'hu', label: 'Magyar', path: '/hu/' },
  { code: 'cs', label: 'Čeština', path: '/cs/' },
  { code: 'nb', label: 'Norsk bokmål', path: '/nb/' },
  { code: 'da', label: 'Dansk', path: '/da/' },
  { code: 'es', label: 'Español', path: '/es/' },
  { code: 'nl', label: 'Nederlands', path: '/nl/' },
  { code: 'pt', label: 'Português (Portugal)', path: '/pt/' },
  { code: 'nl-be', label: 'Nederlands (België)', path: '/nl-be/' },
  { code: 'lt', label: 'Lietuvių', path: '/lt/' },
  { code: 'sq', label: 'Shqip', path: '/sq/' },
  { code: 'de-at', label: 'Deutsch (Österreich)', path: '/de-at/' },
  { code: 'be', label: 'Беларуская', path: '/be/' },
  { code: 'bs', label: 'Bosanski', path: '/bs/' },
  { code: 'bg', label: 'Български', path: '/bg/' },
  { code: 'hr', label: 'Hrvatski', path: '/hr/' },
  { code: 'el-cy', label: 'Ελληνικά (Κύπρος)', path: '/el-cy/' },
  { code: 'et', label: 'Eesti', path: '/et/' },
  { code: 'fi', label: 'Suomi', path: '/fi/' },
  { code: 'el', label: 'Ελληνικά', path: '/el/' },
  { code: 'is', label: 'Íslenska', path: '/is/' },
  { code: 'en-ie', label: 'English (Ireland)', path: '/en-ie/' },
  { code: 'sq-xk', label: 'Shqip (Kosovë)', path: '/sq-xk/' },
  { code: 'lv', label: 'Latviešu', path: '/lv/' },
  { code: 'fr-lu', label: 'Français (Luxembourg)', path: '/fr-lu/' },
  { code: 'mt', label: 'Malti', path: '/mt/' },
  { code: 'ro-md', label: 'Română (Moldova)', path: '/ro-md/' },
  { code: 'sr-me', label: 'Srpski (Crna Gora)', path: '/sr-me/' },
  { code: 'mk', label: 'Македонски', path: '/mk/' },
  { code: 'ro', label: 'Română', path: '/ro/' },
  { code: 'sr-rs', label: 'Српски (Србија)', path: '/sr-rs/' },
  { code: 'sk', label: 'Slovenčina', path: '/sk/' },
  { code: 'sl', label: 'Slovenščina', path: '/sl/' },
  { code: 'sv', label: 'Svenska', path: '/sv/' },
  { code: 'tr', label: 'Türkçe', path: '/tr/' },
  { code: 'uk', label: 'Українська', path: '/uk/' }
];
const languageCodes = new Set(languages.map(language => language.code));
const getLanguageCode = language => {
  const normalized = language.toLowerCase().replace('_', '-');
  if (languageCodes.has(normalized)) return normalized;
  const [base, region] = normalized.split('-');
  if (base === 'de' && region === 'at') return 'de-at';
  if (base === 'de' && region === 'ch') return 'de-ch';
  if (base === 'el' && region === 'cy') return 'el-cy';
  if (base === 'en' && region === 'ie') return 'en-ie';
  if (base === 'fr' && region === 'lu') return 'fr-lu';
  if (base === 'nl' && region === 'be') return 'nl-be';
  if (base === 'ro' && region === 'md') return 'ro-md';
  if (base === 'sq' && region === 'xk') return 'sq-xk';
  if (base === 'sr') return normalized.endsWith('-me') ? 'sr-me' : 'sr-rs';
  if (base === 'no') return 'nb';
  return languageCodes.has(base) ? base : null;
};
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const currentPathParts = currentPath.split('/').filter(Boolean);
const currentRouteLanguage = languages.find(language => language.code === currentPathParts[0]);
const isLocalizedPage = Boolean(currentRouteLanguage && currentPathParts.length === 1);
const localizedPageSuffix = currentRouteLanguage && currentPathParts.length > 1
  ? `/${currentPathParts.slice(1).join('/')}`
  : '';
const selectorLabels = {
  en: 'Language', pl: 'Język', de: 'Sprache', fr: 'Langue', it: 'Lingua',
  hu: 'Nyelv', cs: 'Jazyk', nb: 'Språk', da: 'Sprog', es: 'Idioma',
  nl: 'Taal', pt: 'Idioma', lt: 'Kalba', sq: 'Gjuha', be: 'Мова',
  bs: 'Jezik', bg: 'Език', hr: 'Jezik', el: 'Γλώσσα', et: 'Keel',
  fi: 'Kieli', is: 'Tungumál', lv: 'Valoda', mt: 'Lingwa',
  ro: 'Limbă', sr: 'Језик', mk: 'Јазик',
  sk: 'Jazyk', sl: 'Jezik', sv: 'Språk', tr: 'Dil', uk: 'Мова'
};
const browserLanguageLabels = {
  en: 'Browser language', pl: 'Język przeglądarki', de: 'Browsersprache',
  fr: 'Langue du navigateur', it: 'Lingua del browser', hu: 'A böngésző nyelve',
  cs: 'Jazyk prohlížeče', nb: 'Språk i nettleseren', da: 'Browserens sprog',
  es: 'Idioma del navegador', nl: 'Browsertaal', pt: 'Idioma do navegador',
  lt: 'Naršyklės kalba', sq: 'Gjuha e shfletuesit', be: 'Мова браўзера',
  bs: 'Jezik preglednika', bg: 'Език на браузъра', hr: 'Jezik preglednika',
  el: 'Γλώσσα προγράμματος περιήγησης', et: 'Brauseri keel',
  fi: 'Selaimen kieli', is: 'Tungumál vafrans',
  lv: 'Pārlūkprogrammas valoda', mt: 'Lingwa tal-brawżer',
  ro: 'Limba browserului', sr: 'Језик прегледача',
  mk: 'Јазик на прелистувачот', sk: 'Jazyk prehliadača',
  sl: 'Jezik brskalnika', sv: 'Webbläsarens språk',
  tr: 'Tarayıcı dili', uk: 'Мова браузера'
};
const pageLanguage = document.documentElement.lang.slice(0, 2);

document.querySelectorAll('.language-switcher').forEach(switcher => {
  const select = document.createElement('select');
  select.setAttribute('aria-label', selectorLabels[pageLanguage] || selectorLabels.en);
  languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language.code;
    option.textContent = language.label;
    select.append(option);
  });
  const selectedLanguage = currentRouteLanguage ||
    languages.find(language => currentPath === language.path.replace(/\/+$/, '') || currentPath === language.path);
  select.value = selectedLanguage?.code || 'en';
  select.addEventListener('change', () => {
    const language = languages.find(item => item.code === select.value);
    localStorage.setItem('navroutes-language', language.code);
    const basePath = language.path.replace(/\/+$/, '');
    const destination = localizedPageSuffix
      ? `${basePath}${localizedPageSuffix}`
      : (language.path || '/');
    window.location.assign(`${destination}${window.location.search}${window.location.hash}`);
  });
  switcher.replaceChildren(select);
});

const browserLanguage = navigator.languages[0] || navigator.language;
const browserLanguageCode = getLanguageCode(browserLanguage);
const browserLanguageName = typeof Intl.DisplayNames === 'function'
  ? new Intl.DisplayNames([document.documentElement.lang], { type: 'language' }).of(browserLanguage)
  : null;
const browserLanguageIndicator = document.createElement('p');
browserLanguageIndicator.className = 'browser-language-indicator wrap';
const browserLanguageLabel = document.createElement('span');
browserLanguageLabel.textContent = `${browserLanguageLabels[pageLanguage] || browserLanguageLabels.en}:`;
const browserLanguageValue = document.createElement('strong');
browserLanguageValue.textContent = browserLanguageName
  || languages.find(language => language.code === browserLanguageCode)?.label
  || browserLanguage;
browserLanguageIndicator.append(browserLanguageLabel, browserLanguageValue);
document.querySelector('.site-header')?.before(browserLanguageIndicator);

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
  },
  fr: {
    parcel: {
      kicker: 'PROCHAINE LIVRAISON / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Un colis',
      note: 'La référence reste associée à l’arrêt.', status: 'Prêt à être livré',
      description: 'Associez le colis NR–024 au prochain arrêt sans parcourir toute la tournée.'
    },
    notes: {
      kicker: 'LE DÉTAIL QUI AIDE', title: 'Utiliser l’entrée latérale.', icon: 'notebook-pen', detail: 'Destinataire : Alex Morgan',
      note: 'À côté de la porte verte. Sonnez.', status: 'Notes près de l’arrêt',
      description: 'Le destinataire et une courte consigne de livraison, à portée de main. Exemple fictif, pas un dossier client.'
    },
    record: {
      kicker: 'UN ARRÊT TERMINÉ', title: 'Livraison enregistrée.', icon: 'circle-check', detail: 'NR–024 / Livré',
      note: 'Le colis et le résultat restent associés.', status: 'Dans l’historique de la tournée',
      description: 'Enregistrez le résultat de la livraison. Cet exemple ne modifie aucune tournée ni donnée réelle.'
    }
  },
  it: {
    parcel: {
      kicker: 'PROSSIMA CONSEGNA / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Un pacco',
      note: 'Il riferimento resta associato alla fermata.', status: 'Pronto per la consegna',
      description: 'Associa il pacco NR–024 alla prossima fermata senza cercare in tutta la tratta.'
    },
    notes: {
      kicker: 'UN DETTAGLIO UTILE', title: 'Usa l’ingresso laterale.', icon: 'notebook-pen', detail: 'Destinatario: Alex Morgan',
      note: 'Accanto alla porta verde. Suona il campanello.', status: 'Note accanto alla fermata',
      description: 'Destinatario e breve istruzione di consegna, proprio dove servono. È un esempio fittizio, non un dato cliente.'
    },
    record: {
      kicker: 'UNA FERMATA COMPLETATA', title: 'Consegna registrata.', icon: 'circle-check', detail: 'NR–024 / Consegnato',
      note: 'Pacco ed esito restano insieme.', status: 'Parte dello storico della tratta',
      description: 'Registra l’esito della consegna. L’esempio è illustrativo e non modifica dati reali.'
    }
  },
  hu: {
    parcel: {
      kicker: 'KÖVETKEZŐ KÉZBESÍTÉS / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Egy csomag',
      note: 'A csomagszám a megállóhoz tartozik.', status: 'Kézbesítésre kész',
      description: 'Rendeld az NR–024 csomagot a következő megállóhoz anélkül, hogy az egész útvonalat át kellene keresned.'
    },
    notes: {
      kicker: 'EGY HASZNOS RÉSZLET', title: 'Használd az oldalsó bejáratot.', icon: 'notebook-pen', detail: 'Címzett: Alex Morgan',
      note: 'A zöld ajtó mellett. Csöngess be.', status: 'Megjegyzések a megállónál',
      description: 'A címzett és a rövid kézbesítési utasítás ott van, ahol szükséged van rá. Fiktív példa, nem ügyféladat.'
    },
    record: {
      kicker: 'EGY MEGÁLLÓ TELJESÍTVE', title: 'Kézbesítés rögzítve.', icon: 'circle-check', detail: 'NR–024 / Kézbesítve',
      note: 'A csomag és az eredmény együtt marad.', status: 'Az útvonal előzményeinek része',
      description: 'Rögzítsd a kézbesítés eredményét. A példa csak szemléltető, nem módosít valós adatokat.'
    }
  },
  cs: {
    parcel: {
      kicker: 'DALŠÍ DORUČENÍ / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Jeden balík',
      note: 'Číslo zásilky zůstává u zastávky.', status: 'Připraveno k doručení',
      description: 'Přiřaďte balík NR–024 k další zastávce, aniž byste museli prohledávat celou trasu.'
    },
    notes: {
      kicker: 'UŽITEČNÝ DETAIL', title: 'Použijte boční vchod.', icon: 'notebook-pen', detail: 'Příjemce: Alex Morgan',
      note: 'Vedle zelených dveří. Zazvoňte.', status: 'Poznámky u zastávky',
      description: 'Příjemce a krátký pokyn k doručení máte po ruce. Jde o smyšlený příklad, ne o záznam zákazníka.'
    },
    record: {
      kicker: 'ZASTÁVKA DOKONČENA', title: 'Doručení zaznamenáno.', icon: 'circle-check', detail: 'NR–024 / Doručeno',
      note: 'Balík a výsledek zůstávají pohromadě.', status: 'Součást historie trasy',
      description: 'Zaznamenejte výsledek doručení. Tento příklad je pouze ilustrační a nemění žádná skutečná data.'
    }
  },
  nb: {
    parcel: {
      kicker: 'NESTE LEVERING / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Én pakke',
      note: 'Referansen følger stoppet.', status: 'Klar til levering',
      description: 'Knytt pakken NR–024 til neste stopp uten å lete gjennom hele ruten.'
    },
    notes: {
      kicker: 'EN NYTTIG DETALJ', title: 'Bruk sideinngangen.', icon: 'notebook-pen', detail: 'Mottaker: Alex Morgan',
      note: 'Ved den grønne døren. Ring på.', status: 'Notater ved stoppet',
      description: 'Mottaker og en kort leveringsbeskjed, akkurat der du trenger dem. Fiktivt eksempel, ikke en kunderegistrering.'
    },
    record: {
      kicker: 'ET STOPP FULLFØRT', title: 'Levering registrert.', icon: 'circle-check', detail: 'NR–024 / Levert',
      note: 'Pakken og leveringsresultatet hører sammen.', status: 'Del av rutehistorikken',
      description: 'Registrer leveringsresultatet. Eksemplet er kun illustrerende og endrer ingen faktiske rute- eller leveringsdata.'
    }
  },
  da: {
    parcel: {
      kicker: 'NÆSTE LEVERING / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Én pakke',
      note: 'Referencen følger med stoppet.', status: 'Klar til levering',
      description: 'Knyt pakken NR–024 til næste stop uden at lede hele ruten igennem.'
    },
    notes: {
      kicker: 'EN NYTTIG DETALJE', title: 'Brug sideindgangen.', icon: 'notebook-pen', detail: 'Modtager: Alex Morgan',
      note: 'Ved den grønne dør. Ring på.', status: 'Noter ved stoppet',
      description: 'Modtager og en kort leveringsbesked lige ved hånden. Fiktivt eksempel, ikke en kunderegistrering.'
    },
    record: {
      kicker: 'ET STOP AFSLUTTET', title: 'Levering registreret.', icon: 'circle-check', detail: 'NR–024 / Leveret',
      note: 'Pakken og resultatet hører sammen.', status: 'En del af rutens historik',
      description: 'Registrer resultatet af leveringen. Eksemplet er kun illustrativt og ændrer ingen faktiske data.'
    }
  },
  es: {
    parcel: {
      kicker: 'PRÓXIMA ENTREGA / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Un paquete',
      note: 'La referencia permanece asociada a la parada.', status: 'Listo para entregar',
      description: 'Asocia el paquete NR–024 a la siguiente parada sin tener que buscar en toda la ruta.'
    },
    notes: {
      kicker: 'UN DETALLE ÚTIL', title: 'Usa la entrada lateral.', icon: 'notebook-pen', detail: 'Destinatario: Alex Morgan',
      note: 'Junto a la puerta verde. Llama al timbre.', status: 'Notas junto a la parada',
      description: 'El destinatario y una breve instrucción de entrega, justo donde los necesitas. Ejemplo ficticio, no es un registro de cliente.'
    },
    record: {
      kicker: 'UNA PARADA COMPLETADA', title: 'Entrega registrada.', icon: 'circle-check', detail: 'NR–024 / Entregado',
      note: 'El paquete y el resultado quedan juntos.', status: 'Parte del historial de la ruta',
      description: 'Registra el resultado de la entrega. El ejemplo es ilustrativo y no modifica datos reales.'
    }
  },
  nl: {
    parcel: {
      kicker: 'VOLGENDE BEZORGING / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Eén pakket',
      note: 'Het pakketnummer blijft bij de stop.', status: 'Klaar voor bezorging',
      description: 'Koppel pakket NR–024 aan de volgende stop zonder de hele route te hoeven doorzoeken.'
    },
    notes: {
      kicker: 'EEN HANDIG DETAIL', title: 'Gebruik de zijingang.', icon: 'notebook-pen', detail: 'Ontvanger: Alex Morgan',
      note: 'Naast de groene deur. Bel aan.', status: 'Notities bij de stop',
      description: 'De ontvanger en een korte bezorginstructie bij de hand. Dit is een fictief voorbeeld, geen klantgegeven.'
    },
    record: {
      kicker: 'STOP AFGEROND', title: 'Bezorging vastgelegd.', icon: 'circle-check', detail: 'NR–024 / Bezorgd',
      note: 'Pakket en bezorgresultaat blijven bij elkaar.', status: 'Onderdeel van de routegeschiedenis',
      description: 'Leg het bezorgresultaat vast. Dit voorbeeld is illustratief en wijzigt geen echte route- of bezorggegevens.'
    }
  },
  pt: {
    parcel: {
      kicker: 'PRÓXIMA ENTREGA / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Uma encomenda',
      note: 'A referência fica associada à paragem.', status: 'Pronta para entrega',
      description: 'Associe a encomenda NR–024 à próxima paragem sem ter de procurar em todo o percurso.'
    },
    notes: {
      kicker: 'UM DETALHE ÚTIL', title: 'Use a entrada lateral.', icon: 'notebook-pen', detail: 'Destinatário: Alex Morgan',
      note: 'Junto à porta verde. Toque à campainha.', status: 'Notas junto à paragem',
      description: 'O destinatário e uma breve instrução de entrega, mesmo onde precisa deles. Exemplo fictício, não é um registo de cliente.'
    },
    record: {
      kicker: 'PARAGEM CONCLUÍDA', title: 'Entrega registada.', icon: 'circle-check', detail: 'NR–024 / Entregue',
      note: 'A encomenda e o resultado ficam associados.', status: 'Parte do histórico do percurso',
      description: 'Registe o resultado da entrega. O exemplo é ilustrativo e não altera dados reais.'
    }
  },
  lt: {
    parcel: {
      kicker: 'KITAS PRISTATYMAS / 01', title: '14 Willow Avenue', icon: 'package', detail: 'NR–024 / Viena siunta',
      note: 'Siuntos numeris lieka prie sustojimo.', status: 'Paruošta pristatyti',
      description: 'Priskirkite siuntą NR–024 prie kito sustojimo, neieškodami jos visame maršrute.'
    },
    notes: {
      kicker: 'NAUDINGA DETALĖ', title: 'Naudokite šoninį įėjimą.', icon: 'notebook-pen', detail: 'Gavėjas: Alex Morgan',
      note: 'Prie žalių durų. Paskambinkite.', status: 'Pastabos prie sustojimo',
      description: 'Gavėjas ir trumpa pristatymo instrukcija yra po ranka. Tai išgalvotas pavyzdys, ne kliento įrašas.'
    },
    record: {
      kicker: 'SUSTOJIMAS UŽBAIGTAS', title: 'Pristatymas užregistruotas.', icon: 'circle-check', detail: 'NR–024 / Pristatyta',
      note: 'Siunta ir pristatymo rezultatas lieka kartu.', status: 'Maršruto istorijos dalis',
      description: 'Užregistruokite pristatymo rezultatą. Tai tik pavyzdys, nekeičiantis tikrų maršruto ar pristatymo duomenų.'
    }
  }
};

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