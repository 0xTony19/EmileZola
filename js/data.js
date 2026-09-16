// Database didattico completo per Émile Zola
const ZOLA_DATA = {
  biografia: {
    nomeCompleto: "Émile Édouard Charles Antoine Zola",
    nascita: "2 aprile 1840, Parigi (Francia)",
    morte: "29 settembre 1902 (62 anni), Parigi",
    causaMorte: "Asfissia da monossido di carbonio (circostanze controverse, forte sospetto di attentato per il caso Dreyfus)",
    nazionalita: "Francese (padre italiano di Venezia, Francesco Zola, ingegnere costruttore del canale di Aix-en-Provence)",
    ruolo: "Caposcuola e massimo teorico del Naturalismo francese, romanziere, giornalista, intellettuale 'engagé'",
    periodo: "Seconda metà dell'Ottocento — Secondo Impero di Napoleone III e Terza Repubblica francese (1860–1902)",
    sepoltura: "Traslato nel 1908 al Panthéon di Parigi accanto a Victor Hugo e Alexandre Dumas"
  },

  pilastriPoetica: [
    {
      id: "metodo-sperimentale",
      titolo: "Il Metodo Sperimentale",
      sottotitolo: "Dalla fisiologia di Claude Bernard al romanzo scientifico",
      tag: "METODO",
      descrizione: "Nel saggio teorico Le roman expérimental (1880), Zola applica alla letteratura il metodo del fisiologo Claude Bernard. Lo scrittore osserva i fatti sociali, predispone l'esperimento narrativo collocando i personaggi in condizioni limite, e deduce le leggi universali dei comportamenti umani.",
      fasi: [
        { passo: 1, nome: "Osservazione", testo: "Studio rigoroso e inchiesta documentale diretta sul campo (i dossiers préparatoires)." },
        { passo: 2, nome: "Sperimentazione", testo: "Immettere i personaggi in un ambiente sociale definito per osservare le reazioni causali." },
        { passo: 3, nome: "Deduzione di Leggi", testo: "Dimostrare le leggi dell'ereditarietà e del contesto sociologico come un referto clinico." }
      ]
    },
    {
      id: "determinismo",
      titolo: "Determinismo Biologico e Sociale",
      sottotitolo: "L'uomo come prodotto inesorabile di Geni e Ambiente",
      tag: "SCIENZA",
      descrizione: "L'essere umano per Zola non è dotato di libero arbitrio metafisico, ma è determinato in modo meccanicistico da due vettori fondamentali formulati attraverso le teorie di Prosper Lucas e Hippolyte Taine.",
      fattori: [
        { nome: "Eredità Biologica (Hérédité)", desc: "Tare genetiche, temperamento nervoso, pulsioni ancestrali e predisposizione all'alcolismo trasmesse di padre in figlio." },
        { nome: "Ambiente Sociale (Milieu)", desc: "Il contesto fisico, lavorativo, economico e morale in cui l'individuo vive (la miniera, la bettola, la borsa, il salotto borghese)." }
      ]
    },
    {
      id: "documento-umano",
      titolo: "Il Romanzo come Documento Umano",
      sottotitolo: "Inchieste sul campo e dossiers préparatoires",
      tag: "DOCUMENTO",
      descrizione: "Prima di scrivere, Zola effettuava mesi di inchiesta dal vivo: scese nelle gallerie delle miniere di carbone ad Anzin per Germinal, esplorò i padiglioni delle Halles per Le Ventre de Paris, studiò le locomotive per La Bête humaine e visitò i grandi magazzini per Au Bonheur des Dames.",
      pillola: "Il romanzo naturalista è un 'verbale giudiziario e scientifico' della realtà, non una fantasticheria."
    },
    {
      id: "impegno-civile",
      titolo: "L'Intellettuale 'Engagé' & J'Accuse",
      sottotitolo: "La nascita dell'impegno civile contemporaneo",
      tag: "DIRITTO",
      descrizione: "Il 13 gennaio 1898 Zola pubblica sulla prima pagina del giornale L'Aurore la lettera aperta al Presidente Félix Faure intitolata 'J'accuse...!', denunciando il complotto militare e antisemita contro il capitano Alfred Dreyfus. Condannato a 1 anno di carcere, fuggì in esilio a Londra per 11 mesi prima della riabilitazione.",
      pillola: "Mise la propria notorietà e la propria libertà a repentaglio per la verità e la giustizia universale."
    }
  ],

  cicliLetterari: [
    {
      id: "rougon-macquart",
      titolo: "Les Rougon-Macquart",
      anni: "1871–1893",
      volumi: "20 Romanzi",
      badge: "Capolavoro monumentale",
      descrizione: "Sottotitolo programmatico: 'Histoire naturelle et sociale d'une famille sous le Second Empire'. Segue le vicende dei due rami di una stessa famiglia originaria di Plassans attraverso 20 anni di storia francese (1851-1870).",
      rami: {
        rougon: "Ramo legittimo: ambizioso, bramoso di potere politico, denaro e ascesa sociale nella classe dirigente borghese.",
        macquart: "Ramo illegittimo: segnato da tare degenerative, alcolismo, nevrosi, povertà operaia e ribellione sociale."
      }
    },
    {
      id: "trois-villes",
      titolo: "Les标志Trois Villes",
      anni: "1894–1898",
      volumi: "3 Romanzi",
      badge: "Trilogia sociale",
      descrizione: "Comprende Lourdes (1894), Rome (1896) e Paris (1898). Esplora la crisi della fede cattolica nell'Ottocento scientifico e la ricerca di una nuova religione della giustizia sociale e della ragione laica attraverso il sacerdote Pierre Froment."
    },
    {
      id: "quatre-evangiles",
      titolo: "Les Quatre Évangiles",
      anni: "1899–1902",
      volumi: "4 Romanzi (incompiuto)",
      badge: "Utopia progressista",
      descrizione: "Fase tardo-utopica: Fécondité (1899), Travail (1901), Vérité (1903, postumo sul caso Dreyfus), Justice (rimasto incompiuto per la morte). Zola passa dalla diagnosi clinica pessimistica all'ottimismo umanitario fondato su lavoro, scienza ed educazione."
    }
  ],

  romanziRougonMacquart: [
    { n: 1, titolo: "La Fortune des Rougon", anno: 1871, ambiente: "Provincia (Plassans) & Politica", tema: "Origine della famiglia, colpo di stato di Napoleone III del 1851, spartizione iniziale delle tare ereditarie." },
    { n: 2, titolo: "La Curée", anno: 1871, ambiente: "Alta Finanza & Parigi Haussmanniana", tema: "Speculazione edilizia durante i grandi sventramenti di Parigi, lussuria e corruzione morale." },
    { n: 3, titolo: "Le Ventre de Paris", anno: 1873, ambiente: "Mercati Generali (Les Halles)", tema: "Il cibo, l'abbondanza dei 'Grassi' (borghesi sazi) contro la fame dei 'Magri' (idealisti repubblicani)." },
    { n: 4, titolo: "La Conquête de Plassans", anno: 1874, ambiente: "Clero & Provincia", tema: "Intrighi clericali e manipolazioni politiche in provincia sotto la guida dell'abate Faujas." },
    { n: 5, titolo: "La Faute de l'Abbé Mouret", anno: 1875, ambiente: "Campagna & Natura", tema: "Conflitto tra vocazione religiosa, dogma e pulsione naturale sensuale." },
    { n: 6, titolo: "Son Excellence Eugène Rougon", anno: 1876, ambiente: "Corte Imperiale & Potere", tema: "I meccanismi cinici del potere politico autoritario nel governo imperiale." },
    { n: 7, titolo: "L'Assommoir", anno: 1877, ambiente: "Quartieri Popolari di Parigi", tema: "Il dramma della lavandaia Gervaise Macquart: degrado operaio, infortuni sul lavoro e caduta nell'alcolismo ('l'ammazzatoio')." },
    { n: 8, titolo: "Une page d'amour", anno: 1878, ambiente: "Piccola Borghesia Parigina", tema: "Passione segreta e gelosia materna con sfondo panoramico su Parigi." },
    { n: 9, titolo: "Nana", anno: 1880, ambiente: "Teatro, Alcove & Demi-monde", tema: "Nana (figlia di Gervaise), cortigiana di lusso che consuma e distrugge le fortune dei nobili e borghesi." },
    { n: 10, titolo: "Pot-Bouille", anno: 1882, ambiente: "Condominio Borghese Parigino", tema: "Ipocrisia, adulterio e squallore celati dietro le facciate impeccabili dei palazzi perbene." },
    { n: 11, titolo: "Au Bonheur des Dames", anno: 1883, ambiente: "I Grandi Magazzini Moderni", tema: "Nascita del commercio moderno, consumismo, marketing e declino delle antiche botteghe artigiane." },
    { n: 12, titolo: "La Joie de vivre", anno: 1884, ambiente: "Costa della Normandia", tema: "Scontro tra pessimismo schopenhaueriano, malattia e generosità altruistica." },
    { n: 13, titolo: "Germinal", anno: 1885, ambiente: "Miniere di Carbone del Nord (Montsou)", tema: "Capolavoro assoluto: lavoro nel sottosuolo, il mostro 'Le Voreux', il grande sciopero e la nascita della coscienza di classe." },
    { n: 14, titolo: "L'Œuvre", anno: 1886, ambiente: "Mondo dell'Arte e Impressionismo", tema: "Il tormento creativo del pittore Claude Lantier. Ispirato all'amico Paul Cézanne, determinò la fine della loro amicizia." },
    { n: 15, titolo: "La Terre", anno: 1887, ambiente: "Campagna della Beauce", tema: "La brama feroce di possesso della terra tra i contadini, violenza arcaica e pulsioni primordiali." },
    { n: 16, titolo: "Le Rêve", anno: 1888, ambiente: "Mondo Ecclesiastico & Cattedrale", tema: "Spiritualismo e sogno mistico di una giovane orfana ricamatrice." },
    { n: 17, titolo: "La Bête humaine", anno: 1890, ambiente: "Ferrovie & Linea Parigi-Le Havre", tema: "Jacques Lantier e l'omofobia della follia omicida: il treno come icona di modernità contrapposto alle pulsioni bestiali ereditarie." },
    { n: 18, titolo: "L'Argent", anno: 1891, ambiente: "Borsa Valori di Parigi", tema: "Speculazione finanziaria capitalista, ascesa e crollo disastroso della Banca Universale." },
    { n: 19, titolo: "La Débâcle", anno: 1892, ambiente: "Guerra Franco-Prussiana & Sedan", tema: "La disfatta militare della Francia nel 1870 e il tragico crollo del Secondo Impero." },
    { n: 20, titolo: "Le Docteur Pascal", anno: 1893, ambiente: "Studio Medico Scientifico", tema: "Sintesi scientifica e genetica finale del ciclo: il medico raccoglie l'albero genealogico completo della famiglia." }
  ],

  focusGerminal: {
    titolo: "Germinal (1885) — Il Capolavoro Assoluto",
    sottotitolo: "L'epopea dei minatori e la genesi del proletariato moderno",
    protagonista: "Étienne Lantier (figlio di Gervaise de L'Assommoir)",
    ambientazione: "Pozzo minerario 'Le Voreux' nel bacino di Montsou (Nord della Francia)",
    tramaSintetica: "Étienne Lantier, disoccupato, viene assunto come minatore nel pozzo Le Voreux. Davanti alla miseria nera, ai salari decurtati e al pericolo costante di crolli e grisou, guida i compagni in uno storico sciopero. L'esercito reprime nel sangue la protesta e l'anarchico Souvarine sabota la galleria provocando un'alluvione. Nonostante la sconfitta e il lutto, Étienne riparte consapevole che il germe della riscossa umana è piantato e fiorirà ineluttabilmente.",
    chiaviLettura: [
      {
        titolo: "Il Mostro 'Le Voreux'",
        desc: "La miniera non è solo un luogo di lavoro: Zola la personifica come una bestia gigantesca e insaziabile che divora centinaia di operai ogni giorno per digerire carbone e rigurgitare profitto."
      },
      {
        titolo: "Simbologia del Titolo",
        desc: "'Germinal' richiama il mese primaverile del calendario rivoluzionario (marzo-aprile), tempo della germinazione dei semi nel grembo della terra. Metafora della rivolta sociale che 'germoglia' sotto la superficie prima di esplodere."
      },
      {
        titolo: "Inchiesta Documentaria",
        desc: "Nel febbraio 1884 Zola scese personalmente nei pozzi minerari di Anzin, vestito da minatore, taccuino alla mano, per documentare le condizioni fisiche, il buio, il calore e il gergo autentico dei cavatori."
      },
      {
        titolo: "Dimensione Corale",
        desc: "Il vero protagonista del romanzo non è il singolo eroe, ma la folla operaia unita: una comunità intera guidata dal bisogno di dignità, pane e giustizia."
      }
    ]
  },

  curiosita: [
    {
      titolo: "L'amicizia infranta con Cézanne",
      tag: "ARTE",
      testo: "Cresciuto insieme a Paul Cézanne ad Aix-en-Provence, Zola si ispirò a lui per il protagonista fallito di L'Œuvre (Claude Lantier). Cézanne si sentì offeso dal ritratto e non gli rivolse mai più la parola."
    },
    {
      titolo: "Pioniere della Fotografia (4.000 scatti)",
      tag: "FOTOGRAFIA",
      testo: "Zola fu un fotografo appassionato e meticoloso: possedeva oltre una dozzina di macchine fotografiche e lasciò più di 4.000 lastre e foto che documentano Parigi, l'esilio londinese e la vita quotidiana."
    },
    {
      titolo: "Candidato al Nobel, mai premiato",
      tag: "RICONOSCIMENTI",
      testo: "Fu nominato ripetutamente per il Premio Nobel per la Letteratura (1901 e 1902), ma l'Accademia svedese lo respinse a causa dei temi ritenuti troppo 'scandalosi, crudi e immorali' per i canoni dell'epoca."
    },
    {
      titolo: "Il mistero del camino & Il Panthéon",
      tag: "MEMORIA",
      testo: "Morì asfissiato nel sonno per il camino ostruito nella sua camera da letto. Anni dopo, uno spazzacamino nazionalista confessò in punto di morte di aver bloccato volontariamente la canna fumaria per vendicarsi di Zola. Nel 1908 le sue ceneri entrarono trionfalmente al Panthéon."
    }
  ],

  // 15 Domande per il Quiz Live con Timer a 10s
  domandeQuiz: [
    {
      id: 1,
      domanda: "A quale scienziato e fisiologo si ispira Zola per teorizzare il 'Romanzo Sperimentale'?",
      opzioni: ["Claude Bernard", "Louis Pasteur", "Charles Darwin", "Prosper Lucas"],
      corretta: 0,
      spiegazione: "Nel saggio del 1880, Zola mutua il metodo sperimentale direttamente dal fisiologo Claude Bernard (1865)."
    },
    {
      id: 2,
      domanda: "Quali sono i due fattori determinanti che guidano il destino dei personaggi zoliani?",
      opzioni: ["Fato divino e Libero arbitrio", "Eredità biologica e Milieu sociale", "Ricchezza economica e Astrologia", "Educazione scolastica e Clima"],
      corretta: 1,
      spiegazione: "Il determinismo zoliano stabilisce che ogni individuo è modellato inesorabilmente dall'ereditarietà genetica e dall'ambiente sociale (milieu)."
    },
    {
      id: 3,
      domanda: "Quanti romanzi compongono l'intero ciclo monumentale dei Rougon-Macquart?",
      opzioni: ["10 romanzi", "12 romanzi", "20 romanzi", "33 romanzi"],
      corretta: 2,
      spiegazione: "I Rougon-Macquart sono una saga monumentale di esattamente 20 romanzi scritti tra il 1871 e il 1893."
    },
    {
      id: 4,
      domanda: "Nel celebre romanzo 'Germinal', quale elemento viene personificato come un mostro che 'divora' gli uomini?",
      opzioni: ["La locomotiva a vapore", "Il pozzo minerario 'Le Voreux'", "Il grande magazzino", "La borsa di Parigi"],
      corretta: 1,
      spiegazione: "'Le Voreux' (il Vorace) è il pozzo minerario descritto come una gigantesca bestia mitologica che inghiotte vite umane nel sottosuolo."
    },
    {
      id: 5,
      domanda: "Qual è il significato simbolico del titolo 'Germinal'?",
      opzioni: ["È il nome del capo dei minatori", "Il mese della primavera rivoluzionaria in cui germogliano i semi", "La miniera più profonda d'Europa", "La formula chimica del carbone fossile"],
      corretta: 1,
      spiegazione: "Germinal era il 7° mese del calendario rivoluzionario francese (marzo-aprile), simbolo del germoglio inevitabile della giustizia sociale."
    },
    {
      id: 6,
      domanda: "Per quale celebre causa civile Émile Zola scrisse l'articolo 'J'accuse...!' nel 1898?",
      opzioni: ["L'Affaire Alfred Dreyfus", "La Comune di Parigi", "La legge sul lavoro minorile", "La riforma della scuola laica"],
      corretta: 0,
      spiegazione: "'J'accuse...!' fu pubblicato su L'Aurore per difendere l'ufficiale ebreo Alfred Dreyfus, ingiustamente accusato di alto tradimento."
    },
    {
      id: 7,
      domanda: "Come lavorava Zola prima di iniziare la stesura dei suoi romanzi?",
      opzioni: ["Si isolava senza leggere notizie", "Raccoglieva inchieste e appunti sul campo (dossiers préparatoires)", "Scriveva solo sotto dettatura spirituale", "Copiava trame classiche greche"],
      corretta: 1,
      spiegazione: "Zola conduceva inchieste dirette e meticolose sul campo (dossiers préparatoires), visitando miniere, ferrovie e mercati."
    },
    {
      id: 8,
      domanda: "Quale romanzo di Zola ruota attorno al tema della nascita dei moderni Grandi Magazzini e del consumismo?",
      opzioni: ["Au Bonheur des Dames", "Le Ventre de Paris", "L'Argent", "La Curée"],
      corretta: 0,
      spiegazione: "Au Bonheur des Dames (1883) analizza la rivoluzione commerciale dei primi grandi magazzini parigini a scapito delle botteghe tradizionali."
    },
    {
      id: 9,
      domanda: "Cosa contraddistingue i due rami della famiglia Rougon-Macquart?",
      opzioni: ["I Rougon sono contadini, i Macquart nobili", "I Rougon sono il ramo legittimo/arrivista, i Macquart il ramo con tare e alcolismo", "I Rougon vivono a Londra, i Macquart a Roma", "Nessuna differenza di classe"],
      corretta: 1,
      spiegazione: "I Rougon rappresentano la sete di potere e denaro borghese; i Macquart subiscono tare degenerative, nevrosi e alcolismo nel proletariato."
    },
    {
      id: 10,
      domanda: "Quale celebre pittore impressionista ruppe l'amicizia d'infanzia con Zola dopo la pubblicazione di 'L'Œuvre'?",
      opzioni: ["Claude Monet", "Paul Cézanne", "Edgar Degas", "Pierre-Auguste Renoir"],
      corretta: 1,
      spiegazione: "Paul Cézanne si riconobbe nel pittore fallito e suicida Claude Lantier protagonista de L'Œuvre (1886) e troncò ogni rapporto con Zola."
    },
    {
      id: 11,
      domanda: "A seguito della condanna per diffamazione dopo il 'J'accuse...!', dove trascorse Zola circa 11 mesi di esilio?",
      opzioni: ["In Inghilterra (Londra e Surrey)", "In Italia (Venezia)", "Negli Stati Uniti", "In Svizzera"],
      corretta: 0,
      spiegazione: "Zola fuggì nella notte a Londra, dove visse 11 mesi in esilio sotto falso nome prima di rientrare trionfalmente in patria."
    },
    {
      id: 12,
      domanda: "In quale prestigioso monumento parigino riposano oggi le ceneri di Émile Zola?",
      opzioni: ["Al Cimitero di Père-Lachaise", "Al Panthéon di Parigi", "Nella Cattedrale di Notre-Dame", "Alla Sainte-Chapelle"],
      corretta: 1,
      spiegazione: "Nel 1908 le ceneri di Zola furono traslate con cerimonia di Stato al Panthéon di Parigi, tempio laico dei grandi uomini della nazione."
    },
    {
      id: 13,
      domanda: "Quale romanzo di Zola tratta l'alcolismo e il dramma operaio della lavandaia Gervaise?",
      opzioni: ["L'Assommoir", "Nana", "La Bête humaine", "La Terre"],
      corretta: 0,
      spiegazione: "L'Assommoir (1877), ambientato nei sobborghi popolari parigini, racconta la spirale tragica dell'alcolismo proletario."
    },
    {
      id: 14,
      domanda: "Oltre alla letteratura, quale grande passione artistica e tecnologica coltivò Zola con oltre 4000 scatti?",
      opzioni: ["La Scultura su marmo", "La Fotografia", "L'Incisione su rame", "La Liuteria"],
      corretta: 1,
      spiegazione: "Zola fu un appassionato fotografo documentarista d'avanguardia con più di 4000 scatti originali."
    },
    {
      id: 15,
      domanda: "Come evolve il pensiero di Zola nella sua ultima trilogia e tetralogia (Les Trois Villes e Les Quatre Évangiles)?",
      opzioni: ["Verso un pessimismo nichilista totale", "Da naturalismo clinico verso un socialismo umanitario e utopico fondato sulla scienza", "Abbraccia il misticismo medievale", "Rinnega il metodo scientifico"],
      corretta: 1,
      spiegazione: "Nella fase finale Zola supera il pessimismo dei Rougon-Macquart aprendosi a un'utopia di redenzione sociale fondata su lavoro, educazione e progresso."
    }
  ]
};

