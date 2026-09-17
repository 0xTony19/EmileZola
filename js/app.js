/**
 * Main Application Logic for Émile Zola Interactive Technical Sheet (Enhanced UI / UX & Local Offline Sync)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndSettings();
  initHandwritingAnimation();
  initMultiPageRouter();
  initMobileNavbar();
  initKeyboardNavigation();
  renderBiography();
  renderPoetics();
  renderCyclesAndNovels();
  renderGerminal();
  renderCuriosities();
  initQuizController();
  checkUrlMode();
});

// 1. Animazione di Scrittura a Mano Calligrafica (Handwriting Script)
function initHandwritingAnimation() {
  const container = document.getElementById('handwriting-title');
  if (!container) return;

  const textElem = container.querySelector('.handwriting-text');
  const penElem = container.querySelector('.handwriting-pen');
  if (!textElem) return;

  const fullText = "Émile Zola";
  let currentIndex = 0;
  textElem.textContent = "";

  // Breve ritardo iniziale elegante prima di iniziare a scrivere
  setTimeout(() => {
    function typeNextChar() {
      if (currentIndex < fullText.length) {
        textElem.textContent += fullText.charAt(currentIndex);
        currentIndex++;
        
        // Ritmo naturale e organico di penna a mano (varia tra 110ms e 160ms)
        const charDelay = 115 + Math.random() * 45;
        setTimeout(typeNextChar, charDelay);
      } else {
        // Scrittura completata: nascondi il pennino dopo un attimo
        setTimeout(() => {
          if (penElem) penElem.classList.add('done');
        }, 1200);
      }
    }

    typeNextChar();
  }, 350);
}

// 2. Sistema di Navigazione Multi-Pagina (Pagine Separate)
const APP_PAGES = ['home', 'biografia', 'poetica', 'opere', 'germinal', 'curiosita'];

window.navigateToPage = function(pageId, updateHash = true) {
  if (!APP_PAGES.includes(pageId)) pageId = 'home';

  // Aggiorna viste sezioni (mostra solo la pagina attiva)
  document.querySelectorAll('.page-view').forEach(view => {
    if (view.getAttribute('data-page') === pageId) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Aggiorna navbar links
  document.querySelectorAll('.nav-item-link').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Aggiorna controlli di paginazione inferiore
  const pageIndex = APP_PAGES.indexOf(pageId);
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const indicator = document.getElementById('current-page-indicator');

  if (prevBtn) prevBtn.disabled = (pageIndex === 0);
  if (nextBtn) nextBtn.disabled = (pageIndex === APP_PAGES.length - 1);
  if (indicator) {
    const pageTitles = {
      home: 'Home / Panoramica',
      biografia: '1. Dati Biografici',
      poetica: '2. Pensiero e Poetica',
      opere: '3. Opere & Rougon-Macquart',
      germinal: '4. Capolavoro Germinal',
      curiosita: '5. Curiosità Storiche'
    };
    indicator.textContent = `Pagina ${pageIndex + 1} di ${APP_PAGES.length} — ${pageTitles[pageId] || pageId}`;
  }

  // Aggiorna hash nell'URL se richiesto
  if (updateHash && window.location.hash !== `#${pageId}`) {
    history.pushState(null, '', `#${pageId}`);
  }

  // Scroll in cima con delicatezza
  window.scrollTo({ top: 0, behavior: 'smooth' });
  SFX.playTone(480, 'sine', 0.04, 0.03);
};

window.navigateRelativePage = function(direction) {
  const currentHash = (window.location.hash || '#home').replace('#', '');
  let currentIndex = APP_PAGES.indexOf(currentHash);
  if (currentIndex === -1) currentIndex = 0;

  const targetIndex = currentIndex + direction;
  if (targetIndex >= 0 && targetIndex < APP_PAGES.length) {
    window.navigateToPage(APP_PAGES[targetIndex]);
  }
};

function initMultiPageRouter() {
  // Gestione click su tutti i link di navigazione
  document.querySelectorAll('.nav-item-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      window.navigateToPage(pageId);

      // Chiudi menu mobile se aperto
      const navWrapper = document.getElementById('nav-links-wrapper');
      if (navWrapper) navWrapper.classList.remove('open');
    });
  });

  // Click su logo / brand porta a Home
  const brandBadge = document.querySelector('.brand-badge');
  if (brandBadge) {
    brandBadge.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigateToPage('home');
    });
  }

  // Supporto per tasto Indietro/Avanti del browser (popstate / hashchange)
  window.addEventListener('hashchange', () => {
    const pageId = (window.location.hash || '#home').replace('#', '');
    window.navigateToPage(pageId, false);
  });

  // Carica pagina iniziale in base all'hash o default home
  const initialPage = (window.location.hash || '#home').replace('#', '');
  window.navigateToPage(initialPage, false);
}

// 3. Gestione Menu Mobile Responsive
function initMobileNavbar() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navWrapper = document.getElementById('nav-links-wrapper');
  if (!toggleBtn || !navWrapper) return;

  toggleBtn.addEventListener('click', () => {
    navWrapper.classList.toggle('open');
  });
}

// 4. Comandi da Tastiera per Presentazione, Pagine e Quiz
// 3. Gestione Modalità LIM, Dimensione Carattere e Temi
window.currentFontScale = 1.0;
window.activeSubtabs = {
  biografia: 0,
  poetica: 0,
  opere: 0,
  germinal: 0,
  curiosita: 0
};

window.adjustFontSize = function(delta) {
  let newScale = Math.round((window.currentFontScale + delta) * 100) / 100;
  if (newScale < 0.85) newScale = 0.85;
  if (newScale > 1.50) newScale = 1.50;
  window.currentFontScale = newScale;
  document.documentElement.style.setProperty('--font-scale-factor', newScale);
  
  const indicator = document.getElementById('font-size-indicator');
  if (indicator) {
    indicator.textContent = `${Math.round(newScale * 100)}%`;
  }
  SFX.playTone(500 + delta * 200, 'sine', 0.03, 0.03);
};

window.switchSubtab = function(sectionId, subtabIndex) {
  window.activeSubtabs[sectionId] = subtabIndex;
  
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Aggiorna pulsanti del sottomenu
  const buttons = section.querySelectorAll('.subnav-pill-btn');
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === subtabIndex);
  });

  // Aggiorna pannelli del sottomenu
  const panes = section.querySelectorAll('.subtab-pane');
  panes.forEach((pane, idx) => {
    pane.classList.toggle('active', idx === subtabIndex);
  });

  SFX.playTone(540, 'sine', 0.04, 0.03);
};

window.switchSubtabRelative = function(sectionId, delta) {
  const current = window.activeSubtabs[sectionId] || 0;
  const section = document.getElementById(sectionId);
  if (!section) return;
  const panes = section.querySelectorAll('.subtab-pane');
  const max = panes.length;
  if (max === 0) return;
  
  let target = current + delta;
  if (target < 0) target = 0;
  if (target >= max) target = max - 1;
  window.switchSubtab(sectionId, target);
};

// 4. Comandi da Tastiera per Presentazione, Pagine, Sottomenu e Quiz
function initKeyboardNavigation() {
  window.addEventListener('keydown', (e) => {
    // Ignora se si sta digitando in un input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Tasto 'Escape' -> Chiudi Lightbox o Modali
    if (e.key === 'Escape') {
      const lbModal = document.getElementById('image-lightbox-modal');
      if (lbModal && lbModal.classList.contains('active')) {
        window.closeImageLightbox();
        return;
      }
      const novModal = document.getElementById('novel-modal');
      if (novModal && novModal.classList.contains('active')) {
        window.closeNovelModal();
        return;
      }
      const curModal = document.getElementById('curiosity-modal');
      if (curModal && curModal.classList.contains('active')) {
        window.closeCuriosityModal();
        return;
      }
    }

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

    // Tasti '+' e '-' -> Regola Dimensione Font
    if (e.key === '+' || e.key === '=') {
      window.adjustFontSize(0.08);
      return;
    }
    if (e.key === '-' || e.key === '_') {
      window.adjustFontSize(-0.08);
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

    // Tasti Numerici 1..9: Se siamo nel Quiz rispondono, altrimenti cambiano sottomenu attivo!
    if (window.quizApp && window.quizApp.engine && window.quizApp.engine.gameState === 'QUESTION') {
      const keyMap = { '1': 0, 'a': 0, '2': 1, 'b': 1, '3': 2, 'c': 2, '4': 3, 'd': 3 };
      const pressed = e.key.toLowerCase();
      if (keyMap.hasOwnProperty(pressed)) {
        window.quizApp.onHostOptionClick(keyMap[pressed]);
        return;
      }
    } else {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const currentHash = (window.location.hash || '#home').replace('#', '');
        if (currentHash !== 'home' && window.activeSubtabs.hasOwnProperty(currentHash)) {
          window.switchSubtab(currentHash, num - 1);
          return;
        }
      }
    }

    // Navigazione tra le pagine con freccia destra/giù (pagina successiva) e sinistra/su (pagina precedente)
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      window.navigateRelativePage(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      window.navigateRelativePage(-1);
    }
  });
}

// 5. Gestione Temi e Audio
function initThemeAndSettings() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const presentationBtn = document.getElementById('presentation-btn');
  const fontDecBtn = document.getElementById('font-dec-btn');
  const fontIncBtn = document.getElementById('font-inc-btn');

  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => window.adjustFontSize(-0.08));
  }

  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => window.adjustFontSize(0.08));
  }

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

// =========================================================================
// RENDERERS ORGANIZZATI A SOTTOMENU / SCHEDE AD ALTA VISIBILITA
// =================================================================// 1. Sezione Dati Biografici Essenziali
function renderBiography() {
  const container = document.getElementById('bio-identity-grid');
  if (!container) return;

  const bio = ZOLA_DATA.biografia;
  const subtabs = [
    { label: "Passaporto Anagrafico", key: "passport" },
    { label: "1. Origini & Cézanne", key: "origini" },
    { label: "2. Inizi & Giornalismo", key: "inizi" },
    { label: "3. J'accuse & Dreyfus", key: "dreyfus" },
    { label: "4. Morte & Panthéon", key: "pantheon" }
  ];

  container.innerHTML = `
    <!-- Sottomenu a schede ad alta visibilità -->
    <div class="section-subnav-bar">
      ${subtabs.map((tab, idx) => `
        <button class="subnav-pill-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchSubtab('biografia', ${idx})">
          <span class="subnav-num">${idx + 1}</span>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </div>

    <!-- Contenitori delle singole sotto-schede -->
    <div class="subtabs-content-wrapper">
      
      <!-- Subtab 0: Passaporto Anagrafico -->
      <div class="subtab-pane active animate-fade-in">
        <div class="bio-card passport-card">
          <div class="passport-header">
            <span class="passport-stamp">RÉPUBLIQUE FRANÇAISE</span>
            <span class="passport-title">DATI ANAGRAFICI & QUADRO ESSENZIALE</span>
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
              <label>Nazionalità & Origini</label>
              <div class="val">${bio.nazionalita}</div>
            </div>
            <div class="passport-field">
              <label>Periodo Storico</label>
              <div class="val">${bio.periodo}</div>
            </div>
            <div class="passport-field">
              <label>Corrente Letteraria</label>
              <div class="val gold-text">${bio.corrente}</div>
            </div>
            <div class="passport-field" style="grid-column: 1 / -1;">
              <label>Luogo di Sepoltura</label>
              <div class="val">${bio.sepoltura}</div>
            </div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" disabled>&larr; Precedente</button>
          <span class="subnav-step-info">Tappa 1 di 5</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('biografia', 1)">Tappa Successiva: Origini &rarr;</button>
        </div>
      </div>

      <!-- Subtabs 1..4: Schede di Esposizione Orale -->
      ${bio.schedeEsposizione.map((card, idx) => `
        <div class="subtab-pane animate-fade-in">
          <div class="presentation-big-card">
            <div class="pres-card-header">
              <span class="pres-card-tag">${card.tag}</span>
              <h3 class="pres-card-title">${card.titolo}</h3>
            </div>

            <div class="pres-card-body">
              <ul class="pres-points-list">
                ${card.punti.map(pt => `<li>${pt}</li>`).join('')}
              </ul>

              <div class="pres-focus-box">
                <div class="pres-focus-label">DA RICORDARE</div>
                <div class="pres-focus-text">${card.focusOrale}</div>
              </div>
            </div>
          </div>

          <div class="subnav-stepper-footer">
            <button class="subnav-step-btn" onclick="window.switchSubtabRelative('biografia', -1)">&larr; Scheda Precedente</button>
            <span class="subnav-step-info">Tappa ${idx + 2} di 5</span>
            <button class="subnav-step-btn ${idx === bio.schedeEsposizione.length - 1 ? '' : 'primary'}" 
              onclick="${idx === bio.schedeEsposizione.length - 1 ? 'window.navigateToPage(\'poetica\')' : 'window.switchSubtabRelative(\'biografia\', 1)'}">
              ${idx === bio.schedeEsposizione.length - 1 ? 'Passa a Poetica &rarr;' : 'Tappa Successiva &rarr;'}
            </button>
          </div>
        </div>
      `).join('')}

    </div>
  `;
}

// 2. Sezione Pensiero e Poetica
function renderPoetics() {
  const container = document.getElementById('poetics-grid');
  if (!container) return;

  const pilastri = ZOLA_DATA.pilastriPoetica;
  const subtabs = [
    { label: "1. Metodo Sperimentale", key: "metodo" },
    { label: "2. Determinismo & Tare", key: "determinismo" },
    { label: "3. Documento Umano", key: "documento" },
    { label: "4. Pessimismo & Utopia", key: "utopia" },
    { label: "5. Intellettuale Engagé", key: "impegno" }
  ];

  container.innerHTML = `
    <!-- Sottomenu a schede ad alta visibilità -->
    <div class="section-subnav-bar">
      ${subtabs.map((tab, idx) => `
        <button class="subnav-pill-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchSubtab('poetica', ${idx})">
          <span class="subnav-num">${idx + 1}</span>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </div>

    <div class="subtabs-content-wrapper">
      
      <!-- Subtab 0: Metodo Sperimentale -->
      <div class="subtab-pane active animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">FONTE TEORICA: Le roman expérimental (1880) & Claude Bernard (1865)</span>
            <h3 class="pres-card-title">${pilastri[0].titolo}</h3>
          </div>
          <p class="pres-lead-text">${pilastri[0].descrizione}</p>

          <div class="formula-banner">
            <span class="formula-tag">CONCETTO CARDINE:</span>
            <span class="formula-highlight">Il Romanziere = Medico Legale & Scienziato della Società</span>
          </div>

          <div class="poetic-steps-grid-expanded">
            ${pilastri[0].fasi.map(f => `
              <div class="poetic-step-card-large">
                <div class="step-badge-circle">${f.passo}</div>
                <div class="step-card-inner">
                  <h4>${f.nome}</h4>
                  <p>${f.testo}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" disabled>&larr; Precedente</button>
          <span class="subnav-step-info">Pilastro 1 di 5</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('poetica', 1)">Pilastro Successivo: Determinismo &rarr;</button>
        </div>
      </div>

      <!-- Subtab 1: Determinismo Biologico e Sociale -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">FONTE: Prosper Lucas & Studi sull'Ereditarietà</span>
            <h3 class="pres-card-title">${pilastri[1].titolo}</h3>
          </div>
          <p class="pres-lead-text">${pilastri[1].descrizione}</p>

          <div class="equation-container">
            <div class="equation-box">
              <span class="eq-term">Eredità Biologica <small>(Tare, Alcolismo, Impulsi)</small></span>
              <span class="eq-op">+</span>
              <span class="eq-term">Il Milieu <small>(Ambiente Sociale & Miniera)</small></span>
              <span class="eq-op">=</span>
              <span class="eq-result">Destino & Comportamento Inevitabile</span>
            </div>
          </div>

          <div class="two-columns-feature-grid">
            <div class="feature-card-col">
              <h4>L'Eredità Biologica (Genetica)</h4>
              <p>${pilastri[1].fattori[0].desc}</p>
            </div>
            <div class="feature-card-col">
              <h4>Il Milieu (Ambiente Sociale)</h4>
              <p>${pilastri[1].fattori[1].desc}</p>
            </div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('poetica', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Pilastro 2 di 5</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('poetica', 1)">Pilastro Successivo: Documento Umano &rarr;</button>
        </div>
      </div>

      <!-- Subtab 2: Il Documento Umano e Inchieste -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">METODOLOGIA: Dossiers Préparatoires</span>
            <h3 class="pres-card-title">${pilastri[2].titolo}</h3>
          </div>
          <p class="pres-lead-text">${pilastri[2].descrizione}</p>

          <div class="investigation-showcase-grid">
            ${pilastri[2].esempi.map(e => `
              <div class="inv-showcase-card">
                <div class="inv-env-details">
                  <span class="inv-env-name">${e.ambiente}</span>
                  <span class="inv-env-arrow">&darr;</span>
                  <span class="inv-novel-name">${e.opera}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('poetica', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Pilastro 3 di 5</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('poetica', 1)">Pilastro Successivo: Pessimismo vs Utopia &rarr;</button>
        </div>
      </div>

      <!-- Subtab 3: Pessimismo vs Utopia -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">EVOLUZIONE DEL PENSIERO: Dai Rougon-Macquart ai Quattro Vangeli</span>
            <h3 class="pres-card-title">${pilastri[3].titolo}</h3>
          </div>
          <p class="pres-lead-text">${pilastri[3].descrizione}</p>

          <div class="two-columns-feature-grid">
            <div class="feature-card-col contrast-dark">
              <h4>1ª Fase: Il Pessimismo Clinico</h4>
              <p>Nei <em>Rougon-Macquart</em> (1871-1893) domina la diagnosi spietata: degrado, violenza, alcolismo e sconfitta dell'individuo schiacciato dalle leggi deterministiche.</p>
            </div>
            <div class="feature-card-col contrast-gold">
              <h4>2ª Fase: Il Socialismo Umanitario</h4>
              <p>Nelle <em>Quatre Évangiles</em> (1899-1902) trionfa la speranza utopica: scienza, fecondità, giustizia e lavoro guidano l'umanità verso la redenzione.</p>
            </div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('poetica', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Pilastro 4 di 5</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('poetica', 1)">Pilastro Successivo: Intellettuale Engagé &rarr;</button>
        </div>
      </div>

      <!-- Subtab 4: Impegno Civile -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">RUOLO STORICO: J'accuse...! & Gruppo di Médan</span>
            <h3 class="pres-card-title">${pilastri[4].titolo}</h3>
          </div>
          <p class="pres-lead-text">${pilastri[4].descrizione}</p>

          <div class="pres-focus-box" style="margin-top: 25px;">
            <div class="pres-focus-label">DEFINIZIONE STORICA DELL'INTELLETTUALE ENGAGÉ</div>
            <div class="pres-focus-text">«La verità è in marcia e nulla potrà fermarla.» — Zola mette la propria notorietà e la propria libertà a rischio per la giustizia universale.</div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('poetica', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Pilastro 5 di 5</span>
          <button class="subnav-step-btn primary" onclick="window.navigateToPage('opere')">Passa a Opere & Rougon-Macquart &rarr;</button>
        </div>
      </div>

    </div>
  `;
}

// 3. Sezione Opere Composte & Cicli Principali
function renderCyclesAndNovels() {
  const cyclesContainer = document.getElementById('cycles-summary-grid');
  const novelsContainer = document.getElementById('novels-grid');
  const filtersContainer = document.getElementById('novels-filters');
  const notableContainer = document.getElementById('notable-titles-grid');

  const subtabs = [
    { label: "I 3 Grandi Cicli", key: "cicli" },
    { label: "I Due Rami (Rougon vs Macquart)", key: "albero" },
    { label: "I 20 Romanzi (Filtro Tematico)", key: "romanzi" },
    { label: "I 7 Titoli Più Noti", key: "notabili" }
  ];

  if (cyclesContainer) {
    cyclesContainer.innerHTML = `
      <div class="section-subnav-bar">
        ${subtabs.map((tab, idx) => `
          <button class="subnav-pill-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchSubtab('opere', ${idx})">
            <span class="subnav-num">${idx + 1}</span>
            <span>${tab.label}</span>
          </button>
        `).join('')}
      </div>

      <div class="subtabs-content-wrapper">
        
        <!-- Subtab 0: I 3 Grandi Cicli -->
        <div class="subtab-pane active animate-fade-in">
          <div class="cycles-cards-grid">
            ${ZOLA_DATA.cicliLetterari.map(c => `
              <div class="cycle-master-card ${c.id === 'rougon-macquart' ? 'cycle-featured' : ''}">
                <div class="cycle-card-top">
                  <span class="cycle-years-badge">${c.anni}</span>
                  <span class="cycle-vol-badge">${c.volumi}</span>
                </div>
                <h3 class="cycle-card-title">${c.titolo}</h3>
                ${c.sottotitolo ? `<div class="cycle-card-sub">${c.sottotitolo}</div>` : ''}
                <p class="cycle-card-desc">${c.contenuto}</p>
                ${c.elenco ? `<div class="cycle-card-list"><strong>Titoli:</strong> ${c.elenco}</div>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="subnav-stepper-footer">
            <button class="subnav-step-btn" disabled>&larr; Precedente</button>
            <span class="subnav-step-info">Scheda 1 di 4</span>
            <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('opere', 1)">Scheda Successiva: Albero Genealogico &rarr;</button>
          </div>
        </div>

        <!-- Subtab 1: I Due Rami della Famiglia -->
        <div class="subtab-pane animate-fade-in">
          <div class="presentation-big-card">
            <div class="pres-card-header">
              <span class="pres-card-tag">SCHEMA GENEALOGICO & SOCIALE</span>
              <h3 class="pres-card-title">I Due Rami di Adélaïde Fouque</h3>
            </div>
            <p class="pres-lead-text">Tutti i 20 romanzi discendono dalla capostipite Adélaïde Fouque, divisa tra matrimonio legittimo e relazione clandestina:</p>

            <div class="two-branches-comparison-grid">
              <div class="branch-card branch-rougon">
                <div class="branch-badge">RAMO LEGITTIMO</div>
                <h4>I ROUGON</h4>
                <div class="branch-traits"><strong>Caratteristiche:</strong> Ambizione spietata, brama di potere, arrivismo politico e finanziario.</div>
                <p>Scalano l'alta società del Secondo Impero: ministri, banchieri, speculatori immobiliari (es. Eugène Rougon, Aristide Saccard).</p>
              </div>

              <div class="branch-card branch-macquart">
                <div class="branch-badge macquart-badge">RAMO ILLEGITTIMO</div>
                <h4>I MACQUART</h4>
                <div class="branch-traits"><strong>Caratteristiche:</strong> Tare genetiche, propensione all'alcolismo, nevrosi, impulsività.</div>
                <p>Affondano nel popolo e nel proletariato: operai, lavandaie, prostitute, minatori (es. Gervaise in <em>L'Assommoir</em>, Nana, Étienne Lantier in <em>Germinal</em>).</p>
              </div>
            </div>
          </div>

          <div class="subnav-stepper-footer">
            <button class="subnav-step-btn" onclick="window.switchSubtabRelative('opere', -1)">&larr; Precedente</button>
            <span class="subnav-step-info">Scheda 2 di 4</span>
            <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('opere', 1)">Scheda Successiva: I 20 Romanzi &rarr;</button>
          </div>
        </div>

        <!-- Subtab 2: Esploratore dei 20 Romanzi -->
        <div class="subtab-pane animate-fade-in">
          <div class="presentation-big-card">
            <div class="pres-card-header">
              <span class="pres-card-tag">I 20 ROMANZI DEI ROUGON-MACQUART (1871–1893)</span>
              <h3 class="pres-card-title">Esploratore Romanzo per Romanzo</h3>
            </div>
            <p class="pres-lead-text">Seleziona una categoria tematica e clicca su qualsiasi scheda per leggere la sintesi completa.</p>
            
            <div id="novels-filters-inner" class="novels-filters"></div>
            <div id="novels-grid-inner" class="novels-grid"></div>
          </div>

          <div class="subnav-stepper-footer">
            <button class="subnav-step-btn" onclick="window.switchSubtabRelative('opere', -1)">&larr; Precedente</button>
            <span class="subnav-step-info">Scheda 3 di 4</span>
            <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('opere', 1)">Scheda Successiva: Titoli Più Noti &rarr;</button>
          </div>
        </div>

        <!-- Subtab 3: Titoli Più Noti -->
        <div class="subtab-pane animate-fade-in">
          <div class="presentation-big-card">
            <div class="pres-card-header">
              <span class="pres-card-tag">OPERE INDISPENSABILI PER L'INTERROGAZIONE</span>
              <h3 class="pres-card-title">I 7 Titoli Cardine di Émile Zola</h3>
            </div>
            
            <div class="notable-titles-grid">
              ${ZOLA_DATA.titoliPiuNoti.map(t => `
                <div class="notable-title-card">
                  <div class="notable-top">
                    <span class="notable-name">${t.titolo}</span>
                    <span class="notable-year">(${t.anno})</span>
                  </div>
                  <p class="notable-desc">${t.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="subnav-stepper-footer">
            <button class="subnav-step-btn" onclick="window.switchSubtabRelative('opere', -1)">&larr; Precedente</button>
            <span class="subnav-step-info">Scheda 4 di 4</span>
            <button class="subnav-step-btn primary" onclick="window.navigateToPage('germinal')">Passa al Capolavoro Germinal &rarr;</button>
          </div>
        </div>

      </div>
    `;

    // Inizializza filtri e romanzi all'interno del subtab 2
    initNovelsExplorer();
  }
}

function initNovelsExplorer() {
  const novels = ZOLA_DATA.romanziRougonMacquart;
  const categories = [
    { label: "Tutti i 20 Romanzi", key: "all" },
    { label: "Miniere & Proletariato", key: "proletariato" },
    { label: "Commercio & Finanza", key: "commercio" },
    { label: "Arte & Misticismo", key: "arte" },
    { label: "Politica & Chiesa", key: "politica" },
    { label: "Ferrovie & Tecnologia", key: "ferrovia" }
  ];

  const filtersContainer = document.getElementById('novels-filters-inner');
  const novelsContainer = document.getElementById('novels-grid-inner');

  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" onclick="window.filterNovels('${cat.key}', this)">
        ${cat.label}
      </button>
    `).join('');
  }

  window.filterNovels = function(category, btn) {
    if (btn) {
      document.querySelectorAll('#novels-filters-inner .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    let filtered = novels;
    if (category === 'proletariato') {
      filtered = novels.filter(n => [7, 12, 13, 15].includes(n.n));
    } else if (category === 'commercio') {
      filtered = novels.filter(n => [2, 3, 10, 11, 18].includes(n.n));
    } else if (category === 'arte') {
      filtered = novels.filter(n => [8, 9, 14, 16].includes(n.n));
    } else if (category === 'politica') {
      filtered = novels.filter(n => [1, 4, 5, 6, 19, 20].includes(n.n));
    } else if (category === 'ferrovia') {
      filtered = novels.filter(n => [17].includes(n.n));
    }

    if (novelsContainer) {
      novelsContainer.innerHTML = filtered.map(n => `
        <div class="novel-card ${n.n === 13 ? 'featured-novel' : ''} animate-pop" onclick="window.openNovelModal(${n.n})">
          <div class="novel-card-top">
            <span class="novel-number">N. ${n.n}</span>
            <span class="novel-year">${n.anno}</span>
          </div>
          <h4 class="novel-title">${n.titolo}</h4>
          <div class="novel-env"><strong>Ambiente:</strong> ${n.ambiente}</div>
          ${n.n === 13 ? '<div class="crown-badge">Capolavoro Assoluto</div>' : ''}
        </div>
      `).join('');
    }
  };

  window.openNovelModal = function(novelNum) {
    const n = novels.find(item => item.n === novelNum);
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
        <p style="font-size: 1.15rem; margin-bottom: 14px;"><strong>Ambiente Esplorato:</strong> ${n.ambiente}</p>
        <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 18px;"><strong>Tema & Sintesi del Ciclo:</strong> ${n.tema}</p>
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

// 5. Sezione Capolavoro Germinal (1885)
function renderGerminal() {
  const container = document.getElementById('germinal-deep-dive');
  if (!container) return;

  const g = ZOLA_DATA.focusGerminal;
  const subtabs = [
    { label: "Trama Epica in 3 Atti", key: "trama" },
    { label: "I Simboli: Il Pozzo & Il Titolo", key: "simboli" },
    { label: "I Personaggi di Montsou", key: "personaggi" },
    { label: "I 6 Pilastri Critici", key: "pilastri" }
  ];

  container.innerHTML = `
    <!-- Sottomenu a schede ad alta visibilità -->
    <div class="section-subnav-bar">
      ${subtabs.map((tab, idx) => `
        <button class="subnav-pill-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchSubtab('germinal', ${idx})">
          <span class="subnav-num">${idx + 1}</span>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </div>

    <div class="subtabs-content-wrapper">
      
      <!-- Subtab 0: Trama Epica in 3 Atti -->
      <div class="subtab-pane active animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">IL VERTICE DEL NATURALISMO EUROPEO (1885)</span>
            <h3 class="pres-card-title">Germinal — L'Epopea dei Minatori in 3 Atti</h3>
          </div>
          
          <div class="germinal-meta-strip">
            <div class="meta-pill"><strong>Anno:</strong> 1885</div>
            <div class="meta-pill"><strong>Ciclo:</strong> Rougon-Macquart (Vol. 13)</div>
            <div class="meta-pill"><strong>Luogo:</strong> Bacino di Montsou (Anzin)</div>
            <div class="meta-pill"><strong>Tema:</strong> Sfruttamento e Lotta di Classe</div>
          </div>

          <p class="pres-lead-text" style="margin-top: 14px;">
            ${g.tramaEssenziale}
          </p>

          <div class="three-acts-grid">
            ${(g.treAtti || []).map((atto, idx) => `
              <div class="act-card animate-slide-up" style="animation-delay: ${idx * 0.08}s">
                <div class="act-header">
                  <span class="act-number">${atto.atto}</span>
                  <span class="act-tag">${atto.tag}</span>
                </div>
                <h4 class="act-title">${atto.titolo}</h4>
                <ul class="act-points">
                  ${atto.punti.map(pt => `<li>${pt}</li>`).join('')}
                </ul>
                <div class="act-quote">${atto.citazione}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" disabled>&larr; Precedente</button>
          <span class="subnav-step-info">Scheda 1 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('germinal', 1)">Scheda Successiva: I Simboli &rarr;</button>
        </div>
      </div>

      <!-- Subtab 1: I Simboli (Il Pozzo & Il Titolo) -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">ANALISI SIMBOLICA & MITO</span>
            <h3 class="pres-card-title">Il Pozzo "Le Voreux" & Il Titolo "Germinal"</h3>
          </div>

          <div class="germinal-dual-symbols">
            <!-- Simbolo 1: Il Pozzo -->
            <div class="symbol-block-card">
              <div class="symbol-block-header">
                <span class="symbol-subtag">LA METAFORA DEL MOSTRO</span>
                <h4>Il Pozzo «Le Voreux» (Il Vorace)</h4>
              </div>
              <div class="monster-quote-highlight">
                «Appariva come una bestia gigantesca, accovacciata nell'ombra, che inghiottiva senza sosta la carne umana dei minatori.»
              </div>
              <div class="symbol-block-points">
                <div class="symbol-point">
                  <strong>Trasformazione Mitica:</strong>
                  <span>Zola trasforma la struttura industriale d'acciaio in una divinità mostruosa pagana che richiede sacrifici quotidiani di corpi umani.</span>
                </div>
                <div class="symbol-point">
                  <strong>Gli Inferi Sotterranei:</strong>
                  <span>Caldo asfissiante a 500 metri, buio pesto rischiarato dalle lampade, rischio perenne di frane, allagamenti e il gas silenzioso mortale: il grisù.</span>
                </div>
              </div>
            </div>

            <!-- Simbolo 2: Il Titolo -->
            <div class="symbol-block-card symbol-featured">
              <div class="symbol-block-header">
                <span class="symbol-subtag">CALENDARIO RIVOLUZIONARIO FRANCESE</span>
                <h4>Il Significato Profetico del Titolo</h4>
              </div>
              <div class="symbol-quote-highlight">
                «Uomini stavano germogliando, un esercito nero e vendicatore che sarebbe presto sbocciato per i raccolti del secolo futuro.»
              </div>
              <div class="symbol-block-points">
                <div class="symbol-point">
                  <strong>Il Mese della Germinazione:</strong>
                  <span>"Germinal" corrispondeva al mese di aprile (primavera) nel calendario repubblicano del 1793: il momento in cui la natura risveglia i semi sepolti.</span>
                </div>
                <div class="symbol-point">
                  <strong>La Speranza Sociale:</strong>
                  <span>Come il grano matura al buio prima di rompere la terra, così la lotta operaia, pur temporaneamente sconfitta, produrrà la futura emancipazione umana.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pres-key-takeaway" style="margin-top: 24px;">
            <span class="takeaway-badge">DA RICORDARE</span>
            <p>In <em>Germinal</em> il dato scientifico e documentario si fonde con la grandezza epica e mitica: la macchina diventa mostro e il proletariato diventa forza della natura.</p>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('germinal', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Scheda 2 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('germinal', 1)">Scheda Successiva: Personaggi &rarr;</button>
        </div>
      </div>

      <!-- Subtab 2: Personaggi Chiave -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">I PROTAGONISTI DELLA TRAGEDIA CORALE</span>
            <h3 class="pres-card-title">I Personaggi Chiave di Montsou</h3>
          </div>
          <p class="pres-lead-text">
            A differenza del romanzo tradizionale incentrato su un solo eroe, <em>Germinal</em> è un grande affresco corale dove ogni figura incarna una reazione psicologica e sociale allo sfruttamento.
          </p>

          <div class="characters-large-grid">
            ${(g.personaggi || []).map(p => `
              <div class="character-card-item">
                <div class="char-role-badge">${p.ruolo}</div>
                <h4 class="char-name">${p.nome}</h4>
                <p class="char-desc">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('germinal', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Scheda 3 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('germinal', 1)">Scheda Successiva: 6 Pilastri Critici &rarr;</button>
        </div>
      </div>

      <!-- Subtab 3: 6 Chiavi di Lettura -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">APPROFONDIMENTO CRITICO</span>
            <h3 class="pres-card-title">Perché Germinal è il Vertice del Naturalismo (6 Pilastri)</h3>
          </div>
          <p class="pres-lead-text">
            I sei motivi fondamentali che rendono <em>Germinal</em> l'opera più studiata, celebrata e potente di Émile Zola.
          </p>

          <div class="germinal-reasons-grid">
            ${g.puntiRappresentativi.map((p, i) => `
              <div class="germinal-reason-card">
                <div class="reason-card-top">
                  <span class="reason-number">0${i + 1}</span>
                  <h5 class="reason-card-title">${p.titolo}</h5>
                </div>
                <p class="reason-card-desc">${p.desc}</p>
              </div>
            `).join('')}
          </div>

          <div class="pres-key-takeaway" style="margin-top: 24px;">
            <span class="takeaway-badge">DA RICORDARE</span>
            <p>Al funerale di Zola nel 1902, le delegazioni dei minatori francesi sfilarono scandendo all'unisono il grido <em>«Germinal! Germinal!»</em>, a testimonianza del legame indissolubile tra l'opera e la coscienza civile della nazione.</p>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('germinal', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Scheda 4 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.navigateToPage('curiosita')">Passa a Curiosità &rarr;</button>
        </div>
      </div>

    </div>
  `;
}

// Lightbox per Immagini Storiche
window.openImageLightbox = function(src, alt, caption) {
  const modal = document.getElementById('image-lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !img) return;

  img.src = src;
  img.alt = alt || '';
  if (cap) cap.textContent = caption || alt || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  SFX.playTone(520, 'sine', 0.05, 0.04);
};

window.closeImageLightbox = function() {
  const modal = document.getElementById('image-lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

const CURIOSITY_ANECDOTES = [
  {
    badge: "IL MISTERO DEL CAMINETTO (1902)",
    title: "Morte Accidentale o Omicidio Politico?",
    subtitle: "L'asfissia nella residenza di Parigi: disgrazia o complotto nazionalista?",
    text: "La notte del 29 settembre 1902, Émile Zola e la moglie Alexandrine vengono asfissiati dai fumi di monossido di carbonio nella loro camera da letto in Rue de Bruxelles. Alexandrine viene salvata in extremis dai soccorsi, ma per lo scrittore, ormai sessantaduenne, non c'è più nulla da fare.\n\nNel 1953, una clamorosa confessione sul letto di morte di uno spazzacamino parigino nazionalista (Henri Buronfosse) rivelò che la canna fumaria dell'abitazione era stata deliberatamente ostruita con pezzi di intonaco il giorno prima e poi stappata la mattina seguente all'alba, con l'obiettivo premeditato di assassinare lo scrittore, odiato dagli ambienti reazionari per aver difeso il capitano Dreyfus.",
    takeaway: "Le indagini ufficiali del 1902 archiviarono il caso come incidente dovuto al tiraggio difettoso, ma la testimonianza del 1953 confermò i sospetti storici di un vero e proprio assassinio politico mirato."
  },
  {
    badge: "IL CASO LETTERARIO",
    title: "Candidato al Nobel per la Letteratura (1901-1902)",
    subtitle: "Il rifiuto ideologico dell'Accademia di Svezia contro il realismo naturalista.",
    text: "Émile Zola fu proposto a gran voce per il neonato Premio Nobel per la Letteratura nelle sue primissime edizioni storiche (1901 e 1902), sostenuto da autorevoli circoli letterari francesi ed europei.\n\nL'Accademia Reale di Svezia, tuttavia, guidata dall'inflessibile segretario permanente e critico conservatore Carl David af Wirsén, pose un veto categorico. Wirsén considerava il realismo crudo, l'indagine scientifica delle tare ereditarie e l'anticlericalismo di Zola incompatibili con la clausola testamentaria di Alfred Nobel, che richiedeva opere 'di tendenza idealistica'. Gli vennero così preferiti il poeta parnassiano Sully Prudhomme (1901) e lo storico tedesco Theodor Mommsen (1902).",
    takeaway: "Il mancato Nobel a Zola rimane uno dei più celebri e discussi verdetti ideologici nella storia dell'Accademia Svedese."
  },
  {
    badge: "COLLEZIONISMO & MODERNO",
    title: "L'Amore per le Biciclette e la Tecnologia",
    subtitle: "Pioniere della mobilità moderna e delle innovazioni scientifiche quotidiane.",
    text: "Zola non era solo il teorico del progresso scientifico sulla carta, ma un entusiasta sperimentatore di ogni novità dell'era industriale.\n\nImparò ad andare in bicicletta a cinquant'anni, compiendo lunghe e impegnative pedalate quotidiane tra i boschi e le colline attorno alla sua celebre villa di Médan per rinvigorire il corpo dopo ore di scrittura. Inoltre, fu tra i primissimi cittadini francesi a dotare la propria dimora di illuminazione elettrica a filamento, di una linea telefonica privata diretta con Parigi e di moderne macchine da stampa per le bozze.",
    takeaway: "Per Zola la tecnologia e la velocità moderna erano parte integrante dello stile di vita dell'intellettuale contemporaneo."
  },
  {
    badge: "PRODUTTIVITÀ RIGOROSA",
    title: "La Formula: «Nulla dies sine linea»",
    subtitle: "Una disciplina metodica: 20 capolavori monumentali in soli 22 anni.",
    text: "Scolpì sul monumentale camino in pietra del suo studio di lavoro a Médan il celebre precetto latino attribuito a Plinio il Vecchio: «Nulla dies sine linea» (Nessun giorno senza una riga scritta).\n\nLa sua routine quotidiana era scandita con la precisione di un laboratorio: ogni mattina, dalle 9:00 alle 13:00 senza eccezione alcuna (anche durante i viaggi o le crisi politiche), redigeva esattamente quattro cartelle dense (circa 1.000 parole al giorno). Grazie a questo rigore instancabile completò l'intero ciclo dei Rougon-Macquart (oltre 1.200 personaggi e 20 romanzi) in soli 22 anni.",
    takeaway: "Il metodo sperimentale di Zola non era un'astratta filosofia, ma una disciplina artigianale ferrea e incrollabile fondata sulla costanza quotidiana."
  }
];

// 7. Sezione Curiosità Storiche & Galleria
function renderCuriosities() {
  const container = document.getElementById('curiosities-grid');
  if (!container) return;

  const subtabs = [
    { label: "Zola Fotografo (4.000+ Scatti)", key: "fotografo" },
    { label: "Cézanne & L'Opera (L'Œuvre)", key: "cezanne" },
    { label: "Il Panthéon & Anatole France", key: "pantheon" },
    { label: "Morte, Nobel & Aneddoti", key: "morte" }
  ];

  container.innerHTML = `
    <!-- Sottomenu a schede ad alta visibilità -->
    <div class="section-subnav-bar">
      ${subtabs.map((tab, idx) => `
        <button class="subnav-pill-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchSubtab('curiosita', ${idx})">
          <span class="subnav-num">${idx + 1}</span>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </div>

    <div class="subtabs-content-wrapper">
      
      <!-- Subtab 0: Zola Fotografo -->
      <div class="subtab-pane active animate-fade-in">
        <div class="presentation-big-card curiosity-monumental-card">
          <div class="curiosity-feature-layout">
            <div class="curiosity-feature-photo curiosity-photo-vertical" onclick="window.openImageLightbox('assets/foto/ZOLAFOTOGRAFO.jpg', 'Émile Zola Fotografo', 'Émile Zola con la sua attrezzatura fotografica (scattò oltre 4.000 fotografie)')">
              <img src="assets/foto/ZOLAFOTOGRAFO.jpg" alt="Émile Zola Fotografo" class="curiosity-full-img">
              <div class="curiosity-zoom-badge">Ingrandisci a Schermo Intero</div>
            </div>
            <div class="curiosity-feature-text">
              <span class="curiosity-tag">PIONIERE DELLA FOTOGRAFIA & DOCUMENTAZIONE</span>
              <h3 class="curiosity-main-title">Lo Sguardo Scientifico dell'Obiettivo</h3>
              <p class="curiosity-lead-p">
                Zola fu uno dei primissimi grandi letterati europei ad abbracciare la fotografia moderna con rigore scientifico e ossessiva maestria. Considerava la lente un prolungamento esatto del metodo naturalista: documentare senza filtri né abbellimenti la verità materiale.
              </p>

              <div class="curiosity-details-grid">
                <div class="curiosity-detail-item">
                  <div class="detail-number">10+</div>
                  <div class="detail-label">Macchine fotografiche di precisione collezionate</div>
                </div>
                <div class="curiosity-detail-item">
                  <div class="detail-number">4.000+</div>
                  <div class="detail-label">Lastre fotografiche e scatti d'epoca documentati</div>
                </div>
                <div class="curiosity-detail-item">
                  <div class="detail-number">3</div>
                  <div class="detail-label">Laboratori chimici di sviluppo (Parigi, Médan, Londra)</div>
                </div>
              </div>

              <div class="pres-key-takeaway">
                <span class="takeaway-badge">DA RICORDARE</span>
                <p>Zola affermava: <em>«Non si può dire di aver veramente visto qualcosa finché non lo si è fotografato»</em>. La fotografia non era un hobby, ma l'equivalente visivo del taccuino d'inchiesta per i suoi romanzi sperimentali.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" disabled>&larr; Precedente</button>
          <span class="subnav-step-info">Curiosità 1 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('curiosita', 1)">Curiosità Successiva: Cézanne &rarr;</button>
        </div>
      </div>

      <!-- Subtab 1: Cézanne & L'Œuvre -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card curiosity-monumental-card">
          <div class="curiosity-feature-layout">
            <div class="curiosity-feature-photo" onclick="window.openImageLightbox('assets/foto/ZOLAECézanne.jpg', 'Émile Zola e Paul Cézanne', 'Émile Zola e Paul Cézanne ad Aix-en-Provence')">
              <img src="assets/foto/ZOLAECézanne.jpg" alt="Émile Zola e Cézanne" class="curiosity-full-img">
              <div class="curiosity-zoom-badge">Ingrandisci a Schermo Intero</div>
            </div>
            <div class="curiosity-feature-text">
              <span class="curiosity-tag">ARTE, FRATELLANZA & ROTTURA</span>
              <h3 class="curiosity-main-title">Il Legame Fraterno con Paul Cézanne</h3>
              <p class="curiosity-lead-p">
                Cresciuti insieme tra le colline di Aix-en-Provence al Collège Bourbon, Zola e Cézanne condivisero i sogni giovanili di gloria letteraria e pittorica. Zola difese con coraggio Cézanne e la rivoluzione degli Impressionisti (Manet, Monet, Pissarro) contro i salotti accademici parigini.
              </p>

              <div class="curiosity-break-box">
                <div class="break-title">La Tragedia di un Romanzo: <em>L'Œuvre</em> (1886)</div>
                <p>Nel 1886 Zola pubblica <em>L'Œuvre</em>, incentrato sulla figura di Claude Lantier, un pittore geniale incapace di realizzare il suo capolavoro assoluto, che finisce per impiccarsi davanti alla tela incompiuta. Cézanne riconobbe nella figura del fallito le proprie ossessioni e inviò a Zola una lettera di commiato gelida e definitiva, ponendo fine a trent'anni di sodalizio.</p>
              </div>

              <div class="pres-key-takeaway">
                <span class="takeaway-badge">DA RICORDARE</span>
                <p>Alla morte improvvisa di Zola nel 1902, Cézanne pianse a lungo nel suo studio di Aix: nonostante la rottura, l'affetto e l'ammirazione per l'amico d'infanzia rimasero vivi per tutta la vita.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('curiosita', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Curiosità 2 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('curiosita', 1)">Curiosità Successiva: Il Panthéon &rarr;</button>
        </div>
      </div>

      <!-- Subtab 2: Il Panthéon (1908) -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card curiosity-monumental-card">
          <div class="curiosity-feature-layout">
            <div class="curiosity-feature-photo" onclick="window.openImageLightbox('assets/foto/PANTHEONZOLA.jpg', 'Traslazione al Panthéon 1908', 'La solenne cerimonia di traslazione di Zola al Panthéon di Parigi (1908)')">
              <img src="assets/foto/PANTHEONZOLA.jpg" alt="Panthéon Zola" class="curiosity-full-img">
              <div class="curiosity-zoom-badge">Ingrandisci a Schermo Intero</div>
            </div>
            <div class="curiosity-feature-text">
              <span class="curiosity-tag">APOTEOSI NAZIONALE & GLORIA REPUBBLICANA</span>
              <h3 class="curiosity-main-title">La Solenne Traslazione al Panthéon (1908)</h3>
              <p class="curiosity-lead-p">
                Il 4 giugno 1908, a sei anni dalla morte, la Repubblica Francese tributò a Émile Zola il massimo onore laico: le sue spoglie vennero traslate nella cripta del Panthéon, accanto a <strong>Victor Hugo</strong> e <strong>Voltaire</strong>.
              </p>

              <div class="pantheon-quote-card">
                <div class="quote-speaker">Dall'Orazione Funebre di Anatole France:</div>
                <blockquote class="quote-content">
                  «Invidiamolo: egli onorò la sua patria e il mondo con un'opera immensa e con un grande atto. Egli fu un momento della coscienza umana!»
                </blockquote>
              </div>

              <div class="pres-key-takeaway">
                <span class="takeaway-badge">DA RICORDARE</span>
                <p>Durante la cerimonia al Panthéon, il giornalista nazionalista Louis Grégori sparò due colpi di pistola contro il colonnello Alfred Dreyfus ferendolo al braccio: la figura di Zola divideva la Francia tra forze democratiche e reazionarie anche dopo la sua morte.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('curiosita', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Curiosità 3 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.switchSubtabRelative('curiosita', 1)">Curiosità Successiva: Morte & Nobel &rarr;</button>
        </div>
      </div>

      <!-- Subtab 3: Morte Sospetta, Nobel & Aneddoti -->
      <div class="subtab-pane animate-fade-in">
        <div class="presentation-big-card curiosity-monumental-card">
          <div class="pres-card-header">
            <span class="pres-card-tag">ENIGMI STORICI, RICONOSCIMENTI & VITA PRIVATA</span>
            <h3 class="pres-card-title">Mistero della Morte, Mancato Nobel & Curiosità</h3>
          </div>
          <p class="pres-lead-text">Clicca su ciascuna card per ingrandirla a tutto schermo e leggere i dettagli storici completi.</p>

          <div class="curiosity-anecdotes-grid">
            ${CURIOSITY_ANECDOTES.map((item, idx) => `
              <div class="anecdote-box" onclick="window.openCuriosityModal(${idx})" title="Clicca per ingrandire">
                <div class="anecdote-header">
                  <span class="anecdote-badge">${item.badge}</span>
                  <h4>${item.title}</h4>
                </div>
                <p>${item.subtitle}</p>
                <div class="anecdote-zoom-hint">
                  <span>Clicca per ingrandire &rarr;</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pres-key-takeaway" style="margin-top: 24px;">
            <span class="takeaway-badge">DA RICORDARE</span>
            <p>La morte di Zola, avvenuta alla vigilia della riabilitazione di Dreyfus, trasformò il suo funerale a Montmartre in una gigantesca manifestazione di popolo: 50.000 persone sfilarono dietro al feretro intonando i canti dei minatori di <em>Germinal</em>.</p>
          </div>
        </div>

        <div class="subnav-stepper-footer">
          <button class="subnav-step-btn" onclick="window.switchSubtabRelative('curiosita', -1)">&larr; Precedente</button>
          <span class="subnav-step-info">Curiosità 4 di 4</span>
          <button class="subnav-step-btn primary" onclick="window.quizApp && window.quizApp.openQuizModal()">Avvia Sessione Quiz Live &rarr;</button>
        </div>
      </div>

    </div>
  `;
}

window.openCuriosityModal = function(idx) {
  const item = CURIOSITY_ANECDOTES[idx];
  if (!item) return;
  const content = document.getElementById('curiosity-modal-content');
  const modal = document.getElementById('curiosity-modal');
  if (!content || !modal) return;

  const total = CURIOSITY_ANECDOTES.length;
  const prevIdx = (idx - 1 + total) % total;
  const nextIdx = (idx + 1) % total;

  content.innerHTML = `
    <div class="curiosity-modal-body">
      <div class="curiosity-modal-header">
        <span class="curiosity-modal-badge">${item.badge}</span>
        <h3 class="curiosity-modal-title">${item.title}</h3>
        <p class="curiosity-modal-lead">${item.subtitle}</p>
      </div>

      <div class="curiosity-modal-paragraphs">
        ${item.text.split('\n\n').map(p => `<p class="curiosity-modal-text">${p}</p>`).join('')}
      </div>

      <div class="pres-key-takeaway" style="margin-top: 14px;">
        <span class="takeaway-badge">PUNTO CHIAVE</span>
        <p>${item.takeaway}</p>
      </div>

      <div class="curiosity-modal-nav">
        <button class="subnav-step-btn" onclick="window.openCuriosityModal(${prevIdx})">&larr; Precedente</button>
        <span class="subnav-step-info">Curiosità ${idx + 1} di ${total}</span>
        <button class="subnav-step-btn primary" onclick="window.openCuriosityModal(${nextIdx})">Successiva &rarr;</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  SFX.playTone(600, 'sine', 0.05, 0.04);
};

window.closeCuriosityModal = function() {
  const modal = document.getElementById('curiosity-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

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
      const room = this.engine.roomCode;
      let playerUrl = '';
      
      if (window.location.protocol.startsWith('http')) {
        // Quando eseguito su GitHub Pages o Server Locale HTTP
        const baseUrl = window.location.origin + window.location.pathname;
        playerUrl = `${baseUrl}?mode=player&room=${room}`;
      } else {
        // Quando aperto direttamente con doppio click da file://
        const baseHref = window.location.href.split('?')[0].split('#')[0];
        playerUrl = `${baseHref}?mode=player&room=${room}`;
      }

      // Apri in una nuova finestra/scheda con dimensioni ideali per simulare uno smartphone
      const width = 440;
      const height = 820;
      const left = window.screen.width ? (window.screen.width - width) / 2 : 100;
      const top = window.screen.height ? (window.screen.height - height) / 2 : 50;
      
      const newWin = window.open(
        playerUrl,
        '_blank',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );

      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Se il browser blocca i popup, esegui fallback su nuova scheda standard
        window.open(playerUrl, '_blank');
      }

      SFX.playTone(600, 'sine', 0.08, 0.05);
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

    setQuestionCount: function(count, btn) {
      if (this.engine) {
        this.engine.totalQuestions = parseInt(count, 10) || 10;
      }
      document.querySelectorAll('.qcount-chip').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const sublabel = document.getElementById('lobby-qcount-sublabel');
      if (sublabel) sublabel.textContent = `${count} Domande`;
      this.updateLobbyStartButtonText();
      SFX.playTone(520, 'sine', 0.06, 0.05);
    },

    setTimeLimit: function(seconds, btn) {
      if (this.engine) {
        this.engine.timeLimit = seconds;
        this.engine.timeLeft = seconds;
      }
      document.querySelectorAll('.timer-chip').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const sublabel = document.getElementById('lobby-timer-sublabel');
      if (sublabel) sublabel.textContent = `${seconds} Secondi`;
      this.updateLobbyStartButtonText();
      SFX.playTone(550, 'sine', 0.06, 0.05);
    },

    updateLobbyStartButtonText: function() {
      const startBtn = document.getElementById('lobby-start-btn');
      const qCount = (this.engine && this.engine.totalQuestions) ? this.engine.totalQuestions : 10;
      const tSec = (this.engine && this.engine.timeLimit) ? this.engine.timeLimit : 10;
      if (startBtn) {
        startBtn.textContent = `Avvia la Sessione (${qCount} Domande · ${tSec}s ciascuna)`;
      }
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
  let mode = urlParams.get('mode');
  let room = urlParams.get('room');

  // Fallback: Controlla se i parametri sono passati dopo l'hash (es. #home?mode=player&room=XXX)
  if (!mode && window.location.hash.includes('?')) {
    const hashQuery = window.location.hash.split('?')[1];
    const hashParams = new URLSearchParams(hashQuery);
    mode = hashParams.get('mode');
    room = hashParams.get('room');
  }

  if (mode === 'player' || (window.innerWidth < 600 && (urlParams.has('room') || (window.location.hash.includes('room='))))) {
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
        <div class="student-game-top">
          <span id="student-q-num" class="student-q-badge">Domanda 1</span>
          <span id="student-score-tag" class="student-score-badge">0 pt</span>
        </div>

        <!-- Casella Domanda Visibile anche su Smartphone -->
        <div class="student-question-box animate-pop">
          <h2 id="student-question-text" class="student-q-title">Caricamento domanda...</h2>
        </div>

        <div class="student-kahoot-grid">
          <button class="s-btn red" onclick="window.studentSendAnswer('${playerId}', 0)">
            <span class="s-btn-letter">[A]</span>
            <span id="student-opt-0" class="s-btn-text"></span>
          </button>
          <button class="s-btn blue" onclick="window.studentSendAnswer('${playerId}', 1)">
            <span class="s-btn-letter">[B]</span>
            <span id="student-opt-1" class="s-btn-text"></span>
          </button>
          <button class="s-btn yellow" onclick="window.studentSendAnswer('${playerId}', 2)">
            <span class="s-btn-letter">[C]</span>
            <span id="student-opt-2" class="s-btn-text"></span>
          </button>
          <button class="s-btn green" onclick="window.studentSendAnswer('${playerId}', 3)">
            <span class="s-btn-letter">[D]</span>
            <span id="student-opt-3" class="s-btn-text"></span>
          </button>
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
      const qNumEl = document.getElementById('student-q-num');
      const qTextEl = document.getElementById('student-question-text');
      
      if (qNumEl) qNumEl.textContent = `Domanda ${payload.idx} di ${payload.total}`;
      if (qTextEl) qTextEl.textContent = payload.domanda || '';

      if (Array.isArray(payload.opzioni)) {
        payload.opzioni.forEach((optText, idx) => {
          const optEl = document.getElementById(`student-opt-${idx}`);
          if (optEl) optEl.textContent = optText;
        });
      }
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
        <h2 class="correct-text">Risposta Corretta!</h2>
        <div class="pts-earned">+${p.lastPoints} pt</div>
        ${p.streak > 1 ? `
          <div class="mobile-streak-callout ${p.streak >= 3 ? 'on-fire' : ''}">
            Serie di ${p.streak} Risposte Esatte! ${p.streakMultiplier > 1 ? `(${p.streakMultiplier}x Bonus)` : ''}
          </div>
        ` : ''}
        <p style="margin-top: 10px;">Punteggio Totale: <strong>${p.score} pt</strong></p>
      `;
      SFX.correct();
    } else {
      document.getElementById('feedback-content').innerHTML = `
        <h2 class="wrong-text">Risposta Errata o Tempo Scaduto</h2>
        ${p && p.streak > 1 ? `<div style="color: #ef4444; font-size: 0.9rem; margin-top: 4px;">Serie interrotta!</div>` : ''}
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

