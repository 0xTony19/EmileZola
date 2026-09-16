/**
 * Main Application Logic for Émile Zola Interactive Technical Sheet (Enhanced UI / UX & Local Offline Sync)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndSettings();
  initScrollSpy();
  initMobileNavbar();
  initKeyboardNavigation();
  renderBiographicalData();
  renderPoeticsLab();
  renderFamilyTree();
  renderNovelsExplorer();
  renderCuriosities();
  initQuizController();
  checkUrlMode();
});

// 2. ScrollSpy in Tempo Reale per la Navbar
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}

// 3. Gestione Menu Mobile Responsive
function initMobileNavbar() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navWrapper = document.getElementById('nav-links-wrapper');
  if (!toggleBtn || !navWrapper) return;

  toggleBtn.addEventListener('click', () => {
    navWrapper.classList.toggle('open');
  });

  // Chiudi menu al click su un link
  document.querySelectorAll('.nav-item-link').forEach(link => {
    link.addEventListener('click', () => {
      navWrapper.classList.remove('open');
    });
  });
}

// 2. Comandi da Tastiera per Presentazione e Quiz
function initKeyboardNavigation() {
  const sections = ['biografia', 'poetica', 'albero', 'romanzi', 'germinal', 'jaccuse', 'curiosita'];
  let currentSecIdx = 0;

  window.addEventListener('keydown', (e) => {
    // Ignora se si sta digitando in un input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Tasto 'Q' -> Lancia o Chiude Quiz
    if (e.key.toLowerCase() === 'q') {
      const modal = document.getElementById('quiz-modal');
      if (modal && modal.classList.contains('active')) {
        window.quizApp.closeQuizModal();
      } else {
        window.quizApp.openQuizModal();
      }
      return;
    }

    // Tasto 'T' -> Cambia Tema
    if (e.key.toLowerCase() === 't') {
      const currentTheme = document.body.getAttribute('data-theme') || 'classic';
      const nextTheme = currentTheme === 'classic' ? 'dark' : (currentTheme === 'dark' ? 'sepia' : 'classic');
      document.body.setAttribute('data-theme', nextTheme);
      const label = document.querySelector('#theme-toggle-btn .theme-label');
      if (label) label.textContent = `TEMA: ${nextTheme.toUpperCase()}`;
      return;
    }

    // Tasto 'F' -> Schermo Intero
    if (e.key.toLowerCase() === 'f') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
      return;
    }

    // Risposta diretta quiz da tastiera quando è attiva una domanda: 1/A, 2/B, 3/C, 4/D
    if (window.quizApp && window.quizApp.engine && window.quizApp.engine.gameState === 'QUESTION') {
      const keyMap = { '1': 0, 'a': 0, '2': 1, 'b': 1, '3': 2, 'c': 2, '4': 3, 'd': 3 };
      const pressed = e.key.toLowerCase();
      if (keyMap.hasOwnProperty(pressed)) {
        window.quizApp.onHostOptionClick(keyMap[pressed]);
        return;
      }
    }

    // Navigazione sezioni con freccia destra/giù (avanti) e sinistra/su (indietro)
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      currentSecIdx = Math.min(sections.length - 1, currentSecIdx + 1);
      const el = document.getElementById(sections[currentSecIdx]);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      currentSecIdx = Math.max(0, currentSecIdx - 1);
      const el = document.getElementById(sections[currentSecIdx]);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// 3. Gestione Temi e Audio
function initThemeAndSettings() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const presentationBtn = document.getElementById('presentation-btn');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'classic';
      const nextTheme = currentTheme === 'classic' ? 'dark' : (currentTheme === 'dark' ? 'sepia' : 'classic');
      document.body.setAttribute('data-theme', nextTheme);
      themeToggleBtn.querySelector('.theme-label').textContent = `TEMA: ${nextTheme.toUpperCase()}`;
      SFX.playTone(440, 'sine', 0.05, 0.05);
    });
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      SFX.enabled = !SFX.enabled;
      soundToggleBtn.classList.toggle('muted', !SFX.enabled);
      soundToggleBtn.querySelector('.sound-icon').textContent = SFX.enabled ? 'AUDIO: ATTIVO' : 'AUDIO: DISATTIVATO';
      if (SFX.enabled) SFX.playTone(520, 'sine', 0.1, 0.08);
    });
  }

  if (presentationBtn) {
    presentationBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }
}

// 4. Render Dati Biografici
function renderBiographicalData() {
  const bio = ZOLA_DATA.biografia;
  const bioGrid = document.getElementById('bio-identity-grid');
  if (!bioGrid) return;

  bioGrid.innerHTML = `
    <div class="bio-card passport-card">
      <div class="passport-header">
        <span class="passport-stamp">RÉPUBLIQUE FRANÇAISE</span>
        <span class="passport-title">DOSSIER D'IDENTITÉ</span>
      </div>
      <div class="passport-body">
        <div class="passport-field">
          <label>Nome Completo</label>
          <div class="val">${bio.nomeCompleto}</div>
        </div>
        <div class="passport-field">
          <label>Data e Luogo di Nascita</label>
          <div class="val">${bio.nascita}</div>
        </div>
        <div class="passport-field">
          <label>Data e Circostanze della Morte</label>
          <div class="val highlight-val">${bio.morte} <br><small class="text-muted">(${bio.causaMorte})</small></div>
        </div>
        <div class="passport-field">
          <label>Nazionalità e Radici</label>
          <div class="val">${bio.nazionalita}</div>
        </div>
        <div class="passport-field">
          <label>Ruolo Storico-Letterario</label>
          <div class="val gold-text">${bio.ruolo}</div>
        </div>
        <div class="passport-field">
          <label>Riconoscimento Ufficiale</label>
          <div class="val">${bio.sepoltura}</div>
        </div>
      </div>
    </div>
  `;
}

// 5. Laboratorio Scientifico & Metodo Sperimentale Interattivo
function renderPoeticsLab() {
  const labContainer = document.getElementById('determinism-simulator');
  if (!labContainer) return;

  const characters = [
    {
      nome: "Étienne Lantier (Germinal)",
      eredita: "Alcolismo ancestrale della nonna Adélaïde + istinto di rivolta",
      milieu: "Miniera di Montsou (sottosuolo, buio, miseria estrema)",
      risultato: "Leader dello sciopero operaio; pulsione aggressiva sublimata nella coscienza di classe e nella speranza per l'avvenire.",
      opera: "Germinal (1885)"
    },
    {
      nome: "Gervaise Macquart (L'Assommoir)",
      eredita: "Fragilità nervosa, inclinazione all'indolenza affettiva",
      milieu: "Sobborghi operai di Parigi, botteghe di liquori e sfruttamento",
      risultato: "Iniziale riscatto con la lavanderia, poi rovina economica, infortunio del marito e morte per fame e alcol.",
      opera: "L'Assommoir (1877)"
    },
    {
      nome: "Nana (Nana)",
      eredita: "Degenerazione fisica e morale dei Macquart trasformata in bellezza erotica",
      milieu: "I teatri parigini, i bordelli dorati e i palazzi della decadente alta nobiltà",
      risultato: "Vendetta inconscia del popolo: consuma e manda in bancarotta ministri e banchieri prima di morire di vaiolo.",
      opera: "Nana (1880)"
    },
    {
      nome: "Jacques Lantier (La Bête humaine)",
      eredita: "Follia criminale ereditaria insita nel sangue (pulsione omicida)",
      milieu: "Le moderne ferrovie, macchine a vapore e binari metallici",
      risultato: "Incapacità di frenare il mostro interiore: diventa omicida a bordo di un treno in corsa verso la catastrofe.",
      opera: "La Bête humaine (1890)"
    },
    {
      nome: "Dottor Pascal Rougon (Le Docteur Pascal)",
      eredita: "Intelligenza lucida e rigore di ricerca scientifica della stirpe",
      milieu: "Laboratorio medico a Plassans, isolamento filosofico",
      risultato: "Compila l'albero genealogico della famiglia e dimostra la vittoria della vita e della scienza sulla fatalità.",
      opera: "Le Docteur Pascal (1893)"
    }
  ];

  window.simulateDeterminism = function(idx) {
    const c = characters[idx];
    const out = document.getElementById('determinism-output');
    if (!out) return;

    out.innerHTML = `
      <div class="result-box animate-pop">
        <div class="result-header">
          <span class="formula-badge">EQUAZIONE DETERMINISTICA: ${c.nome}</span>
          <span class="book-tag">${c.opera}</span>
        </div>
        <div class="formula-grid">
          <div class="formula-col eredita-col">
            <h4>Eredità Biologica (Geni)</h4>
            <p>${c.eredita}</p>
          </div>
          <div class="formula-plus">+</div>
          <div class="formula-col milieu-col">
            <h4>Ambiente (Milieu Sociale)</h4>
            <p>${c.milieu}</p>
          </div>
          <div class="formula-equals">=</div>
          <div class="formula-col result-col">
            <h4>Diagnosi Clinica e Destino</h4>
            <p>${c.risultato}</p>
          </div>
        </div>
      </div>
    `;
    SFX.playTone(490, 'sine', 0.1, 0.08);
  };

  labContainer.innerHTML = `
    <div class="simulator-controls">
      <label>Seleziona un personaggio dei Rougon-Macquart per verificare l'analisi:</label>
      <div class="char-buttons-row">
        ${characters.map((c, i) => `
          <button class="btn-char-select ${i === 0 ? 'active' : ''}" onclick="window.selectCharBtn(this, ${i})">
            ${c.nome.split(' ')[0]} ${c.nome.split(' ')[1]}
          </button>
        `).join('')}
      </div>
    </div>
    <div id="determinism-output"></div>
  `;

  window.selectCharBtn = function(btn, idx) {
    document.querySelectorAll('.btn-char-select').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.simulateDeterminism(idx);
  };

  window.simulateDeterminism(0);
}

// 6. Albero Genealogico Interattivo Rougon-Macquart
function renderFamilyTree() {
  const treeContainer = document.getElementById('family-tree-visualizer');
  if (!treeContainer) return;

  const branches = [
    {
      tipo: "rougon",
      nomeRamo: "I ROUGON — Il Ramo Legittimo",
      caratteristiche: "Arrivismo, sete implacabile di potere politico, accumulo di capitale e rispettabilità borghese.",
      personaggi: [
        { nome: "Pierre Rougon", ruolo: "Capostipite", note: "Brama di arricchimento a Plassans, sfrutta il colpo di stato del 1851 per impadronirsi della città." },
        { nome: "Eugène Rougon", ruolo: "Ministro di Napoleone III", note: "Protagonista di 'Son Excellence Eugène Rougon', cinico manipolatore di corte." },
        { nome: "Aristide Saccard", ruolo: "Speculatore Edilizio e Finanziario", note: "Protagonista de 'La Curée' e 'L'Argent', sventra Parigi e fonda una banca speculativa." },
        { nome: "Dottor Pascal Rougon", ruolo: "Scienziato e Medico", note: "Protagonista de 'Le Docteur Pascal', redige la mappa genetica dell'intera dinastia." }
      ]
    },
    {
      tipo: "macquart",
      nomeRamo: "I MACQUART — Il Ramo Illegittimo",
      caratteristiche: "Tare degenerative, alcolismo cronico, nevrosi, degradazione operaia e ribellione sociale.",
      personaggi: [
        { nome: "Antoine Macquart", ruolo: "Capostipite del ramo", note: "Pigro, alcolizzato, invidioso dei Rougon, avvia la catena degenerativa biologica." },
        { nome: "Gervaise Macquart", ruolo: "Lavandaia a Parigi", note: "Protagonista de 'L'Assommoir', sprofonda nella miseria e nell'alcolismo." },
        { nome: "Étienne Lantier", ruolo: "Minatore e Guida dello Sciopero", note: "Protagonista del capolavoro 'Germinal', guida la riscossa dei lavoratori." },
        { nome: "Nana (Anna Coupeau)", ruolo: "Cortigiana dell'Alta Società", note: "Protagonista di 'Nana', personifica la distruzione corruttrice della borghesia." },
        { nome: "Jacques Lantier", ruolo: "Macchinista Ferroviario", note: "Protagonista de 'La Bête humaine', affetto da pulsione omicida inconscia." }
      ]
    }
  ];

  treeContainer.innerHTML = `
    <div class="tree-root-box animate-fade-in">
      <div class="root-ancestor">
        <span class="ancestor-tag">[CAPOSTIPITE COMUNE]</span>
        <h3>Adélaïde Fouque ("Zia Dide")</h3>
        <p>Origine comune di entrambi i rami. Affetta da nevrosi ereditaria, muore ultranovantenne nel manicomio di Tuettes.</p>
      </div>
      <div class="tree-branches-split">
        ${branches.map(b => `
          <div class="tree-branch-card branch-${b.tipo}">
            <div class="branch-badge">${b.tipo === 'rougon' ? 'RAMO BORGHESE' : 'RAMO PROLETARIO'}</div>
            <h3 class="branch-title">${b.nomeRamo}</h3>
            <p class="branch-desc">${b.caratteristiche}</p>
            <div class="branch-members">
              ${b.personaggi.map(p => `
                <div class="member-pill">
                  <strong>${p.nome}</strong> <span class="role-tag">(${p.ruolo})</span>
                  <small>${p.note}</small>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 7. Esploratore Interattivo dei 20 Romanzi con Modale Dettagli
function renderNovelsExplorer() {
  const container = document.getElementById('novels-grid');
  const filtersContainer = document.getElementById('novels-filters');
  if (!container) return;

  const novels = ZOLA_DATA.romanziRougonMacquart;
  const categories = [
    { label: "Tutti (20)", key: "all" },
    { label: "Miniere & Proletariato", key: "proletariato" },
    { label: "Borsa & Commercio", key: "commercio" },
    { label: "Arte & Spettacolo", key: "arte" },
    { label: "Politica & Nobiltà", key: "politica" },
    { label: "Ferrovie & Tecnologia", key: "ferrovia" }
  ];

  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" onclick="window.filterNovels('${cat.key}', this)">
        ${cat.label}
      </button>
    `).join('');
  }

  window.filterNovels = function(category, btn) {
    if (btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    let filtered = novels;
    if (category === 'proletariato') {
      filtered = novels.filter(n => [7, 13, 15].includes(n.n));
    } else if (category === 'commercio') {
      filtered = novels.filter(n => [2, 3, 11, 19].includes(n.n));
    } else if (category === 'arte') {
      filtered = novels.filter(n => [9, 14].includes(n.n));
    } else if (category === 'politica') {
      filtered = novels.filter(n => [1, 4, 6].includes(n.n));
    } else if (category === 'ferrovia') {
      filtered = novels.filter(n => [18].includes(n.n));
    }

    container.innerHTML = filtered.map(n => `
      <div class="novel-card ${n.n === 13 ? 'featured-novel' : ''} animate-pop" onclick="window.openNovelModal(${n.n - 1})">
        <div class="novel-card-top">
          <span class="novel-number">#${n.n}</span>
          <span class="novel-year">${n.anno}</span>
        </div>
        <h3 class="novel-title">${n.titolo}</h3>
        <div class="novel-env">Ambiente: ${n.ambiente}</div>
        <p class="novel-theme">${n.tema}</p>
        ${n.n === 13 ? '<div class="crown-badge">Capolavoro del Ciclo</div>' : ''}
      </div>
    `).join('');
  };

  window.openNovelModal = function(idx) {
    const n = novels[idx];
    if (!n) return;

    const modal = document.getElementById('novel-modal');
    const content = document.getElementById('novel-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="novel-modal-header" style="border-bottom: 1px solid var(--border-color); padding-bottom: 14px; margin-bottom: 18px;">
        <span class="novel-number" style="font-size: 1.1rem; font-weight: 700; color: var(--accent-gold);">Romanzo #${n.n} dei Rougon-Macquart (${n.anno})</span>
        <h2 style="font-family: var(--font-serif); font-size: 1.9rem; margin-top: 4px;">${n.titolo}</h2>
      </div>
      <div class="novel-modal-body">
        <p style="font-size: 1.05rem; margin-bottom: 14px;"><strong>Ambiente Sociale Esplorato:</strong> ${n.ambiente}</p>
        <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 18px;"><strong>Trama & Tematiche Chiave:</strong> ${n.tema}</p>
        <div style="background: var(--bg-main); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <small style="color: var(--text-muted); font-size: 0.85rem;">Questo romanzo costituisce uno dei 20 tasselli fondamentali attraverso cui Zola ha costruito il quadro analitico e sociale della Francia del Secondo Impero.</small>
        </div>
      </div>
    `;

    modal.classList.add('active');
    SFX.playTone(450, 'sine', 0.08, 0.05);
  };

  window.closeNovelModal = function() {
    const modal = document.getElementById('novel-modal');
    if (modal) modal.classList.remove('active');
  };

  window.filterNovels('all');
}

// 8. Curiosità e Approfondimenti
function renderCuriosities() {
  const container = document.getElementById('curiosities-grid');
  if (!container) return;

  container.innerHTML = ZOLA_DATA.curiosita.map(c => `
    <div class="curiosity-card animate-slide-up">
      <div class="curiosity-tag">${c.tag}</div>
      <h3 class="curiosity-title">${c.titolo}</h3>
      <p class="curiosity-text">${c.testo}</p>
    </div>
  `).join('');
}

// 9. Controller per la Gestione del Quiz
function initQuizController() {
  window.quizApp = {
    engine: new QuizEngine(ZOLA_DATA),
    publicJoinUrl: null,
    localJoinUrl: null,
    activeNetworkMode: 'public', // 'public' | 'local'

    openQuizModal: function() {
      const modal = document.getElementById('quiz-modal');
      if (!modal) return;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      this.engine.startLobby();
      this.detectServerIP();
      SFX.playTone(523.25, 'triangle', 0.15, 0.1);
    },

    closeQuizModal: function() {
      const modal = document.getElementById('quiz-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    detectServerIP: function() {
      const warnBox = document.getElementById('file-protocol-warning');
      const urlEl = document.getElementById('join-url-text');
      const hintEl = document.getElementById('qr-scan-instruction');
      const badgeEl = document.getElementById('network-mode-badge');

      // URL Ufficiale Online su GitHub Pages
      const githubPagesUrl = `https://0xtony19.github.io/EmileZola/?mode=player&room=${this.engine.roomCode}`;
      this.githubPagesUrl = githubPagesUrl;

      // Se aperto direttamente da GitHub Pages
      if (window.location.hostname.includes('github.io')) {
        if (warnBox) warnBox.style.display = 'none';
        const currentUrl = `${window.location.origin}${window.location.pathname}?mode=player&room=${this.engine.roomCode}`;
        this.publicJoinUrl = currentUrl;
        this.setNetworkMode('github');
        return;
      }

      // Se aperto tramite server locale Node.js
      if (window.location.protocol.startsWith('http')) {
        if (warnBox) warnBox.style.display = 'none';
        fetch('/api/server-info')
          .then(res => res.json())
          .then(info => {
            if (info) {
              const localUrl = (info.localIP && info.localIP !== 'localhost' && info.localIP !== '127.0.0.1')
                ? `http://${info.localIP}:${info.port}?mode=player&room=${this.engine.roomCode}`
                : `${window.location.origin}?mode=player&room=${this.engine.roomCode}`;
              
              this.localJoinUrl = localUrl;
              this.publicJoinUrl = info.publicUrl ? `${info.publicUrl}?mode=player&room=${this.engine.roomCode}` : githubPagesUrl;
              this.setNetworkMode('github');
            }
          })
          .catch(() => {
            this.localJoinUrl = `${window.location.origin}?mode=player&room=${this.engine.roomCode}`;
            this.setNetworkMode('github');
          });
      } else {
        // Modalità file:// (apertura diretta offline)
        if (warnBox) warnBox.style.display = 'none';
        this.localJoinUrl = `${window.location.href.split('?')[0]}?mode=player&room=${this.engine.roomCode}`;
        this.setNetworkMode('github');
      }
    },

    setNetworkMode: function(mode) {
      this.activeNetworkMode = mode;
      const urlEl = document.getElementById('join-url-text');
      const hintEl = document.getElementById('qr-scan-instruction');
      const badgeEl = document.getElementById('network-mode-badge');

      let targetUrl = '';
      if (mode === 'github' || mode === 'public') {
        targetUrl = this.publicJoinUrl || this.githubPagesUrl || `https://0xtony19.github.io/EmileZola/?mode=player&room=${this.engine.roomCode}`;
        if (badgeEl) badgeEl.textContent = "ONLINE: GITHUB PAGES (4G / 5G / QUALSIASI DISPOSITIVO)";
        if (hintEl) hintEl.textContent = "Inquadra con la fotocamera di QUALSIASI smartphone (4G, 5G, Wi-Fi)";
      } else {
        targetUrl = this.localJoinUrl || `${window.location.origin}?mode=player&room=${this.engine.roomCode}`;
        if (badgeEl) badgeEl.textContent = "MODALITA: RETE LOCALE / WI-FI / HOTSPOT";
        if (hintEl) hintEl.textContent = "Inquadra da telefoni connessi allo stesso Wi-Fi o Hotspot del PC";
      }

      this.currentJoinUrl = targetUrl;
      QRCodeGenerator.generate(targetUrl, 'qr-canvas-holder', 200);
      if (urlEl) urlEl.textContent = targetUrl;
    },

    copyJoinLink: function() {
      const url = this.currentJoinUrl || document.getElementById('join-url-text').textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          alert("Link di partecipazione per gli studenti copiato negli appunti!");
        }).catch(() => {});
      } else {
        prompt("Copia questo link:", url);
      }
    },

    openLocalPlayerTab: function() {
      const baseUrl = window.location.href.split('?')[0];
      const playerUrl = `${baseUrl}?mode=player&room=${this.engine.roomCode}`;
      window.open(playerUrl, '_blank');
    },

    setCustomIP: function() {
      const userIp = prompt("Inserisci l'indirizzo IP locale del tuo PC o Hotspot (es. 192.168.1.45):", "192.168.1.");
      if (userIp && userIp.trim()) {
        const port = window.location.port || '3000';
        const url = `http://${userIp.trim()}:${port}?mode=player&room=${this.engine.roomCode}`;
        this.localJoinUrl = url;
        this.setNetworkMode('local');
      }
    },

    kickPlayer: function(playerId) {
      this.engine.kickPlayer(playerId);
    },

    addBots: function() {
      this.engine.addDemoBots();
      SFX.playTone(700, 'sine', 0.1, 0.08);
    },

    startGame: function() {
      this.engine.startGame();
    },

    onHostOptionClick: function(optionIdx) {
      if (this.engine.gameState === 'QUESTION') {
        const timeTaken = (10 - parseFloat(this.engine.timeLeft));
        this.engine.recordPlayerAnswer('host_player', optionIdx, timeTaken);
      }
    },

    showLeaderboard: function() {
      this.engine.showLeaderboard();
    },

    advanceNext: function() {
      this.engine.advanceNext();
    },

    restartGame: function() {
      this.engine.startLobby();
      this.detectServerIP();
    },

    backToScheda: function() {
      this.closeQuizModal();
    }
  };

  const launchBtns = document.querySelectorAll('.btn-launch-quiz');
  launchBtns.forEach(btn => {
    btn.addEventListener('click', () => window.quizApp.openQuizModal());
  });

  const closeBtn = document.getElementById('close-quiz-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => window.quizApp.closeQuizModal());
  }
}

// 10. Controllo modalità Smartphone
function checkUrlMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const room = urlParams.get('room');

  if (mode === 'player' || (window.innerWidth < 600 && urlParams.has('room'))) {
    document.body.classList.add('student-mobile-mode');
    renderStudentMobileView(room);
  }
}

function renderStudentMobileView(initialRoomCode) {
  const root = document.getElementById('app-root');
  if (!root) return;

  const playerId = 'player_' + Math.floor(1000 + Math.random() * 9000);
  let activeRoom = initialRoomCode || 'ZOLA-1885';
  let sync = new SyncHub(activeRoom);

  // Inizializza WebRTC client
  sync.initWebRTC(false, (ready) => {
    console.log('[Student Client] WebRTC connesso:', ready);
  });

  root.innerHTML = `
    <div class="student-client-container">
      <div class="student-header">
        <h1>SESSIONE QUIZ LIVE</h1>
        <span class="room-pill" id="student-room-badge">Stanza: ${activeRoom}</span>
      </div>

      <div id="student-join-screen" class="student-screen active">
        <div class="join-card">
          <h2>Partecipa al Quiz</h2>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 8px;">Scegli il tuo personaggio avatar e inserisci il tuo nome:</p>
          
          <div class="avatar-picker">
            ${(window.QUIZ_AVATARS || []).map((av, i) => `
              <button class="btn-avatar-card ${i === 0 ? 'selected' : ''}" onclick="window.pickAvatar(this, '${av.id}')">
                <div class="avatar-badge-circle" style="background: ${av.color}; color: #ffffff;">${av.badge}</div>
                <div class="avatar-card-info">
                  <span class="avatar-card-name">${av.name}</span>
                  <small class="avatar-card-desc">${av.desc}</small>
                </div>
              </button>
            `).join('')}
          </div>

          ${!initialRoomCode ? `
            <input type="text" id="student-room-input" class="join-input" placeholder="PIN Stanza (es. ZOLA-1885)" value="${activeRoom}" style="margin-bottom: 10px; font-weight: 700;">
          ` : ''}

          <input type="text" id="student-nickname" class="join-input" placeholder="Inserisci Nome..." maxlength="15" value="Studente_${playerId.slice(7)}">
          
          <button class="btn-primary-action btn-join-game" onclick="window.studentJoinGame('${playerId}')">
            Entra nella Sessione
          </button>
        </div>
      </div>

      <div id="student-waiting-screen" class="student-screen">
        <div class="waiting-card">
          <div id="student-active-avatar-holder" style="margin-bottom: 14px;"></div>
          <h2>Sei Connesso</h2>
          <p style="margin: 10px 0;">Osserva lo schermo del proiettore in classe.<br>La sessione inizierà a breve.</p>
          <div style="display: inline-block; padding: 6px 14px; background: rgba(16,185,129,0.15); color: #10b981; border-radius: 9999px; font-weight: 700; font-size: 0.85rem;">
            In attesa dell'avvio...
          </div>
        </div>
      </div>

      <div id="student-buttons-screen" class="student-screen">
        <div class="student-game-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span id="student-q-num" style="font-weight: 700; color: var(--accent-gold);">Domanda 1</span>
          <span id="student-score-tag" style="font-weight: 700; background: #334155; padding: 4px 10px; border-radius: 9999px;">0 pt</span>
        </div>
        <div class="student-kahoot-grid">
          <button class="s-btn red" onclick="window.studentSendAnswer('${playerId}', 0)">[A]</button>
          <button class="s-btn blue" onclick="window.studentSendAnswer('${playerId}', 1)">[B]</button>
          <button class="s-btn yellow" onclick="window.studentSendAnswer('${playerId}', 2)">[C]</button>
          <button class="s-btn green" onclick="window.studentSendAnswer('${playerId}', 3)">[D]</button>
        </div>
      </div>

      <div id="student-feedback-screen" class="student-screen">
        <div id="feedback-content" class="feedback-card"></div>
      </div>

      <div id="student-gameover-screen" class="student-screen">
        <div id="gameover-content" class="feedback-card"></div>
      </div>

      <div id="student-kicked-screen" class="student-screen">
        <div class="feedback-card" style="border: 1px solid var(--accent-crimson);">
          <h2 style="color: var(--accent-crimson); margin-bottom: 10px;">Sei stato rimosso dalla sessione</h2>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">L'host ti ha espulso dalla stanza del quiz.</p>
          <button class="btn-secondary-action" onclick="window.location.reload()" style="background: var(--bg-main); color: #ffffff;">
            Rientra con un altro Nickname
          </button>
        </div>
      </div>
    </div>
  `;

  let currentAvatar = 'zola';
  let questionStartTime = 0;

  window.pickAvatar = function(btn, avId) {
    document.querySelectorAll('.btn-avatar-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    currentAvatar = avId;
    SFX.playTone(550, 'triangle', 0.06, 0.06);
  };

  window.studentJoinGame = function(pId) {
    const roomInput = document.getElementById('student-room-input');
    if (roomInput && roomInput.value.trim()) {
      activeRoom = roomInput.value.trim().toUpperCase();
      sync = new SyncHub(activeRoom);
      sync.initWebRTC(false);
      const b = document.getElementById('student-room-badge');
      if (b) b.textContent = `Stanza: ${activeRoom}`;
    }

    const nick = document.getElementById('student-nickname').value.trim() || 'Studente';
    sync.broadcast('PLAYER_JOIN', {
      id: pId,
      name: nick,
      avatar: currentAvatar
    });

    const avObj = (window.QUIZ_AVATARS || []).find(a => a.id === currentAvatar) || { badge: 'EZ', color: '#be123c', name: 'Zola' };
    const avHolder = document.getElementById('student-active-avatar-holder');
    if (avHolder) {
      avHolder.innerHTML = `
        <div class="avatar-badge-circle" style="background: ${avObj.color}; color: #ffffff; width: 56px; height: 56px; font-size: 1.3rem; margin: 0 auto; box-shadow: 0 0 15px ${avObj.color}88;">${avObj.badge}</div>
        <div style="margin-top: 8px; font-weight: 700; color: #f8fafc;">${avObj.name}</div>
        <small style="color: #94a3b8;">${avObj.desc}</small>
      `;
    }

    document.getElementById('student-join-screen').classList.remove('active');
    document.getElementById('student-waiting-screen').classList.add('active');
    SFX.playTone(600, 'sine', 0.1, 0.1);
  };

  window.studentSendAnswer = function(pId, ansIdx) {
    if (navigator.vibrate) {
      try { navigator.vibrate(50); } catch (e) {}
    }

    const timeTaken = ((Date.now() - questionStartTime) / 1000).toFixed(2);
    sync.broadcast('PLAYER_ANSWER', {
      playerId: pId,
      answerIdx: ansIdx,
      timeTaken: parseFloat(timeTaken)
    });

    document.getElementById('student-buttons-screen').classList.remove('active');
    const fb = document.getElementById('student-feedback-screen');
    fb.classList.add('active');
    document.getElementById('feedback-content').innerHTML = `
      <h3>Risposta Inviata</h3>
      <p style="margin: 10px 0; font-size: 1.1rem;">Tempo impiegato: <strong>${timeTaken}s</strong></p>
      <small style="color: var(--text-muted);">Attendi la conclusione del turno sullo schermo principale...</small>
    `;
    SFX.playTone(750, 'triangle', 0.1, 0.08);
  };

  sync.on('PLAYER_KICKED', (payload) => {
    if (payload && payload.playerId === playerId) {
      document.querySelectorAll('.student-screen').forEach(s => s.classList.remove('active'));
      const kickedScreen = document.getElementById('student-kicked-screen');
      if (kickedScreen) kickedScreen.classList.add('active');
      SFX.wrong();
    }
  });

  sync.on('QUESTION_NEXT', (payload) => {
    questionStartTime = Date.now();
    document.querySelectorAll('.student-screen').forEach(s => s.classList.remove('active'));
    const btnScreen = document.getElementById('student-buttons-screen');
    if (btnScreen) {
      btnScreen.classList.add('active');
      document.getElementById('student-q-num').textContent = `Domanda ${payload.idx} di ${payload.total}`;
    }
  });

  sync.on('QUESTION_END', (payload) => {
    const p = payload.players.find(x => x.id === playerId);
    document.querySelectorAll('.student-screen').forEach(s => s.classList.remove('active'));
    const fb = document.getElementById('student-feedback-screen');
    fb.classList.add('active');

    const scoreTag = document.getElementById('student-score-tag');
    if (scoreTag && p) scoreTag.textContent = `${p.score} pt`;

    if (p && p.isCorrect) {
      document.getElementById('feedback-content').innerHTML = `
        <h2 class="correct-text">Risposta Corretta</h2>
        <div class="pts-earned">+${p.lastPoints} pt</div>
        <p>Punteggio Totale: <strong>${p.score} pt</strong></p>
        ${p.streak > 1 ? `<div style="color: var(--accent-gold); font-weight: 700; margin-top: 6px;">Serie Consecutiva: ${p.streak}</div>` : ''}
      `;
      SFX.correct();
    } else {
      document.getElementById('feedback-content').innerHTML = `
        <h2 class="wrong-text">Risposta Errata o Tempo Scaduto</h2>
        <p style="margin-top: 8px;">Punteggio Attuale: <strong>${p ? p.score : 0} pt</strong></p>
      `;
      SFX.wrong();
    }
  });

  sync.on('GAME_OVER', (payload) => {
    document.querySelectorAll('.student-screen').forEach(s => s.classList.remove('active'));
    const goScreen = document.getElementById('student-gameover-screen');
    goScreen.classList.add('active');

    const all = payload.allPlayers || [];
    const myRankIdx = all.findIndex(x => x.id === playerId);
    const myPlayer = all[myRankIdx];

    document.getElementById('gameover-content').innerHTML = `
      <h2 style="font-size: 1.6rem; color: var(--accent-gold); margin-bottom: 12px;">Sessione Conclusa</h2>
      ${myPlayer ? `
        <div style="font-size: 1.25rem; margin-bottom: 8px;">Posizione in Classifica: <strong>#${myRankIdx + 1}</strong> su ${all.length}</div>
        <div class="pts-earned">${myPlayer.score} pt</div>
      ` : `
        <p>Grazie per aver partecipato!</p>
      `}
      <small style="color: var(--text-muted); display: block; margin-top: 14px;">Guarda il podio proiettato sullo schermo principale.</small>
    `;
    SFX.fanfare();
  });
}