// =========================================================================
// SISTEMA AVATAR ULTRA-CARINI KAHOOT-STYLE CON ANIMALI & ACCESSORI (SVG VETTORIALI)
// =========================================================================

const AVATAR_CHARACTERS = [
  { id: 'cat', name: 'Gattino', species: 'Gatto', bg: '#f43f5e' },
  { id: 'dog', name: 'Cagnolino', species: 'Cane', bg: '#3b82f6' },
  { id: 'bear', name: 'Orsetto', species: 'Orso', bg: '#d97706' },
  { id: 'panda', name: 'Panda', species: 'Panda', bg: '#059669' },
  { id: 'fox', name: 'Volpe', species: 'Volpe', bg: '#ea580c' },
  { id: 'koala', name: 'Koala', species: 'Koala', bg: '#8b5cf6' },
  { id: 'bunny', name: 'Coniglietto', species: 'Coniglio', bg: '#ec4899' },
  { id: 'lion', name: 'Leoncino', species: 'Leone', bg: '#eab308' },
  { id: 'owl', name: 'Gufetto', species: 'Gufo', bg: '#6366f1' },
  { id: 'frog', name: 'Ranocchia', species: 'Rana', bg: '#10b981' },
  { id: 'penguin', name: 'Pinguino', species: 'Pinguino', bg: '#0284c7' },
  { id: 'zola_cat', name: 'Émile Cat', species: 'Zola Feline', bg: '#be123c' }
];

