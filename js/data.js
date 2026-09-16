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

// Catalogo Avatar Stylized Kahoot-Style (Zero Emoji, Massima Eleganza & Riconoscibilità)
const QUIZ_AVATARS = [
  { id: 'zola', name: 'Zola', badge: 'EZ', color: '#be123c', desc: 'Il Maestro' },
  { id: 'scienziato', name: 'Scienziato', badge: 'SC', color: '#1d4ed8', desc: 'Laboratorio' },
  { id: 'minatore', name: 'Minatore', badge: 'MN', color: '#b45309', desc: 'Germinal' },
  { id: 'giornalista', name: 'Giornalista', badge: 'GI', color: '#047857', desc: 'J\'accuse' },
  { id: 'artista', name: 'Artista', badge: 'AR', color: '#7c3aed', desc: 'L\'Œuvre' },
  { id: 'dottore', name: 'Dottore', badge: 'DR', color: '#0e7490', desc: 'Pascal' },
  { id: 'macchinista', name: 'Macchinista', badge: 'MC', color: '#c2410c', desc: 'La Bête' },
  { id: 'filosofo', name: 'Filosofo', badge: 'FI', color: '#4338ca', desc: 'Determinismo' },
  { id: 'fotografo', name: 'Fotografo', badge: 'FO', color: '#475569', desc: 'Médan' },
  { id: 'tribuno', name: 'Dreyfusard', badge: 'TR', color: '#991b1b', desc: 'Verità' },
  { id: 'esploratore', name: 'Documentarista', badge: 'DO', color: '#065f46', desc: 'Dossier' },
  { id: 'accademico', name: 'Accademico', badge: 'AC', color: '#6d28d9', desc: 'Panthéon' }
];

window.QUIZ_AVATARS = QUIZ_AVATARS;
