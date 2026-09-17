// Database didattico completo per Émile Zola fedele al documento tecnico (Émile_Zola_Scheda_Tecnica.md)
const ZOLA_DATA = {
  biografia: {
    nomeCompleto: "Émile Édouard Charles Antoine Zola",
    nascita: "Parigi, 2 aprile 1840",
    morte: "Parigi, 29 settembre 1902 (asfissia da monossido di carbonio; circostanze controverse, ipotesi di attentato)",
    nazionalita: "Francese (padre italiano, ingegnere)",
    periodo: "Seconda metà dell'Ottocento — Secondo Impero e Terza Repubblica francese (1860–1902)",
    corrente: "Naturalismo francese (fondatore e teorico)",
    sepoltura: "Traslato nel 1908 al Panthéon di Parigi (riconoscimento ufficiale del suo ruolo letterario e civile)",
    
    // Punti chiave organizzati per una perfetta esposizione orale (facili da esporre e ricchi di dettagli)
    schedeEsposizione: [
      {
        tag: "ORIGINI E FORMAZIONE",
        titolo: "Origini italo-francesi e infanzia ad Aix",
        punti: [
          "Figlio di Francesco Zola (ingegnere e militare veneziano) e di Émilie Aubert (donna borghese francese).",
          "Cresce ad Aix-en-Provence, dove stringe una storica e fraterna amicizia con il futuro pittore Paul Cézanne.",
          "La morte improvvisa del padre (1847) fa piombare la famiglia in gravi difficoltà finanziarie."
        ],
        focusOrale: "Zola porta con sé la determinazione dell'autodidatta: il fallimento del baccalauréat lo costringe a lavorare presto a Parigi."
      },
      {
        tag: "INIZI LETTERARI",
        titolo: "Dall'editoria Hachette al Giornalismo d'Assalto",
        punti: [
          "Lavora come addetto alla pubblicità presso la prestigiosa libreria parigina Hachette, comprendendo le dinamiche editoriali moderne.",
          "Inizia l'attività di giornalista e critico d'arte, difendendo gli Impressionisti (Édouard Manet e Cézanne) contro il conformismo accademico.",
          "Nel 1867 pubblica *Thérèse Raquin*, il suo primo grande romanzo naturalista basato su studio clinico dei temperamenti."
        ],
        focusOrale: "Usa la stampa come laboratorio: il giornalismo gli fornisce l'oggettività e l'occhio acuto dell'inchiesta sociale."
      },
      {
        tag: "RUOLO CIVILE",
        titolo: "L'Affaire Dreyfus e la Nascita dell'Intellettuale Engagé",
        punti: [
          "Il 13 gennaio 1898 pubblica la celebre lettera aperta *J'accuse...!* sul quotidiano *L'Aurore* per difendere l'ufficiale Alfred Dreyfus.",
          "Denuncia lo Stato Maggiore dell'esercito francese di complotto antisemita e depistaggio.",
          "Condannato per diffamazione, si rifugia per alcuni mesi in esilio in Inghilterra (1898–1899) per continuare la sua battaglia di verità, prima di rientrare in patria."
        ],
        focusOrale: "Con Zola nasce l'intellettuale moderno: la letteratura si fa impegno morale e difesa della giustizia."
      },
      {
        tag: "FINE E RICONOSCIMENTO",
        titolo: "La Morte Misteriosa e l'Apoteosi al Panthéon",
        punti: [
          "Muore il 29 settembre 1902 nella sua casa di Parigi, asfissiato da fumi di monossido di carbonio dovuti a un comignolo ostruito.",
          "I sospetti di attentato da parte di fazioni nazionaliste e antidreyfusarde sono rimasti vivi nella storiografia.",
          "Nel 1908 le sue ceneri vengono traslate al Panthéon di Parigi: celebre l'orazione di Anatole France: *'Egli fu un momento della coscienza umana'*. "
        ],
        focusOrale: "La consacrazione al Panthéon suggella la vittoria morale delle sue battaglie democratiche e laiche."
      }
    ]
  },

  pilastriPoetica: [
    {
      id: "metodo-sperimentale",
      titolo: "1. Il Metodo Sperimentale applicato al romanzo",
      fonte: "Le roman expérimental (1880) — Claude Bernard (1865)",
      descrizione: "Zola trasferisce alla letteratura il metodo scientifico descritto dal fisiologo Claude Bernard (1865). Il romanziere non è un semplice narratore ma una sorta di 'medico legale' della società: registra, seziona, diagnostica.",
      fasi: [
        { passo: 1, nome: "Osservare", testo: "La realtà sociale con la massima oggettività, senza filtri morali o idealizzanti." },
        { passo: 2, nome: "Sperimentare", testo: "Collocando i personaggi in situazioni-limite per verificare come le leggi dell'ereditarietà e dell'ambiente ne determinano il comportamento." },
        { passo: 3, nome: "Dedurre", testo: "Leggi generali sul funzionamento della società, proprio come farebbe uno scienziato con i dati raccolti." }
      ]
    },
    {
      id: "determinismo",
      titolo: "2. Determinismo biologico e sociale",
      fonte: "Prosper Lucas (studi sull'ereditarietà)",
      descrizione: "Alla base dell'opera di Zola c'è la convinzione che l'uomo non sia libero, ma il prodotto meccanicistico di due forze insuperabili di causa-effetto.",
      fattori: [
        { nome: "L'Eredità Biologica", desc: "Temperamento, tare, pulsioni trasmesse di generazione in generazione (come l'alcolismo dei Macquart)." },
        { nome: "Il Milieu (Ambiente)", desc: "L'ambiente fisico, sociale ed economico in cui l'individuo è immerso (la miniera, il quartiere popolare, la fabbrica, il salotto borghese)." }
      ]
    },
    {
      id: "documento-umano",
      titolo: "3. Il Romanzo come 'Documento Umano' e il lavoro d'inchiesta",
      fonte: "Dossiers préparatoires",
      descrizione: "Prima di scrivere, Zola conduceva vere e proprie inchieste sul campo raccogliendo appunti nei celebri dossiers préparatoires. Questa documentazione minuziosa, quasi giornalistica, garantiva al romanzo il valore di 'verbale' scientificamente attendibile della realtà, non di semplice invenzione.",
      esempi: [
        { ambiente: "Miniere", opera: "Germinal" },
        { ambiente: "Mercati generali (Les Halles)", opera: "Le Ventre de Paris" },
        { ambiente: "Ferrovie", opera: "La Bête humaine" },
        { ambiente: "Ospedali e case popolari", opera: "L'Assommoir" }
      ]
    },
    {
      id: "pessimismo-utopia",
      titolo: "4. Pessimismo, denuncia sociale e tensione utopica",
      fonte: "Dai Rougon-Macquart a Les Quatre Évangiles",
      descrizione: "Se i Rougon-Macquart restituiscono un quadro spietato e pessimista dell'umanità (degrado, violenza, autodistruzione), nella produzione più tarda — in particolare Les Quatre Évangiles — emerge uno Zola utopista e fiducioso nel progresso: scienza, lavoro e giustizia sociale possono redimere l'umanità. Il pensiero evolve da un naturalismo clinico verso un socialismo umanitario."
    },
    {
      id: "impegno-civile",
      titolo: "5. Impegno civile e intellettuale engagé",
      fonte: "J'accuse...! (1898) & Gruppo di Médan (1880)",
      descrizione: "Zola incarna la nascita della figura dell'intellettuale impegnato nella Francia moderna: con J'accuse...! (L'Aurore, 13 gennaio 1898) mette reputazione e libertà al servizio della verità nel caso Dreyfus. Fu inoltre guida del gruppo di Médan con Maupassant, Huysmans e Alexis (Les Soirées de Médan, 1880)."
    }
  ],

  cicliLetterari: [
    {
      id: "rougon-macquart",
      titolo: "Les Rougon-Macquart",
      anni: "1871–1893",
      volumi: "20 romanzi",
      sottotitolo: "Histoire naturelle et sociale d'une famille sous le Second Empire",
      contenuto: "Storia naturale e sociale di una famiglia sotto il Secondo Impero. Segue due rami di un'unica famiglia attraverso vent'anni di Francia imperiale, ciascun romanzo dedicato a un ambiente sociale diverso.",
      rami: {
        rougon: "Ramo legittimo: arrivisti e ambiziosi.",
        macquart: "Ramo illegittimo: segnati da alcolismo e tare ereditarie."
      }
    },
    {
      id: "trois-villes",
      titolo: "Les Trois Villes",
      anni: "1894–1898",
      volumi: "3 romanzi",
      elenco: "Lourdes, Rome, Paris",
      contenuto: "Crisi religiosa e sociale di fine secolo."
    },
    {
      id: "quatre-evangiles",
      titolo: "Les Quatre Évangiles",
      anni: "1899–1902 (incompiuto)",
      volumi: "3 romanzi completati",
      elenco: "Fécondité, Travail, Vérité",
      contenuto: "Visione utopica e sociale del futuro."
    }
  ],

  titoliPiuNoti: [
    { titolo: "Thérèse Raquin", anno: 1867, desc: "Romanzo d'esordio naturalista, ossessione e colpa." },
    { titolo: "L'Assommoir", anno: 1877, desc: "Alcolismo e degrado nel proletariato parigino." },
    { titolo: "Nana", anno: 1880, desc: "Prostituzione e ipocrisia borghese." },
    { titolo: "Germinal", anno: 1885, desc: "Lotte operaie nelle miniere del Nord della Francia." },
    { titolo: "L'Œuvre", anno: 1886, desc: "Mondo artistico, ispirato all'amicizia con Cézanne." },
    { titolo: "La Bête humaine", anno: 1890, desc: "Pulsioni violente ed ereditarietà criminale." },
    { titolo: "J'accuse...!", anno: 1898, desc: "Lettera aperta, capolavoro di letteratura civile." }
  ],

  romanziRougonMacquart: [
    { n: 1, titolo: "La Fortune des Rougon", anno: 1871, ambiente: "Origini della famiglia, colpo di stato del 1851 a Plassans", tema: "Nascita dei due rami familiari (Rougon e Macquart) con Adélaïde Fouque; ascesa sociale spietata durante il colpo di stato di Napoleone III." },
    { n: 2, titolo: "La Curée", anno: 1872, ambiente: "Speculazione edilizia, alta borghesia parigina", tema: "Sventramenti di Parigi e trasformazioni urbane di Haussmann, corruzione morale, incesto e avidità finanziaria di Aristide Saccard." },
    { n: 3, titolo: "Le Ventre de Paris", anno: 1873, ambiente: "I mercati generali (Les Halles)", tema: "Opposizione simbolica tra 'i Magri' (Florent, repubblicano idealista) e 'i Grassi' (i bottegai borghesi ben nutriti) nel tempio del cibo parigino." },
    { n: 4, titolo: "La Conquête de Plassans", anno: 1874, ambiente: "Clero, intrighi religiosi e provincia", tema: "L'abate Faujas si insinua nella vita provinciale per manipolare le elezioni a favore del regime bonapartista, distruggendo la famiglia Mouret." },
    { n: 5, titolo: "La Faute de l'abbé Mouret", anno: 1875, ambiente: "Chiesa, misticismo religioso e natura", tema: "Crisi spirituale e sensuale del giovane prete Serge Mouret nel giardino paradisiaco del Paradou con Albine, tra ascetismo e istinto vitale." },
    { n: 6, titolo: "Son Excellence Eugène Rougon", anno: 1876, ambiente: "Politica imperiale, corte e potere", tema: "I giochi di potere, il favoritismo e l'autoritarismo politico del Secondo Impero incarnati dal ministro Eugène Rougon." },
    { n: 7, titolo: "L'Assommoir", anno: 1877, ambiente: "Proletariato urbano, alcolismo e lavanderie", tema: "Dramma di Gervaise Macquart e Coupeau: la discesa irreversibile nella miseria e nell'alcolismo nella Parigi operaia; capolavoro di lingua gergale." },
    { n: 8, titolo: "Une page d'amour", anno: 1878, ambiente: "Borghesia parigina, passioni e sentimenti", tema: "La passione proibita della vedova Hélène Grandjean per il dottor Deberle e il tragico legame morboso con la figlia malata Jeanne." },
    { n: 9, titolo: "Nana", anno: 1880, ambiente: "Prostituzione, teatri e alta società", tema: "Nana (figlia di Gervaise) diventa cortigiana distruttrice dell'aristocrazia e dell'alta borghesia parigina: 'la mosca d'oro' nata dal degrado proletario." },
    { n: 10, titolo: "Pot-Bouille", anno: 1882, ambiente: "Ipocrisia morale della media e piccola borghesia", tema: "Dietro le facciate lussuose di un condominio borghese parigino in Rue de Choiseul si nascondono adulterio, avidità, grettezza e segreti inconfessabili." },
    { n: 11, titolo: "Au Bonheur des Dames", anno: 1883, ambiente: "Nascita dei grandi magazzini moderni e consumismo", tema: "Octave Mouret crea il tempio del commercio moderno travolgendo le piccole botteghe artigiane tradizionali; riscatto morale della commessa Denise." },
    { n: 12, titolo: "La Joie de vivre", anno: 1884, ambiente: "Costa normanna, pessimismo e malattia", tema: "Confronto tra l'angoscia esistenziale e la nevrosi di Lazare Chanteau e l'altruismo luminoso e resiliente di Pauline Quenu." },
    { n: 13, titolo: "Germinal", anno: 1885, ambiente: "Miniere di carbone, sfruttamento e lotta operaia", tema: "Capolavoro assoluto: Étienne Lantier guida il grande sciopero dei minatori di Montsou contro la Compagnia mineraria; epopea corale e speranza nel futuro." },
    { n: 14, titolo: "L'Œuvre", anno: 1886, ambiente: "Mondo artistico, Salon e pittura impressionista", tema: "Il dramma del pittore Claude Lantier, ossessionato dal capolavoro incompiuto e dall'ideale artistico (ispirato a Cézanne e Manet) fino al suicidio." },
    { n: 15, titolo: "La Terre", anno: 1887, ambiente: "Mondo contadino della Beauce", tema: "Attaccamento feroce e brutale alla terra, cupidigia per l'eredità, violenze e passioni primitive dei contadini francesi." },
    { n: 16, titolo: "Le Rêve", anno: 1888, ambiente: "Mondo ecclesiastico medievale, ricamo e misticismo", tema: "Fiaba mistica e pura della trovatella Angélique che ricama paramenti sacri e sogna un amore cavalleresco con il nobile Félicien." },
    { n: 17, titolo: "La Bête humaine", anno: 1890, ambiente: "Ferrovie, pulsioni omicide ed ereditarietà", tema: "Jacques Lantier è vittima di una tara ancestrale che lo spinge all'omicidio, intrecciato con la modernità meccanica dei treni a vapore (la Lison)." },
    { n: 18, titolo: "L'Argent", anno: 1891, ambiente: "Speculazione finanziaria, Borsa e banche d'affari", tema: "Aristide Saccard fonda la Banque Universelle sfidando l'alta finanza: ascesa vertiginosa e crollo rovinoso dei mercati finanziari." },
    { n: 19, titolo: "La Débâcle", anno: 1892, ambiente: "Guerra franco-prussiana del 1870 e Comune di Parigi", tema: "Disfatta militare di Sedan, fine del Secondo Impero di Napoleone III e sanguinosa guerra civile della Comune di Parigi." },
    { n: 20, titolo: "Le Docteur Pascal", anno: 1893, ambiente: "Sintesi scientifica finale e albero genealogico", tema: "Il dottor Pascal Rougon raccoglie e studia l'albero genealogico della famiglia Rougon-Macquart, celebrando la fede nella vita e nella scienza futura." }
  ],

  focusGerminal: {
    titolo: "Germinal (1885)",
    sottotitolo: "Tredicesimo romanzo dei Rougon-Macquart — Capolavoro assoluto per potenza epica, inchiesta sociale e valore simbolico",
    tramaEssenziale: "Étienne Lantier, giovane macchinista disoccupato con tara ereditaria di collera, giunge a Montsou e trova lavoro nella miniera di carbone Le Voreux. Di fronte all'incredibile miseria, alla denutrizione e ai pericoli mortali del pozzo, organizza e guida un epico sciopero di oltre due mesi. Nonostante la repressione armata dell'esercito e il sabotaggio dell'anarchico Souvarine, la sconfitta finale lascia un messaggio universale di speranza: il germe della giustizia sociale è sbocciato sotto terra e crescerà inesorabilmente.",
    
    // Trama strutturata in 3 Atti per la presentazione
    treAtti: [
      {
        atto: "ATTO I",
        titolo: "La Discesa negli Inferi di Montsou",
        tag: "Inchiesta & Condizioni",
        punti: [
          "<strong>L'Arrivo:</strong> Étienne Lantier, licenziato dalle ferrovie per indisciplina, arriva nella gelida pianura del Nord e viene accolto dalla famiglia Maheu.",
          "<strong>Il Pozzo 'Le Voreux':</strong> Gli operai lavorano seminudi a centinaia di metri sotto terra, tra gas mefitici (grisù), allagamenti e carichi massacranti per salari da fame.",
          "<strong>La Presa di Coscienza:</strong> Étienne legge opuscoli socialisti, stringe legami con Catherine Maheu e comincia a predicare l'unione dei lavoratori."
        ],
        citazione: "«Il pozzo ingoiava uomini a venti, a trenta per volta, e il mostro sembrava non saziarsi mai.»"
      },
      {
        atto: "ATTO II",
        titolo: "Il Grande Sciopero e la Tragedia",
        tag: "Conflitto di Classe",
        punti: [
          "<strong>La Rivolta:</strong> La Compagnia mineraria riduce i salari: scoppia lo sciopero a oltranza. La fame devasta le famiglie, ma la dignità prevale.",
          "<strong>Il Raduno nella Foresta:</strong> Nel bosco di Vandame, Étienne arringa 3.000 minatori proclamando il riscatto del lavoro contro il capitale.",
          "<strong>La Repressione e il Sangue:</strong> La borghesia chiama l'esercito: i soldati aprono il fuoco sui manifestanti uccidendo Toussaint Maheu e molti operai."
        ],
        citazione: "«Pane! Pane! Pane! Un urlo solo si alzava dalla folla di spettri affamati.»"
      },
      {
        atto: "ATTO III",
        titolo: "Il Sabotaggio, l'Abisso e il Seme",
        tag: "Epilogo & Speranza",
        punti: [
          "<strong>L'Attentato di Souvarine:</strong> L'anarchico russo sega le travi del pozzo: la miniera si allaga inghiottendo minatori e compagni.",
          "<strong>La Lotta nel Buio:</strong> Étienne e Catherine restano intrappolati nelle gallerie allagate. Étienne uccide il brutale rivale Chaval; Catherine muore tra le sue braccia prima dei soccorsi.",
          "<strong>La Germinazione:</strong> Étienne lascia Montsou verso Parigi in una luminosa mattina di primavera: il seme della rivoluzione sta germogliando sotto terra."
        ],
        citazione: "«Uomini stavano germogliando, un esercito nero e vendicatore che sarebbe presto sbocciato per i raccolti del secolo futuro.»"
      }
    ],

    personaggi: [
      {
        nome: "Étienne Lantier",
        ruolo: "Protagonista & Guida dello Sciopero",
        desc: "Figlio di Gervaise Macquart (da <em>L'Assommoir</em>). Intelligente, generoso ma segnato dalla tara familiare della violenza improvvisa. Rappresenta la nascita della coscienza operaia e socialista."
      },
      {
        nome: "Toussaint Maheu",
        ruolo: "Il Capofamiglia Minatore",
        desc: "Lavoratore onesto, instancabile e saggio. Simbolo della rassegnazione secolare che si trasforma in coraggio morale; viene ucciso dal piombo dei soldati."
      },
      {
        nome: "Catherine Maheu",
        ruolo: "L'Amore Tragico",
        desc: "Giovane minatrice legata a Étienne da un amore puro ma ostacolato dal bruto Chaval. Muore di stenti e fatica nelle gallerie allagate."
      },
      {
        nome: "Souvarine",
        ruolo: "L'Anarchico Nichilista",
        desc: "Esule russo, macchinista freddo e silenzioso. Contrario al compromesso e alle riforme: preferisce la distruzione totale della miniera per cancellare il male alla radice."
      },
      {
        nome: "La Maheude",
        ruolo: "La Voce delle Madri",
        desc: "Madre di sette figli: incarna il sacrificio quotidiano per la sopravvivenza e la furia disperata della fame proletaria."
      }
    ],

    puntiRappresentativi: [
      {
        titolo: "Sintesi perfetta di metodo e ideologia",
        desc: "Unisce l'inchiesta documentaria (Zola visitò realmente le miniere del bacino di Anzin nel 1884, durante uno sciopero) alla forza simbolica ed epica della narrazione."
      },
      {
        titolo: "Determinismo all'opera",
        desc: "I minatori sono ritratti come vittime di un sistema che li schiaccia biologicamente (denutrizione, malattie professionali, degrado fisico ereditario) e socialmente (sfruttamento capitalistico, alienazione)."
      },
      {
        titolo: "La miniera come organismo vivente",
        desc: "Zola descrive il pozzo minerario 'Le Voreux' (letteralmente 'il Vorace') come una creatura mostruosa che 'divora' gli operai — una delle metafore più potenti della letteratura naturalista, che trasforma il dato tecnico-industriale in immagine mitica."
      },
      {
        titolo: "Dimensione corale",
        desc: "A differenza di molti romanzi ottocenteschi centrati su un singolo protagonista, Germinal dà voce a un'intera comunità operaia, anticipando tecniche narrative più moderne (romanzo corale, realismo sociale del Novecento)."
      },
      {
        titolo: "Valore politico e storico",
        desc: "Pur non essendo un trattato marxista (Zola resta scettico sulle ideologie rivoluzionarie rigide, incarnate criticamente nel personaggio dell'anarchico Souvarine), il romanzo è diventato un testo di riferimento per la storia del movimento operaio, tanto da essere ancora oggi citato nei dibattiti su diritti dei lavoratori e giustizia sociale."
      },
      {
        titolo: "Eredità culturale",
        desc: "Ha ispirato numerosi adattamenti cinematografici (celebre quello di Claude Berri, 1993) e resta uno dei romanzi francesi più letti e studiati al mondo, spesso indicato come il vertice massimo del Naturalismo europeo."
      }
    ],
    chiaveSimbolicaTitolo: "'Germinal' era il settimo mese del calendario rivoluzionario francese (corrispondente a fine marzo-aprile), il mese della germinazione. Zola sceglie questo titolo per suggerire che, come i semi germogliano sotto la terra prima di sbocciare, così la coscienza di classe e la spinta al cambiamento sociale — pur sconfitte nel breve termine nel romanzo — sono un processo naturale e inarrestabile, destinato a 'fiorire' nel futuro."
  },

  curiosita: [
    {
      titolo: "L'amicizia con Cézanne",
      tag: "ARTE",
      testo: "Amico d'infanzia di Paul Cézanne ad Aix-en-Provence; l'amicizia si ruppe quando Cézanne si riconobbe nel pittore fallito di L'Œuvre.",
      immagine: "assets/foto/ZOLAECézanne.jpg",
      didascalia: "Émile Zola e Paul Cézanne ad Aix-en-Provence"
    },
    {
      titolo: "Fotografo appassionato",
      tag: "FOTOGRAFIA",
      testo: "Scattò oltre 4.000 fotografie, in parte pubblicate postume.",
      immagine: "assets/foto/ZOLAFOTOGRAFO.jpg",
      didascalia: "Émile Zola con la sua macchina fotografica"
    },
    {
      titolo: "Candidatura al Premio Nobel",
      tag: "RICONOSCIMENTI",
      testo: "Candidato al Premio Nobel per la Letteratura più volte, mai vincitore."
    },
    {
      titolo: "Morte e dibattito storico",
      tag: "STORIA",
      testo: "La sua morte resta oggetto di dibattito storico: ipotesi di omicidio legato ai suoi nemici politici nell'Affaire Dreyfus."
    },
    {
      titolo: "Traslazione al Panthéon (1908)",
      tag: "MEMORIA",
      testo: "Nel 1908 le sue ceneri furono traslate al Panthéon di Parigi, riconoscimento ufficiale del suo ruolo letterario e civile.",
      immagine: "assets/foto/PANTHEONZOLA.jpg",
      didascalia: "La solenne cerimonia di traslazione al Panthéon (1908)"
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
  { id: 'cat', name: 'Gatto', species: 'Gatto', bg: '#f43f5e' },
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
        <!-- Émile Zola Cat (Gatto con Barba Elegante Ottocentesca) -->
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