const AVATAR_ACCESSORIES = [
  { id: 'none', name: 'Naturale', label: 'Nessuno' },
  { id: 'glasses', name: 'Occhiali Tondi Zola', label: 'Occhiali Zola' },
  { id: 'sunglasses', name: 'Occhiali Cool', label: 'Occhiali da Sole' },
  { id: 'tophat', name: 'Cilindro Ottocentesco', label: 'Cilindro 1800' },
  { id: 'crown', name: 'Corona d\'Oro', label: 'Corona Reale' },
  { id: 'bow', name: 'Fiocchetto Rosso', label: 'Fiocco Chic' },
  { id: 'headset', name: 'Cuffie Gamer', label: 'Cuffie Pro' },
  { id: 'beret', name: 'Basco Parigino', label: 'Basco Francese' },
  { id: 'flower', name: 'Fiorellino', label: 'Fiore Magico' },
  { id: 'miner_hat', name: 'Casco da Minatore', label: 'Casco Germinal' }
];

const AVATAR_COLORS = [
  { id: 'rose', name: 'Rosa Vivo', color: '#f43f5e' },
  { id: 'blue', name: 'Blu Reale', color: '#2563eb' },
  { id: 'purple', name: 'Viola Chic', color: '#7c3aed' },
  { id: 'emerald', name: 'Verde Smeraldo', color: '#059669' },
  { id: 'amber', name: 'Ambra Dorata', color: '#d97706' },
  { id: 'crimson', name: 'Rosso Zola', color: '#be123c' },
  { id: 'cyan', name: 'Ciano Brillante', color: '#0891b2' },
  { id: 'indigo', name: 'Indaco Notte', color: '#4338ca' }
];

