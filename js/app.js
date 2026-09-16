/**
 * Main Application Logic for Émile Zola Interactive Technical Sheet (Enhanced UI / UX & Local Offline Sync)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndSettings();
  initScrollSpy();
  initMobileNavbar();
  initKeyboardNavigation();
  renderBiography();
  renderPoetics();
  renderCyclesAndNovels();
  renderContext();
  renderGerminal();
  renderExile();
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
      if (label) label.textContent = 'Tema';
      const btn = document.getElementById('theme-toggle-btn');
      if (btn) btn.title = `Tema: ${nextTheme.toUpperCase()} [T]`;
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
      themeToggleBtn.querySelector('.theme-label').textContent = 'Tema';
      themeToggleBtn.title = `Tema: ${nextTheme.toUpperCase()} [T]`;
      SFX.playTone(440, 'sine', 0.05, 0.05);
    });
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      SFX.enabled = !SFX.enabled;
      soundToggleBtn.classList.toggle('muted', !SFX.enabled);
      soundToggleBtn.querySelector('.sound-icon').textContent = 'Audio';
      soundToggleBtn.title = SFX.enabled ? 'Audio Attivo' : 'Audio Disattivato';
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

// 4. Sezione Dati Biografici Essenziali
function renderBiography() {
  const bioGrid = document.getElementById('bio-identity-grid');
  if (!bioGrid) return;

  const bio = ZOLA_DATA.biografia;
  bioGrid.innerHTML = `
    <div class="bio-card passport-card animate-fade-in">
      <div class="passport-header">
        <span class="passport-stamp">RÉPUBLIQUE FRANÇAISE</span>
        <span class="passport-title">DATI BIOGRAFICI ESSENZIALI</span>
      </div>
      <div class="passport-body">
        <div class="passport-field">
          <label>Nome Completo</label>
          <div class="val">${bio.nomeCompleto}</div>
        </div>
        <div class="passport-field">
          <label>Nascita</label>
          <div class="val">${bio.nascita}</div>
        </div>
        <div class="passport-field">
          <label>Morte</label>
          <div class="val highlight-val">${bio.morte}</div>
        </div>
        <div class="passport-field">
          <label>Nazionalità</label>
          <div class="val">${bio.nazionalita}</div>
        </div>
        <div class="passport-field">
          <label>Periodo di Appartenenza</label>
          <div class="val">${bio.periodo}</div>
        </div>
        <div class="passport-field">
          <label>Corrente Letteraria</label>
          <div class="val gold-text">${bio.corrente}</div>
        </div>
      </div>
    </div>
  `;
}

// 5. Sezione Pensiero e Poetica
function renderPoetics() {
  const container = document.getElementById('poetics-grid');
  if (!container) return;

  container.innerHTML = `
    <div class="poetics-columns-container">
      ${ZOLA_DATA.pilastriPoetica.map((p, idx) => `
        <div class="poetic-block-card animate-slide-up" style="animation-delay: ${idx * 0.08}s">
          <div class="poetic-card-header">
            <span class="poetic-source-badge">${p.fonte}</span>
            <h3 class="poetic-block-title">${p.titolo}</h3>
          </div>
          <p class="poetic-block-desc">${p.descrizione}</p>
          
          ${p.fasi ? `
            <div class="poetic-steps-box">
              <div class="steps-heading">I Tre Momenti del Romanziere-Scienziato:</div>
              <div class="steps-grid">
                ${p.fasi.map(f => `
                  <div class="step-item">
                    <span class="step-num">${f.passo}</span>
                    <div class="step-content">
                      <strong>${f.nome}</strong>
                      <p>${f.testo}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${p.fattori ? `
            <div class="poetic-factors-box">
              <div class="factors-grid">
                ${p.fattori.map(f => `
                  <div class="factor-pill">
                    <strong>${f.nome}</strong>
                    <p>${f.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${p.esempi ? `
            <div class="poetic-investigation-box">
              <div class="investigation-heading">Inchieste sul campo (Dossiers Préparatoires):</div>
              <div class="investigation-tags">
                ${p.esempi.map(e => `
                  <span class="inv-tag"><strong>${e.ambiente}</strong> → <em>${e.opera}</em></span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// 6. Sezione Opere Composte & Cicli Principali
function renderCyclesAndNovels() {
  const cyclesContainer = document.getElementById('cycles-summary-grid');
  const novelsContainer = document.getElementById('novels-grid');
  const filtersContainer = document.getElementById('novels-filters');
  const notableContainer = document.getElementById('notable-titles-grid');

  if (cyclesContainer) {
    cyclesContainer.innerHTML = `
      <div class="cycles-table-card animate-fade-in">
        <table class="tech-sheet-table">
          <thead>
            <tr>
              <th>Ciclo</th>
              <th>Anni</th>
              <th>N. Opere</th>
              <th>Contenuto</th>
            </tr>
          </thead>
          <tbody>
            ${ZOLA_DATA.cicliLetterari.map(c => `
              <tr>
                <td><strong>${c.titolo}</strong></td>
                <td><span class="table-badge-year">${c.anni}</span></td>
                <td><span class="table-badge-vol">${c.volumi}</span></td>
                <td>
                  ${c.contenuto}
                  ${c.elenco ? `<br><small class="text-muted">(${c.elenco})</small>` : ''}
                  ${c.rami ? `
                    <div class="rami-split-inline">
                      <span class="ramo-r"><strong>Rougon:</strong> ${c.rami.rougon}</span>
                      <span class="ramo-m"><strong>Macquart:</strong> ${c.rami.macquart}</span>
                    </div>
                  ` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Esploratore dei 20 Romanzi Rougon-Macquart
  if (novelsContainer) {
    const novels = ZOLA_DATA.romanziRougonMacquart;
    const categories = [
      { label: "Tutti i 20 Romanzi", key: "all" },
      { label: "Miniere & Proletariato", key: "proletariato" },
      { label: "Commercio & Finanza", key: "commercio" },
      { label: "Arte & Spettacolo", key: "arte" },
      { label: "Politica & Chiesa", key: "politica" },
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

      novelsContainer.innerHTML = filtered.map(n => `
        <div class="novel-card ${n.n === 13 ? 'featured-novel' : ''} animate-pop" onclick="window.openNovelModal(${n.n - 1})">
          <div class="novel-card-top">
            <span class="novel-number">N. ${n.n}</span>
            <span class="novel-year">${n.anno}</span>
          </div>
          <h3 class="novel-title">${n.titolo}</h3>
          <div class="novel-env"><strong>Ambiente esplorato:</strong> ${n.ambiente}</div>
          ${n.n === 13 ? '<div class="crown-badge">Capolavoro Assoluto</div>' : ''}
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
          <span class="novel-number" style="font-size: 1.1rem; font-weight: 700; color: var(--accent-gold);">Romanzo N. ${n.n} dei Rougon-Macquart (${n.anno})</span>
          <h2 style="font-family: var(--font-serif); font-size: 1.9rem; margin-top: 4px;">${n.titolo}</h2>
        </div>
        <div class="novel-modal-body">
          <p style="font-size: 1.05rem; margin-bottom: 14px;"><strong>Ambiente Esplorato:</strong> ${n.ambiente}</p>
          <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 18px;"><strong>Tema & Sintesi del Ciclo:</strong> ${n.tema}</p>
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

  // Titoli Più Noti
  if (notableContainer) {
    notableContainer.innerHTML = ZOLA_DATA.titoliPiuNoti.map(t => `
      <div class="notable-title-card animate-slide-up">
        <div class="notable-top">
          <span class="notable-name">${t.titolo}</span>
          <span class="notable-year">(${t.anno})</span>
        </div>
        <p class="notable-desc">${t.desc}</p>
      </div>
    `).join('');
  }
}

// 7. Sezione Contesto delle Opere
function renderContext() {
  const container = document.getElementById('context-grid');
  if (!container) return;

  const ctx = ZOLA_DATA.contestoStorico;
  container.innerHTML = `
    <div class="context-box-card animate-fade-in">
      <div class="context-main-text">
        <p style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">
          Zola scrive nella <strong>Francia dell'industrializzazione avanzata</strong>, segnata da:
        </p>
        <ul class="context-bullets-list">
          ${ctx.punti.map(p => `<li>${p}</li>`).join('')}
        </ul>
        <div class="context-quote-banner" style="margin-top: 24px; padding: 18px; background: var(--bg-main); border-left: 4px solid var(--accent-gold); border-radius: var(--radius-sm);">
          <strong style="color: var(--accent-navy); font-size: 1.05rem;">"Histoire naturelle et sociale d'une famille sous le Second Empire"</strong>
          <p style="margin-top: 6px; color: var(--text-secondary); font-size: 0.95rem;">
            Ogni romanzo segue un ramo della famiglia (i <strong>Rougon</strong>, ambiziosi e arrivisti; i <strong>Macquart</strong>, segnati da alcolismo ed ereditarietà degenerativa) per esplorare un ambiente sociale diverso (miniere, mercati, ferrovie, arte, politica, Chiesa).
          </p>
        </div>
      </div>
    </div>
  `;
}

// 8. Sezione Analisi Approfondita: Germinal (1885)
function renderGerminal() {
  const container = document.getElementById('germinal-deep-dive');
  if (!container) return;

  const g = ZOLA_DATA.focusGerminal;
  container.innerHTML = `
    <div class="germinal-masterpiece-wrapper animate-fade-in">
      
      <!-- Header Banner Germinal -->
      <div class="germinal-main-header">
        <div class="germinal-badge-pill">TREDICESIMO ROMANZO DEI ROUGON-MACQUART — IL CAPOLAVORO ASSOLUTO</div>
        <h3 class="germinal-title-display">${g.titolo}</h3>
        <p class="germinal-subtitle-text">${g.sottotitolo}</p>
      </div>

      <!-- Trama Essenziale Box -->
      <div class="germinal-card-panel synopsis-panel">
        <div class="panel-header-tag">
          <span class="panel-tag-icon">TRAMA</span>
          <h4>Trama Essenziale</h4>
        </div>
        <p class="germinal-synopsis-text">${g.tramaEssenziale}</p>
      </div>

      <!-- Perché è l'opera più rappresentativa (6 Pilastri) -->
      <div class="germinal-section-heading">
        <span class="heading-accent-line"></span>
        <h4>Perché è l'opera più rappresentativa</h4>
        <span class="heading-accent-line"></span>
      </div>

      <div class="germinal-reasons-grid">
        ${g.puntiRappresentativi.map((p, i) => `
          <div class="germinal-reason-card animate-slide-up" style="animation-delay: ${i * 0.06}s">
            <div class="reason-card-top">
              <span class="reason-number">0${i + 1}</span>
              <h5 class="reason-card-title">${p.titolo}</h5>
            </div>
            <p class="reason-card-desc">${p.desc}</p>
          </div>
        `).join('')}
      </div>

      <!-- Il Titolo come Chiave Simbolica -->
      <div class="germinal-card-panel symbolic-panel">
        <div class="panel-header-tag">
          <span class="panel-tag-icon">SIMBOLOGIA</span>
          <h4>Il Titolo come Chiave Simbolica</h4>
        </div>
        <p class="germinal-symbolic-text">${g.chiaveSimbolicaTitolo}</p>
      </div>

    </div>
  `;
}

// 9. Sezione L'Esilio in Inghilterra (1898–1899)
function renderExile() {
  const container = document.getElementById('exile-grid');
  if (!container) return;

  const ex = ZOLA_DATA.esilioInghilterra;
  container.innerHTML = `
    <div class="passport-card animate-fade-in" style="border-color: var(--accent-crimson);">
      <div class="passport-header">
        <span class="passport-stamp" style="color: var(--accent-crimson); border-color: var(--accent-crimson);">LONDRA — SURREY (${ex.anni})</span>
        <span class="passport-title">L'ESILIO IN INGHILTERRA DOPO J'ACCUSE...!</span>
      </div>
      <div class="exile-body">
        <ul class="exile-timeline-list">
          ${ex.punti.map(pt => `
            <li class="exile-timeline-item">
              <span class="exile-dot"></span>
              <p>${pt}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

// 10. Curiosità
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
        if (hintEl) hintEl.textContent = "Inquadra con la fotocamera di QUALSIASI smartphone";
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
          <h2>Crea il tuo Personaggio</h2>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 12px;">Scegli il tuo cucciolo, personalizza l'accessorio e il colore:</p>
          
          <!-- Live Preview Avatar -->
          <div class="avatar-preview-box">
            <div id="live-avatar-preview"></div>
            <div id="live-avatar-label" class="avatar-preview-tag">Gattino Naturale</div>
          </div>

          <!-- Step 1: Scegli Animale -->
          <div class="avatar-section-title">1. Scegli il Personaggio / Animale</div>
          <div class="avatar-picker animals-grid">
            ${(window.AVATAR_CHARACTERS || []).map((char, i) => `
              <button type="button" class="btn-avatar-card ${i === 0 ? 'selected' : ''}" onclick="window.selectAvatarChar('${char.id}')" data-char="${char.id}">
                <div class="avatar-thumb">${window.renderAvatarSVG(char.id, 'none', char.bg, 44)}</div>
                <span class="avatar-card-name">${char.name}</span>
              </button>
            `).join('')}
          </div>

          <!-- Step 2: Scegli Accessorio -->
          <div class="avatar-section-title">2. Scegli l'Accessorio</div>
          <div class="avatar-picker accessories-grid">
            ${(window.AVATAR_ACCESSORIES || []).map((acc, i) => `
              <button type="button" class="btn-acc-card ${i === 0 ? 'selected' : ''}" onclick="window.selectAvatarAcc('${acc.id}')" data-acc="${acc.id}">
                <span class="acc-badge">${acc.name}</span>
              </button>
            `).join('')}
          </div>

          <!-- Step 3: Scegli Colore Sfondo -->
          <div class="avatar-section-title">3. Colore Sfondo</div>
          <div class="avatar-color-palette">
            ${(window.AVATAR_COLORS || []).map((col, i) => `
              <button type="button" class="btn-color-circle ${i === 0 ? 'selected' : ''}" style="background: ${col.color};" onclick="window.selectAvatarBg('${col.color}')" data-color="${col.color}" title="${col.name}"></button>
            `).join('')}
          </div>

          ${!initialRoomCode ? `
            <input type="text" id="student-room-input" class="join-input" placeholder="PIN Stanza (es. ZOLA-1885)" value="${activeRoom}" style="margin-top: 14px; margin-bottom: 10px; font-weight: 700;">
          ` : ''}

          <input type="text" id="student-nickname" class="join-input" placeholder="Il tuo Nome..." maxlength="15" value="Studente_${playerId.slice(7)}" style="margin-top: 12px;">
          
          <button class="btn-primary-action btn-join-game" onclick="window.studentJoinGame('${playerId}')">
            Entra nella Sessione
          </button>
        </div>
      </div>

      <div id="student-waiting-screen" class="student-screen">
        <div class="waiting-card">
          <div id="student-active-avatar-holder" style="margin-bottom: 14px;"></div>
          <h2>Sei Connesso</h2>
          <p style="margin: 10px 0;">Ora osserva lo schermo della LIM.<br>La sessione inizierà a breve.</p>
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
        <div class="feedback-card" style="border: 2px solid var(--accent-crimson); background: #1e293b; color: #ffffff;">
          <h2 style="color: #f43f5e; margin-bottom: 12px; font-size: 1.4rem;">Sei stato rimosso dalla sessione</h2>
          <p style="color: #cbd5e1; margin-bottom: 24px; font-size: 1rem;">L'host ti ha espulso dalla stanza del quiz.</p>
          <button class="btn-primary-action" onclick="window.location.reload()" style="background: linear-gradient(135deg, #be123c, #9f1239); color: #ffffff; width: 100%; max-width: 320px; font-weight: 700; font-size: 1.05rem; padding: 14px 20px; box-shadow: 0 4px 14px rgba(190, 18, 60, 0.4);">
            Rientra con un altro Nickname
          </button>
        </div>
      </div>
    </div>
  `;

  let selectedChar = 'cat';
  let selectedAcc = 'none';
  let selectedBg = (window.AVATAR_COLORS && window.AVATAR_COLORS[0]) ? window.AVATAR_COLORS[0].color : '#f43f5e';
  let questionStartTime = 0;

  function updatePreview() {
    const prevEl = document.getElementById('live-avatar-preview');
    const labelEl = document.getElementById('live-avatar-label');
    if (prevEl) {
      prevEl.innerHTML = window.renderAvatarSVG(selectedChar, selectedAcc, selectedBg, 84);
    }
    if (labelEl) {
      const charObj = (window.AVATAR_CHARACTERS || []).find(c => c.id === selectedChar);
      const accObj = (window.AVATAR_ACCESSORIES || []).find(a => a.id === selectedAcc);
      const charName = charObj ? charObj.name : 'Gattino';
      const accName = (accObj && accObj.id !== 'none') ? ` con ${accObj.name}` : '';
      labelEl.textContent = `${charName}${accName}`;
    }
  }

  updatePreview();

  window.selectAvatarChar = function(charId) {
    selectedChar = charId;
    document.querySelectorAll('.btn-avatar-card').forEach(b => {
      b.classList.toggle('selected', b.getAttribute('data-char') === charId);
    });
    updatePreview();
    SFX.playTone(520, 'triangle', 0.05, 0.05);
  };

  window.selectAvatarAcc = function(accId) {
    selectedAcc = accId;
    document.querySelectorAll('.btn-acc-card').forEach(b => {
      b.classList.toggle('selected', b.getAttribute('data-acc') === accId);
    });
    updatePreview();
    SFX.playTone(620, 'triangle', 0.05, 0.05);
  };

  window.selectAvatarBg = function(color) {
    selectedBg = color;
    document.querySelectorAll('.btn-color-circle').forEach(b => {
      b.classList.toggle('selected', b.getAttribute('data-color') === color);
    });
    updatePreview();
    SFX.playTone(720, 'triangle', 0.05, 0.05);
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
    
    // Avatar composito serializzato (personaggio + accessorio + sfondo)
    const avatarData = {
      char: selectedChar,
      acc: selectedAcc,
      bg: selectedBg
    };

    sync.broadcast('PLAYER_JOIN', {
      id: pId,
      name: nick,
      avatar: avatarData
    });

    const avHolder = document.getElementById('student-active-avatar-holder');
    if (avHolder) {
      avHolder.innerHTML = `
        <div class="avatar-active-circle" style="display: flex; justify-content: center; margin-bottom: 8px;">
          ${window.renderAvatarSVG(selectedChar, selectedAcc, selectedBg, 74)}
        </div>
        <div style="margin-top: 4px; font-weight: 700; color: #f8fafc; font-size: 1.1rem;">${nick}</div>
        <small style="color: #94a3b8;">${document.getElementById('live-avatar-label').textContent}</small>
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

  sync.on('GAME_RESET', () => {
    document.querySelectorAll('.student-screen').forEach(s => s.classList.remove('active'));
    const waitScreen = document.getElementById('student-waiting-screen');
    if (waitScreen) waitScreen.classList.add('active');
    const scoreTag = document.getElementById('student-score-tag');
    if (scoreTag) scoreTag.textContent = '0 pt';
    SFX.playTone(440, 'triangle', 0.1, 0.08);
  });
}