// Generatore Vettoriale SVG per Avatar Animali Super-Carini & Accessori
function renderAvatarSVG(charId = 'cat', accId = 'none', bgColor = null, size = 64) {
  const char = AVATAR_CHARACTERS.find(c => c.id === charId) || AVATAR_CHARACTERS[0];
  const bg = bgColor || char.bg;

  let faceElements = '';
  let accessoryElements = '';

  // Base Musetti Animali Carini Kahoot-Style (forme geometriche morbide e occhi luccicanti)
  switch (charId) {
    case 'cat':
      faceElements = `
        <!-- Orecchie Gatto -->
        <polygon points="26,34 16,14 38,24" fill="#fbcfe8" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="74,34 84,14 62,24" fill="#fbcfe8" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="27,31 20,18 35,24" fill="#f43f5e" />
        <polygon points="73,31 80,18 65,24" fill="#f43f5e" />
        <!-- Testa -->
        <circle cx="50" cy="56" r="32" fill="#fed7aa" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Guanciotte Rosate -->
        <ellipse cx="32" cy="62" rx="5" ry="3" fill="#fca5a5" opacity="0.8"/>
        <ellipse cx="68" cy="62" rx="5" ry="3" fill="#fca5a5" opacity="0.8"/>
        <!-- Baffetti -->
        <line x1="20" y1="56" x2="32" y2="58" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <line x1="20" y1="64" x2="32" y2="62" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <line x1="80" y1="56" x2="68" y2="58" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <line x1="80" y1="64" x2="68" y2="62" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <!-- Occhi Grandi Kawaii -->
        <ellipse cx="38" cy="52" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="36.5" cy="50" r="1.8" fill="#ffffff"/>
        <ellipse cx="62" cy="52" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="60.5" cy="50" r="1.8" fill="#ffffff"/>
        <!-- Nasino e Bocca -->
        <polygon points="50,59 47,56 53,56" fill="#f43f5e"/>
        <path d="M46,62 Q50,65 54,62" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      `;
      break;

    case 'dog':
      faceElements = `
        <!-- Orecchie Pendenti Cane -->
        <ellipse cx="20" cy="48" rx="9" ry="16" fill="#92400e" transform="rotate(-15 20 48)" stroke="#ffffff" stroke-width="2"/>
        <ellipse cx="80" cy="48" rx="9" ry="16" fill="#92400e" transform="rotate(15 80 48)" stroke="#ffffff" stroke-width="2"/>
        <!-- Testa -->
        <circle cx="50" cy="54" r="31" fill="#fde68a" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Macchia Occhio -->
        <ellipse cx="38" cy="48" rx="9" ry="11" fill="#d97706" opacity="0.6"/>
        <!-- Occhi -->
        <ellipse cx="38" cy="50" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="36.5" cy="48.5" r="1.8" fill="#ffffff"/>
        <ellipse cx="62" cy="50" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="60.5" cy="48.5" r="1.8" fill="#ffffff"/>
        <!-- Guanciotte -->
        <ellipse cx="30" cy="60" rx="5" ry="3" fill="#fca5a5" opacity="0.7"/>
        <ellipse cx="70" cy="60" rx="5" ry="3" fill="#fca5a5" opacity="0.7"/>
        <!-- Musetto e Linguetta Felice -->
        <ellipse cx="50" cy="62" rx="9" ry="7" fill="#ffffff"/>
        <ellipse cx="50" cy="58" rx="4" ry="2.5" fill="#0f172a"/>
        <path d="M50,60 L50,64 M47,64 Q50,67 53,64" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M48,65 Q50,71 52,65" fill="#f43f5e"/>
      `;
      break;

    case 'bear':
      faceElements = `
        <!-- Orecchie Orsetto -->
        <circle cx="25" cy="28" r="11" fill="#b45309" stroke="#ffffff" stroke-width="2"/>
        <circle cx="25" cy="28" r="6" fill="#fde68a"/>
        <circle cx="75" cy="28" r="11" fill="#b45309" stroke="#ffffff" stroke-width="2"/>
        <circle cx="75" cy="28" r="6" fill="#fde68a"/>
        <!-- Testa -->
        <circle cx="50" cy="55" r="32" fill="#b45309" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Musetto Beige -->
        <ellipse cx="50" cy="63" rx="14" ry="11" fill="#fde68a"/>
        <!-- Occhi -->
        <ellipse cx="37" cy="48" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="35.5" cy="46.5" r="1.8" fill="#ffffff"/>
        <ellipse cx="63" cy="48" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="61.5" cy="46.5" r="1.8" fill="#ffffff"/>
        <!-- Guance -->
        <ellipse cx="28" cy="56" rx="4.5" ry="3" fill="#fca5a5" opacity="0.6"/>
        <ellipse cx="72" cy="56" rx="4.5" ry="3" fill="#fca5a5" opacity="0.6"/>
        <!-- Nasino e Bocca -->
        <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#0f172a"/>
        <path d="M46,65 Q50,68 54,65" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      `;
      break;

    case 'panda':
      faceElements = `
        <!-- Orecchie Panda Nere -->
        <circle cx="24" cy="28" r="11" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
        <circle cx="76" cy="28" r="11" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
        <!-- Testa Bianca -->
        <circle cx="50" cy="55" r="32" fill="#ffffff" stroke="#e2e8f0" stroke-width="2.5"/>
        <!-- Macchie Nere Occhi -->
        <ellipse cx="36" cy="49" rx="8" ry="10" fill="#0f172a" transform="rotate(-15 36 49)"/>
        <ellipse cx="64" cy="49" rx="8" ry="10" fill="#0f172a" transform="rotate(15 64 49)"/>
        <!-- Occhi Lucidi -->
        <circle cx="36" cy="49" r="3" fill="#ffffff"/>
        <circle cx="37" cy="50" r="1.5" fill="#0f172a"/>
        <circle cx="64" cy="49" r="3" fill="#ffffff"/>
        <circle cx="63" cy="50" r="1.5" fill="#0f172a"/>
        <!-- Guanciotte Rosa -->
        <ellipse cx="26" cy="62" rx="5" ry="3" fill="#fca5a5"/>
        <ellipse cx="74" cy="62" rx="5" ry="3" fill="#fca5a5"/>
        <!-- Nasino e Sorriso -->
        <ellipse cx="50" cy="60" rx="4" ry="2.5" fill="#0f172a"/>
        <path d="M46,65 Q50,68 54,65" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      `;
      break;

    case 'fox':
      faceElements = `
        <!-- Orecchie Volpe -->
        <polygon points="20,38 12,12 40,24" fill="#ea580c" stroke="#ffffff" stroke-width="2.5"/>
        <polygon points="80,38 88,12 60,24" fill="#ea580c" stroke="#ffffff" stroke-width="2.5"/>
        <polygon points="21,34 16,17 36,25" fill="#ffffff"/>
        <polygon points="79,34 84,17 64,25" fill="#ffffff"/>
        <!-- Testa Arancione -->
        <circle cx="50" cy="56" r="32" fill="#ea580c" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Maschera Bianca Musetto -->
        <path d="M22,54 Q50,86 78,54 Q65,48 50,56 Q35,48 22,54 Z" fill="#ffffff"/>
        <!-- Occhi Furbetti -->
        <ellipse cx="36" cy="49" rx="4" ry="5.5" fill="#0f172a"/>
        <circle cx="35" cy="47.5" r="1.6" fill="#ffffff"/>
        <ellipse cx="64" cy="49" rx="4" ry="5.5" fill="#0f172a"/>
        <circle cx="63" cy="47.5" r="1.6" fill="#ffffff"/>
        <!-- Guance Rosate -->
        <ellipse cx="28" cy="62" rx="4" ry="2.5" fill="#fca5a5"/>
        <ellipse cx="72" cy="62" rx="4" ry="2.5" fill="#fca5a5"/>
        <!-- Naso Nero -->
        <ellipse cx="50" cy="66" rx="4" ry="3" fill="#0f172a"/>
      `;
      break;

    case 'koala':
      faceElements = `
        <!-- Orecchie Pelose Koala -->
        <circle cx="18" cy="38" r="14" fill="#94a3b8" stroke="#ffffff" stroke-width="2"/>
        <circle cx="18" cy="38" r="8" fill="#e2e8f0"/>
        <circle cx="82" cy="38" r="14" fill="#94a3b8" stroke="#ffffff" stroke-width="2"/>
        <circle cx="82" cy="38" r="8" fill="#e2e8f0"/>
        <!-- Testa Grigia -->
        <circle cx="50" cy="56" r="31" fill="#94a3b8" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Occhi Neri Dolcezza -->
        <ellipse cx="34" cy="50" rx="4" ry="5" fill="#0f172a"/>
        <circle cx="33" cy="48.5" r="1.6" fill="#ffffff"/>
        <ellipse cx="66" cy="50" rx="4" ry="5" fill="#0f172a"/>
        <circle cx="65" cy="48.5" r="1.6" fill="#ffffff"/>
        <!-- Guance -->
        <ellipse cx="27" cy="62" rx="5" ry="3" fill="#fca5a5" opacity="0.8"/>
        <ellipse cx="73" cy="62" rx="5" ry="3" fill="#fca5a5" opacity="0.8"/>
        <!-- Gran Nasone Ovale Nero Tipico -->
        <ellipse cx="50" cy="58" rx="8.5" ry="12" fill="#1e293b"/>
        <ellipse cx="48" cy="53" rx="2.5" ry="4" fill="#475569"/>
      `;
      break;

    case 'bunny':
      faceElements = `
        <!-- Orecchie Lunghe Coniglio -->
        <ellipse cx="32" cy="18" rx="7" ry="20" fill="#ffffff" stroke="#f472b6" stroke-width="2"/>
        <ellipse cx="32" cy="18" rx="4" ry="14" fill="#fbcfe8"/>
        <ellipse cx="68" cy="18" rx="7" ry="20" fill="#ffffff" stroke="#f472b6" stroke-width="2"/>
        <ellipse cx="68" cy="18" rx="4" ry="14" fill="#fbcfe8"/>
        <!-- Testa Coniglietto -->
        <circle cx="50" cy="58" r="30" fill="#ffffff" stroke="#e2e8f0" stroke-width="2.5"/>
        <!-- Guanciotte Rosatissime -->
        <ellipse cx="30" cy="64" rx="6" ry="3.5" fill="#fca5a5"/>
        <ellipse cx="70" cy="64" rx="6" ry="3.5" fill="#fca5a5"/>
        <!-- Occhioni Grandissimi -->
        <ellipse cx="38" cy="52" rx="5" ry="6.5" fill="#0f172a"/>
        <circle cx="36.5" cy="50" r="2.2" fill="#ffffff"/>
        <circle cx="40" cy="54" r="1" fill="#ffffff"/>
        <ellipse cx="62" cy="52" rx="5" ry="6.5" fill="#0f172a"/>
        <circle cx="60.5" cy="50" r="2.2" fill="#ffffff"/>
        <circle cx="64" cy="54" r="1" fill="#ffffff"/>
        <!-- Nasino Rosa a Cuoricino -->
        <polygon points="50,62 47,59 53,59" fill="#ec4899"/>
        <path d="M46,65 Q50,68 54,65" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      `;
      break;

    case 'lion':
      faceElements = `
        <!-- Criniera Leoncino -->
        <circle cx="50" cy="54" r="38" fill="#d97706" stroke="#ffffff" stroke-width="2"/>
        <!-- Orecchie -->
        <circle cx="24" cy="30" r="9" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <circle cx="76" cy="30" r="9" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <!-- Testa Gialla -->
        <circle cx="50" cy="56" r="28" fill="#fde68a" stroke="#ffffff" stroke-width="2"/>
        <!-- Occhi -->
        <ellipse cx="39" cy="50" rx="4" ry="5" fill="#0f172a"/>
        <circle cx="38" cy="48.5" r="1.6" fill="#ffffff"/>
        <ellipse cx="61" cy="50" rx="4" ry="5" fill="#0f172a"/>
        <circle cx="60" cy="48.5" r="1.6" fill="#ffffff"/>
        <!-- Musetto Bianco -->
        <ellipse cx="50" cy="62" rx="10" ry="7" fill="#ffffff"/>
        <ellipse cx="50" cy="58" rx="4" ry="2.5" fill="#b45309"/>
        <path d="M46,64 Q50,67 54,64" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Guance -->
        <ellipse cx="32" cy="62" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8"/>
        <ellipse cx="68" cy="62" rx="4" ry="2.5" fill="#fca5a5" opacity="0.8"/>
      `;
      break;

    case 'owl':
      faceElements = `
        <!-- Ciuffi Piume Orecchie Gufo -->
        <polygon points="26,30 18,16 36,24" fill="#4338ca"/>
        <polygon points="74,30 82,16 64,24" fill="#4338ca"/>
        <!-- Corpo/Testa Viola -->
        <circle cx="50" cy="55" r="32" fill="#6366f1" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Cerchi Occhi Enormi Tipici da Gufo -->
        <circle cx="37" cy="50" r="11" fill="#ffffff"/>
        <circle cx="63" cy="50" r="11" fill="#ffffff"/>
        <!-- Iridi e Pupille -->
        <circle cx="37" cy="50" r="6" fill="#f59e0b"/>
        <circle cx="37" cy="50" r="3.5" fill="#0f172a"/>
        <circle cx="35.5" cy="48.5" r="1.5" fill="#ffffff"/>
        <circle cx="63" cy="50" r="6" fill="#f59e0b"/>
        <circle cx="63" cy="50" r="3.5" fill="#0f172a"/>
        <circle cx="61.5" cy="48.5" r="1.5" fill="#ffffff"/>
        <!-- Becco Arancione -->
        <polygon points="50,64 45,54 55,54" fill="#ea580c"/>
        <!-- Petto Piumoso -->
        <path d="M42,72 Q50,75 58,72 M44,77 Q50,80 56,77" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
      `;
      break;

    case 'frog':
      faceElements = `
        <!-- Occhioni Sporgenti in Alto Ranocchia -->
        <circle cx="30" cy="32" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="70" cy="32" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="30" cy="32" r="6" fill="#0f172a"/>
        <circle cx="28" cy="30" r="2.2" fill="#ffffff"/>
        <circle cx="70" cy="32" r="6" fill="#0f172a"/>
        <circle cx="68" cy="30" r="2.2" fill="#ffffff"/>
        <!-- Testa Ovale Ranocchia -->
        <ellipse cx="50" cy="58" rx="34" ry="26" fill="#10b981" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Guance Rosa Fuoco -->
        <ellipse cx="26" cy="60" rx="6" ry="3.5" fill="#f43f5e" opacity="0.85"/>
        <ellipse cx="74" cy="60" rx="6" ry="3.5" fill="#f43f5e" opacity="0.85"/>
        <!-- Grandissimo Sorriso Felice da Ranocchia -->
        <path d="M28,58 Q50,78 72,58" fill="none" stroke="#064e3b" stroke-width="3" stroke-linecap="round"/>
        <!-- Narici a Puntini -->
        <circle cx="47" cy="54" r="1.2" fill="#064e3b"/>
        <circle cx="53" cy="54" r="1.2" fill="#064e3b"/>
      `;
      break;

    case 'penguin':
      faceElements = `
        <!-- Testa Pinguino Ovale Nera -->
        <ellipse cx="50" cy="55" rx="30" ry="32" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
        <!-- Pancia / Faccia a Cuore Bianca -->
        <path d="M50,42 Q32,32 28,54 Q28,78 50,82 Q72,78 72,54 Q68,32 50,42 Z" fill="#ffffff"/>
        <!-- Occhi -->
        <ellipse cx="40" cy="50" rx="4" ry="5.5" fill="#0f172a"/>
        <circle cx="38.5" cy="48.5" r="1.6" fill="#ffffff"/>
        <ellipse cx="60" cy="50" rx="4" ry="5.5" fill="#0f172a"/>
        <circle cx="58.5" cy="48.5" r="1.6" fill="#ffffff"/>
        <!-- Guance -->
        <ellipse cx="32" cy="60" rx="4.5" ry="3" fill="#fca5a5"/>
        <ellipse cx="68" cy="60" rx="4.5" ry="3" fill="#fca5a5"/>
        <!-- Becco Giallo/Arancio -->
        <polygon points="50,64 43,56 57,56" fill="#f59e0b"/>
      `;
      break;

    case 'zola_cat':
    default:
      faceElements = `
        <!-- Émile Zola Cat (Gattino con Barba Elegante Ottocentesca) -->
        <polygon points="26,32 16,14 38,24" fill="#fbcfe8" stroke="#ffffff" stroke-width="2"/>
        <polygon points="74,32 84,14 62,24" fill="#fbcfe8" stroke="#ffffff" stroke-width="2"/>
        <circle cx="50" cy="54" r="31" fill="#fed7aa" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Barbetta Zola Bianca -->
        <path d="M36,60 Q50,84 64,60 Q50,70 36,60 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Occhioni -->
        <ellipse cx="38" cy="48" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="36.5" cy="46.5" r="1.8" fill="#ffffff"/>
        <ellipse cx="62" cy="48" rx="4.5" ry="5.5" fill="#0f172a"/>
        <circle cx="60.5" cy="46.5" r="1.8" fill="#ffffff"/>
        <!-- Nasino -->
        <polygon points="50,56 47,53 53,53" fill="#f43f5e"/>
      `;
      break;
  }

  // Layer Accessori Personalizzabili
  switch (accId) {
    case 'glasses':
      accessoryElements = `
        <!-- Occhiali Tondi Zola Dorati -->
        <circle cx="37" cy="50" r="10" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
        <circle cx="63" cy="50" r="10" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
        <line x1="47" y1="50" x2="53" y2="50" stroke="#f59e0b" stroke-width="2.5"/>
        <!-- Lenti Riflesso Lucido -->
        <path d="M33,45 L38,45" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
        <path d="M59,45 L64,45" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      `;
      break;

    case 'sunglasses':
      accessoryElements = `
        <!-- Occhiali da Sole Cool Neri -->
        <polygon points="26,44 48,44 45,58 29,58" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <polygon points="52,44 74,44 71,58 55,58" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <line x1="48" y1="46" x2="52" y2="46" stroke="#0f172a" stroke-width="2.5"/>
        <!-- Riflessi Azzurri sulle lenti -->
        <line x1="31" y1="48" x2="43" y2="54" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
        <line x1="57" y1="48" x2="69" y2="54" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      `;
      break;

    case 'tophat':
      accessoryElements = `
        <!-- Cilindro Ottocentesco Elegante -->
        <rect x="34" y="8" width="32" height="22" rx="2" fill="#1e293b" stroke="#ffffff" stroke-width="1.5"/>
        <rect x="34" y="24" width="32" height="6" fill="#be123c"/>
        <ellipse cx="50" cy="30" rx="24" ry="4.5" fill="#0f172a" stroke="#ffffff" stroke-width="1.5"/>
      `;
      break;

    case 'crown':
      accessoryElements = `
        <!-- Corona d'Oro Reale con Gemme -->
        <polygon points="32,24 30,12 40,18 50,10 60,18 70,12 68,24" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="50" cy="18" r="2" fill="#ef4444"/>
        <circle cx="38" cy="20" r="1.5" fill="#3b82f6"/>
        <circle cx="62" cy="20" r="1.5" fill="#10b981"/>
      `;
      break;

    case 'bow':
      accessoryElements = `
        <!-- Fiocco Rosso Carino -->
        <polygon points="50,22 38,15 38,29" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5"/>
        <polygon points="50,22 62,15 62,29" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="50" cy="22" r="3.5" fill="#ffe4e6" stroke="#f43f5e" stroke-width="1.5"/>
      `;
      break;

    case 'headset':
      accessoryElements = `
        <!-- Cuffie Gamer E-Sport -->
        <path d="M22,50 A28,28 0 0,1 78,50" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round"/>
        <rect x="16" y="44" width="8" height="16" rx="4" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
        <rect x="76" y="44" width="8" height="16" rx="4" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M20,56 Q24,72 36,68" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
        <circle cx="36" cy="68" r="2.5" fill="#f43f5e"/>
      `;
      break;

    case 'beret':
      accessoryElements = `
        <!-- Basco Parigino Bohemien -->
        <ellipse cx="48" cy="24" rx="26" ry="10" fill="#991b1b" transform="rotate(-10 48 24)" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="48" cy="14" r="2" fill="#991b1b"/>
      `;
      break;

    case 'flower':
      accessoryElements = `
        <!-- Fiorellino Magico -->
        <circle cx="70" cy="22" r="4" fill="#fbcfe8"/>
        <circle cx="76" cy="26" r="4" fill="#fbcfe8"/>
        <circle cx="70" cy="30" r="4" fill="#fbcfe8"/>
        <circle cx="64" cy="26" r="4" fill="#fbcfe8"/>
        <circle cx="70" cy="26" r="3" fill="#f59e0b"/>
      `;
      break;

    case 'miner_hat':
      accessoryElements = `
        <!-- Casco da Minatore di Germinal -->
        <path d="M28,26 Q50,14 72,26 L76,30 L24,30 Z" fill="#b45309" stroke="#ffffff" stroke-width="1.5"/>
        <!-- Lampada a Carburo Luminosa -->
        <ellipse cx="50" cy="24" rx="5" ry="5" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="50" cy="24" r="2" fill="#ffffff"/>
      `;
      break;

    case 'none':
    default:
      break;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}" class="avatar-svg-icon" style="background: ${bg}; border-radius: 50%; overflow: visible; display: inline-block; vertical-align: middle;">
      <!-- Sfondo circolare con bordo -->
      <circle cx="50" cy="50" r="46" fill="${bg}" stroke="#ffffff" stroke-width="3"/>
      <!-- Ombra morbida del personaggio -->
      <ellipse cx="50" cy="85" rx="28" ry="7" fill="rgba(0,0,0,0.18)"/>
      <!-- Elementi del Faccino -->
      ${faceElements}
      <!-- Elementi Accessorio -->
      ${accessoryElements}
    </svg>
  `.trim();
}

// Catalogo Avatar Retrocompatibile per il motore di gioco
const QUIZ_AVATARS = AVATAR_CHARACTERS.map(c => ({
  id: c.id,
  name: c.name,
  badge: c.species.slice(0, 2).toUpperCase(),
  color: c.bg,
  desc: c.species,
  charId: c.id,
  accId: 'none'
}));

window.AVATAR_CHARACTERS = AVATAR_CHARACTERS;
window.AVATAR_ACCESSORIES = AVATAR_ACCESSORIES;
window.AVATAR_COLORS = AVATAR_COLORS;
window.renderAvatarSVG = renderAvatarSVG;
window.QUIZ_AVATARS = QUIZ_AVATARS;

