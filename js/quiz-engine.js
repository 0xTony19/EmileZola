/**
 * Quiz Engine & Sound FX Generator
 * Gestisce la logica di gioco, timer a 10 secondi, punteggio, classifiche e audio
 */

// Sintetizzatore Audio con Web Audio API (100% autonomo senza file esterni)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  tick() {
    this.playTone(880, 'triangle', 0.05, 0.05);
  }

  urgentTick() {
    this.playTone(1200, 'square', 0.08, 0.08);
  }

  correct() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  wrong() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.35);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  fanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chords.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.5, 0.15), idx * 120);
      });
    } catch (e) {}
  }
}

const SFX = new SoundFX();

// Classe Gestore del Quiz Live
class QuizEngine {
  constructor(data) {
    this.questions = [...data.domandeQuiz];
    this.totalQuestions = 10; // Seleziona 10 domande per partita
    this.currentQuestions = [];
    this.currentQuestionIdx = 0;
    this.timeLimit = 10; // 10 secondi per domanda
    this.timeLeft = 10;
    this.timerInterval = null;
    this.gameState = 'LOBBY'; // LOBBY, QUESTION, ANSWER_REVEAL, LEADERBOARD, PODIUM
    this.roomCode = 'ZOLA-' + Math.floor(1000 + Math.random() * 9000);
    this.syncHub = new SyncHub(this.roomCode);
    this.isHost = true;
    
    // Giocatori
    this.players = new Map(); // id -> { id, name, avatar, score, streak, lastAnswerTime, isCorrect }
    this.localPlayer = null;
    
    this.initSync();
  }

  initSync() {
    this.syncHub.on('PLAYER_JOIN', (payload) => {
      if (this.isHost) {
        this.addPlayer(payload.id, payload.name, payload.avatar);
        this.syncHub.broadcast('PLAYER_LIST_UPDATE', {
          players: Array.from(this.players.values())
        });
      }
    });

    this.syncHub.on('PLAYER_ANSWER', (payload) => {
      if (this.isHost && this.gameState === 'QUESTION') {
        this.recordPlayerAnswer(payload.playerId, payload.answerIdx, payload.timeTaken);
      }
    });

    this.syncHub.on('PLAYER_LIST_UPDATE', (payload) => {
      if (!this.isHost) {
        this.renderLobbyPlayers(payload.players);
      }
    });

    this.syncHub.on('GAME_START', (payload) => {
      if (!this.isHost) {
        this.handleClientGameStart(payload);
      }
    });

    this.syncHub.on('QUESTION_NEXT', (payload) => {
      if (!this.isHost) {
        this.handleClientQuestion(payload);
      }
    });

    this.syncHub.on('QUESTION_END', (payload) => {
      if (!this.isHost) {
        this.handleClientQuestionEnd(payload);
      }
    });

    this.syncHub.on('GAME_OVER', (payload) => {
      if (!this.isHost) {
        this.handleClientGameOver(payload);
      }
    });
  }

  parseAvatar(avatar) {
    if (typeof avatar === 'object' && avatar !== null) {
      return {
        char: avatar.char || 'cat',
        acc: avatar.acc || 'none',
        bg: avatar.bg || null,
        name: avatar.name || 'Gatto'
      };
    }
    if (typeof avatar === 'string' && avatar.includes(':')) {
      const parts = avatar.split(':');
      return {
        char: parts[0] || 'cat',
        acc: parts[1] || 'none',
        bg: parts[2] || null
      };
    }
    return {
      char: typeof avatar === 'string' ? avatar : 'cat',
      acc: 'none',
      bg: null
    };
  }

  getAvatarData(avatarKey) {
    const parsed = this.parseAvatar(avatarKey);
    const char = (window.AVATAR_CHARACTERS || []).find(c => c.id === parsed.char) || { id: parsed.char, name: 'Studente', bg: '#3b82f6', species: 'Personaggio' };
    const bg = parsed.bg || char.bg;
    return {
      id: char.id,
      name: char.name,
      badge: char.species ? char.species.slice(0, 2).toUpperCase() : 'ST',
      color: bg,
      char: parsed.char,
      acc: parsed.acc,
      bg: bg
    };
  }

  renderAvatarHTML(avatar, size = 44) {
    const parsed = this.parseAvatar(avatar);
    if (typeof window.renderAvatarSVG === 'function') {
      return window.renderAvatarSVG(parsed.char, parsed.acc, parsed.bg, size);
    }
    const av = this.getAvatarData(avatar);
    return `<span class="player-avatar-badge" style="background: ${av.color}; width: ${size}px; height: ${size}px; font-size: ${size * 0.4}px; color: #ffffff;">${av.badge}</span>`;
  }

  addPlayer(id, name, avatar = 'cat') {
    if (!this.players.has(id)) {
      this.players.set(id, {
        id,
        name: name || `Studente_${id.slice(0, 4)}`,
        avatar: avatar || 'cat',
        score: 0,
        streak: 0,
        answered: false,
        lastAnswerTime: 0,
        isCorrect: false,
        correctCount: 0
      });
      this.renderLobbyPlayers();
    }
  }

  addDemoBots() {
    const demoBots = [
      { name: "Chiara (Liceo)", avatar: { char: "cat", acc: "glasses", bg: "#f43f5e" } },
      { name: "Marco (Germinal)", avatar: { char: "bear", acc: "miner_hat", bg: "#b45309" } },
      { name: "Elena (Médan)", avatar: { char: "bunny", acc: "bow", bg: "#ec4899" } },
      { name: "Giacomo (Dreyfus)", avatar: { char: "fox", acc: "tophat", bg: "#ea580c" } },
      { name: "Sofia (Arte)", avatar: { char: "panda", acc: "beret", bg: "#059669" } },
      { name: "Luca (Pro)", avatar: { char: "frog", acc: "headset", bg: "#10b981" } }
    ];
    demoBots.forEach((bot, idx) => {
      this.addPlayer(`bot_${idx}`, bot.name, bot.avatar);
    });
    this.renderLobbyPlayers();
  }

  startLobby() {
    this.gameState = 'LOBBY';
    this.isHost = true;
    this.syncHub.isHost = true;
    
    // Resetta punteggi e stati dei giocatori esistenti per una nuova partita
    this.players.forEach(p => {
      p.score = 0;
      p.streak = 0;
      p.answered = false;
      p.lastAnswerTime = 0;
      p.isCorrect = false;
      p.correctCount = 0;
    });

    const container = document.getElementById('quiz-game-container');
    if (container) {
      container.innerHTML = `
        <div class="quiz-lobby-view animate-fade-in">
          <div class="lobby-top">
            <h1>Inquadra il Codice QR per Partecipare</h1>
            <p class="lobby-subtitle">Tutti possono partecipare dal proprio smartphone usando 4G, 5G o Wi-Fi!</p>
            <span class="local-network-badge" id="network-mode-badge">MODALITA LIVE: 4G / 5G & WI-FI (COME KAHOOT)</span>
          </div>

          <div class="lobby-center-grid">
            <!-- QR Code Card -->
            <div class="lobby-qr-card">
              <div id="qr-canvas-holder" class="qr-canvas-holder"></div>
              <div class="qr-pin-badge">
                PIN STANZA: <span id="room-pin-display">${this.roomCode}</span>
              </div>
              <p class="qr-scan-hint" id="qr-scan-instruction">Inquadra con la fotocamera di QUALSIASI telefono (4G, 5G o Wi-Fi)</p>
              <small id="join-url-text" style="word-break: break-all; color: var(--text-muted); font-size: 0.78rem; margin: 8px 0; background: var(--bg-main); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);"></small>
              
              <div style="display: flex; gap: 6px; margin: 8px 0; justify-content: center; flex-wrap: wrap;">
                <button class="ip-edit-btn active-network-btn" onclick="window.quizApp.setNetworkMode('github')">GitHub Pages (Online 4G/5G)</button>
                <button class="ip-edit-btn" onclick="window.quizApp.setNetworkMode('local')">Wi-Fi Locale</button>
                <button class="ip-edit-btn" onclick="window.quizApp.copyJoinLink()">Copia Link</button>
              </div>
              
              <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 4px;">
                <button class="ip-edit-btn" onclick="window.quizApp.openLocalPlayerTab()">Apri Scheda Giocatore su questo PC</button>
                <button class="ip-edit-btn" onclick="window.quizApp.setCustomIP()">Personalizza IP / Dominio</button>
              </div>
              <div id="file-protocol-warning" style="display: none; margin-top: 10px; font-size: 0.75rem; color: var(--accent-crimson); background: rgba(190,18,60,0.08); padding: 8px; border-radius: var(--radius-sm); border: 1px solid rgba(190,18,60,0.2);">
                Nota: Per consentire a tutta la classe di connettersi da 4G/5G, apri da <strong>https://0xtony19.github.io/EmileZola/</strong>!
              </div>
            </div>

            <!-- Players Lobby Grid -->
            <div class="lobby-players-box">
              <div class="lobby-players-header">
                <h3>Studenti Connessi</h3>
                <span id="lobby-player-count" class="player-count-badge">0 Partecipanti</span>
              </div>
              <div id="lobby-player-grid" class="lobby-player-grid"></div>
            </div>
          </div>

          <!-- Selettore Lunghezza Partita (Numero Domande) e Timer per Domanda -->
          <div class="lobby-timer-selector-card">
            <div class="timer-selector-header">
              <span class="timer-label">NUMERO DI DOMANDE DELLA PARTITA:</span>
              <span id="lobby-qcount-sublabel" class="timer-sublabel">${this.totalQuestions} Domande</span>
            </div>
            <div class="timer-chips-group qcount-chips-group">
              <button type="button" class="qcount-chip ${this.totalQuestions === 5 ? 'active' : ''}" onclick="window.quizApp.setQuestionCount(5, this)">
                <span class="chip-sec">5</span>
                <span class="chip-name">Rapida</span>
              </button>
              <button type="button" class="qcount-chip ${this.totalQuestions === 10 ? 'active' : ''}" onclick="window.quizApp.setQuestionCount(10, this)">
                <span class="chip-sec">10</span>
                <span class="chip-name">Standard</span>
              </button>
              <button type="button" class="qcount-chip ${this.totalQuestions === 15 ? 'active' : ''}" onclick="window.quizApp.setQuestionCount(15, this)">
                <span class="chip-sec">15</span>
                <span class="chip-name">Completa</span>
              </button>
            </div>

            <div class="timer-selector-header" style="margin-top: 14px;">
              <span class="timer-label">DURATA TIMER PER DOMANDA:</span>
              <span id="lobby-timer-sublabel" class="timer-sublabel">${this.timeLimit} Secondi</span>
            </div>
            <div class="timer-chips-group">
              <button type="button" class="timer-chip ${this.timeLimit === 5 ? 'active' : ''}" onclick="window.quizApp.setTimeLimit(5, this)"><span class="chip-sec">5s</span> <span class="chip-name">Flash</span></button>
              <button type="button" class="timer-chip ${this.timeLimit === 10 ? 'active' : ''}" onclick="window.quizApp.setTimeLimit(10, this)"><span class="chip-sec">10s</span> <span class="chip-name">Standard</span></button>
              <button type="button" class="timer-chip ${this.timeLimit === 15 ? 'active' : ''}" onclick="window.quizApp.setTimeLimit(15, this)"><span class="chip-sec">15s</span> <span class="chip-name">Riflessivo</span></button>
              <button type="button" class="timer-chip ${this.timeLimit === 20 ? 'active' : ''}" onclick="window.quizApp.setTimeLimit(20, this)"><span class="chip-sec">20s</span> <span class="chip-name">Esteso</span></button>
            </div>
          </div>

          <div class="lobby-actions">
            <button id="lobby-start-btn" class="btn-primary-action" onclick="window.quizApp.startGame()">
              Avvia la Sessione (${this.totalQuestions} Domande · ${this.timeLimit}s ciascuna)
            </button>
          </div>
        </div>
      `;
    }
    
    // Inizializza WebRTC per consentire connessioni su reti diverse (4G/5G/Wi-Fi)
    this.syncHub.initWebRTC(true, (ready, id) => {
      console.log('[WebRTC Host] Connessione mesh per 21 partecipanti:', ready, id);
    });

    // Genera URL di connessione per gli studenti
    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const joinUrl = (window.quizApp && window.quizApp.currentJoinUrl) 
      ? window.quizApp.currentJoinUrl 
      : `${baseUrl}?mode=player&room=${this.roomCode}`;
    
    // Genera QR Code
    QRCodeGenerator.generate(joinUrl, 'qr-canvas-holder', 200);

    const roomPinEl = document.getElementById('room-pin-display');
    if (roomPinEl) roomPinEl.textContent = this.roomCode;
    
    const joinUrlEl = document.getElementById('join-url-text');
    if (joinUrlEl) joinUrlEl.textContent = joinUrl;

    // Notifica tutti i client connessi che la stanza è tornata in Lobby
    this.syncHub.broadcast('GAME_RESET', {
      roomCode: this.roomCode
    });

    this.renderLobbyPlayers();
  }

  kickPlayer(id) {
    if (this.players.has(id)) {
      const p = this.players.get(id);
      this.players.delete(id);
      
      // Notifica tutti e disconnetti il partecipante
      this.syncHub.broadcast('PLAYER_KICKED', {
        playerId: id,
        name: p ? p.name : ''
      });

      this.syncHub.broadcast('PLAYER_LIST_UPDATE', {
        players: Array.from(this.players.values())
      });

      this.renderLobbyPlayers();
      SFX.playTone(250, 'sawtooth', 0.15, 0.08);
    }
  }

  renderLobbyPlayers(playersList) {
    const container = document.getElementById('lobby-player-grid');
    const countBadge = document.getElementById('lobby-player-count');
    if (!container) return;

    const list = playersList || Array.from(this.players.values());
    if (countBadge) countBadge.textContent = `${list.length} Partecipanti`;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="lobby-empty-hint">
          <p>In attesa che gli studenti effettuino la scansione del codice QR...</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(p => {
      return `
        <div class="lobby-player-pill animate-pop">
          <div class="lobby-avatar-wrap">${this.renderAvatarHTML(p.avatar, 36)}</div>
          <span class="player-name">${this.escapeHtml(p.name)}</span>
          ${this.isHost ? `
            <button class="btn-kick-player" onclick="event.stopPropagation(); window.quizApp.kickPlayer('${p.id}')" title="Espelli ${this.escapeHtml(p.name)}">&times;</button>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  startGame() {
    if (this.players.size === 0) {
      // Se nessun giocatore è connesso, aggiungi automaticamente il giocatore host locale
      this.addPlayer('host_player', 'Relatore (Host)', 'HO');
    }

    // Mescola e prendi 10 domande
    const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
    this.currentQuestions = shuffled.slice(0, Math.min(this.totalQuestions, shuffled.length));
    this.currentQuestionIdx = 0;

    this.syncHub.broadcast('GAME_START', {
      totalQuestions: this.currentQuestions.length,
      roomCode: this.roomCode
    });

    this.showNextQuestion();
  }

  showNextQuestion() {
    if (this.currentQuestionIdx >= this.currentQuestions.length) {
      this.endGame();
      return;
    }

    this.gameState = 'QUESTION';
    const q = this.currentQuestions[this.currentQuestionIdx];
    this.timeLeft = this.timeLimit;

    // Reset stato risposte giocatori per questo turno
    this.players.forEach(p => {
      p.answered = false;
      p.isCorrect = false;
      p.lastAnswerTime = 0;
    });

    // Simulazione risposte casuali dei bot
    this.simulateBotAnswers(q.corretta);

    // Renderizza schermata domanda Host
    this.renderQuestionHost(q);

    // Trasmetti domanda ai client smartphone
    this.syncHub.broadcast('QUESTION_NEXT', {
      idx: this.currentQuestionIdx + 1,
      total: this.currentQuestions.length,
      domanda: q.domanda,
      opzioni: q.opzioni,
      timeLimit: this.timeLimit
    });

    // Avvia Timer da 10s
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    const timerBar = document.getElementById('quiz-timer-bar');
    const timerSec = document.getElementById('quiz-timer-sec');

    const startTime = Date.now();
    const duration = this.timeLimit * 1000;

    SFX.playTone(600, 'sine', 0.1, 0.08);

    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      this.timeLeft = (remaining / 1000).toFixed(1);

      if (timerBar) {
        const percent = (remaining / duration) * 100;
        timerBar.style.width = `${percent}%`;
        if (percent < 30) {
          timerBar.classList.add('danger');
        } else {
          timerBar.classList.remove('danger');
        }
      }

      if (timerSec) {
        timerSec.textContent = Math.ceil(this.timeLeft);
      }

      // Effetti sonori di countdown negli ultimi 3 secondi
      if (Math.ceil(this.timeLeft) <= 3 && Math.ceil(this.timeLeft) > 0) {
        SFX.urgentTick();
      } else {
        SFX.tick();
      }

      // Se tutti hanno risposto o il tempo è scaduto
      const allAnswered = Array.from(this.players.values()).every(p => p.answered);
      if (remaining <= 0 || (allAnswered && this.players.size > 0)) {
        clearInterval(this.timerInterval);
        this.evaluateQuestionEnd();
      }
    }, 200);
  }

  recordPlayerAnswer(playerId, answerIdx, timeTaken) {
    const player = this.players.get(playerId);
    if (!player || player.answered) return;

    const currentQ = this.currentQuestions[this.currentQuestionIdx];
    const isCorrect = (answerIdx === currentQ.corretta);
    player.answered = true;
    player.isCorrect = isCorrect;
    player.lastAnswerIdx = answerIdx;
    player.lastAnswerTime = timeTaken;

    if (isCorrect) {
      player.correctCount++;
      player.streak++;

      // 1. Streak & Multiplier System (Stile Kahoot)
      let streakMultiplier = 1;
      let streakBonusText = "";
      if (player.streak === 2) {
        streakMultiplier = 1.2;
        streakBonusText = "2x Combo";
      } else if (player.streak === 3) {
        streakMultiplier = 1.5;
        streakBonusText = "3x Fuoco";
      } else if (player.streak >= 4) {
        streakMultiplier = 2.0;
        streakBonusText = `${player.streak}x Super Combo!`;
      }

      // Calcolo Punti: 500 base + velocità (fino a 500) moltiplicato per lo Streak
      const speedFraction = Math.max(0, (this.timeLimit - timeTaken) / this.timeLimit);
      const basePoints = Math.round(500 + (500 * speedFraction));
      const totalPoints = Math.round(basePoints * streakMultiplier);
      
      player.score += totalPoints;
      player.lastPoints = totalPoints;
      player.streakMultiplier = streakMultiplier;
      player.streakBonusText = streakBonusText;
    } else {
      player.streak = 0;
      player.lastPoints = 0;
      player.streakMultiplier = 1;
      player.streakBonusText = "";
    }

    this.updateHostAnswerCounter();
  }

  simulateBotAnswers(correctIdx) {
    this.players.forEach(p => {
      if (p.id.startsWith('bot_')) {
        // I bot rispondono con tempi variabili in base alla durata del timer
        const maxBotTime = (this.timeLimit * 0.85) * 1000;
        const minBotTime = Math.min(1800, this.timeLimit * 250);
        const delay = minBotTime + Math.random() * (maxBotTime - minBotTime);
        setTimeout(() => {
          if (this.gameState === 'QUESTION') {
            const isLucky = Math.random() > 0.25; // 75% probabilità di risposta esatta
            const ans = isLucky ? correctIdx : (correctIdx + 1) % 4;
            this.recordPlayerAnswer(p.id, ans, delay / 1000);
          }
        }, delay);
      }
    });
  }

  updateHostAnswerCounter() {
    const counter = document.getElementById('host-answer-count');
    if (counter) {
      const answered = Array.from(this.players.values()).filter(p => p.answered).length;
      counter.textContent = `${answered} / ${this.players.size} risposte`;
    }
  }

  evaluateQuestionEnd() {
    this.gameState = 'ANSWER_REVEAL';
    const q = this.currentQuestions[this.currentQuestionIdx];

    // Calcolo Distribuzione delle Risposte della Classe (Grafico a Barre)
    const distribution = [0, 0, 0, 0];
    this.players.forEach(p => {
      if (p.answered && p.lastAnswerIdx !== undefined && p.lastAnswerIdx >= 0 && p.lastAnswerIdx <= 3) {
        distribution[p.lastAnswerIdx]++;
      } else if (p.answered && p.isCorrect) {
        distribution[q.corretta]++;
      }
    });

    // Trasmetti fine domanda a tutti i client
    this.syncHub.broadcast('QUESTION_END', {
      corretta: q.corretta,
      spiegazione: q.spiegazione,
      distribution: distribution,
      players: Array.from(this.players.values())
    });

    this.renderAnswerRevealHost(q, distribution);
  }

  renderQuestionHost(q) {
    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    const kahootColors = ['var(--kahoot-red)', 'var(--kahoot-blue)', 'var(--kahoot-yellow)', 'var(--kahoot-green)'];
    const kahootIcons = ['[A]', '[B]', '[C]', '[D]'];

    container.innerHTML = `
      <div class="quiz-host-view animate-fade-in">
        <div class="quiz-top-bar">
          <div class="q-progress">Domanda ${this.currentQuestionIdx + 1} di ${this.currentQuestions.length}</div>
          <div class="q-timer-circle">
            <span id="quiz-timer-sec">${this.timeLimit}</span>s
          </div>
          <div class="q-answers-counter" id="host-answer-count">0 / ${this.players.size} risposte</div>
        </div>

        <div class="quiz-timer-progress">
          <div id="quiz-timer-bar" class="timer-bar-fill" style="width: 100%;"></div>
        </div>

        <div class="quiz-question-card">
          <h2 class="quiz-question-text">${this.escapeHtml(q.domanda)}</h2>
        </div>

        <div class="quiz-options-grid">
          ${q.opzioni.map((opt, i) => `
            <button class="quiz-option-btn opt-${i}" onclick="window.quizApp.onHostOptionClick(${i})" style="--btn-color: ${kahootColors[i]}">
              <span class="opt-icon">${kahootIcons[i]}</span>
              <span class="opt-text">${this.escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderAnswerRevealHost(q, distribution = [0, 0, 0, 0]) {
    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    const kahootColors = ['var(--kahoot-red)', 'var(--kahoot-blue)', 'var(--kahoot-yellow)', 'var(--kahoot-green)'];
    const kahootIcons = ['A', 'B', 'C', 'D'];
    const totalAnswers = distribution.reduce((a, b) => a + b, 0);
    const totalCountForPct = totalAnswers > 0 ? totalAnswers : 1;

    container.innerHTML = `
      <div class="quiz-reveal-view animate-pop">
        <div class="reveal-header">
          <div class="reveal-badge-wrap">
            <span class="reveal-badge">Riepilogo Turno ${this.currentQuestionIdx + 1} / ${this.currentQuestions.length}</span>
            <span class="reveal-players-badge">${totalAnswers} risposte registrate</span>
          </div>
          <h2 class="reveal-question">${this.escapeHtml(q.domanda)}</h2>
        </div>

        <!-- 2. Grafico a Barre delle Risposte della Classe in Tempo Reale -->
        <div class="class-distribution-box animate-slide-up">
          <div class="distrib-header">
            <div class="distrib-title">
              <span>Distribuzione Risposte della Classe</span>
            </div>
            <div class="distrib-total">
              ${totalAnswers > 0 ? `<strong>${totalAnswers}</strong> studenti hanno risposto` : 'Nessuna risposta ricevuta nel tempo'}
            </div>
          </div>
          <div class="distrib-bars-grid">
            ${distribution.map((count, idx) => {
              const pct = Math.round((count / totalCountForPct) * 100);
              const isCorrect = (idx === q.corretta);
              const optText = q.opzioni[idx] || '';
              return `
                <div class="distrib-bar-col opt-${idx} ${isCorrect ? 'is-correct-bar' : ''}">
                  <div class="bar-header-info">
                    <span class="bar-count-tag">${count}</span>
                    <span class="bar-pct-tag">${pct}%</span>
                  </div>
                  <div class="bar-fill-track">
                    <div class="bar-fill-inner" style="height: ${count > 0 ? Math.max(16, pct) : 0}%;">
                      ${count > 0 ? `<span class="bar-inner-num">${count}</span>` : ''}
                    </div>
                  </div>
                  <div class="bar-footer-badge">
                    <span class="bar-letter-tag">${kahootIcons[idx]}</span>
                    <span class="bar-status-text">${isCorrect ? 'Corretta' : 'Opzione ' + kahootIcons[idx]}</span>
                  </div>
                  <div class="bar-opt-tooltip" title="${this.escapeHtml(optText)}">
                    ${this.escapeHtml(optText.length > 30 ? optText.slice(0, 30) + '...' : optText)}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="quiz-options-grid reveal-mode">
          ${q.opzioni.map((opt, i) => `
            <div class="quiz-option-btn opt-${i} ${i === q.corretta ? 'is-correct-reveal' : 'is-wrong-reveal'}" style="--btn-color: ${kahootColors[i]}">
              <span class="opt-icon">[${kahootIcons[i]}]</span>
              <span class="opt-text">${this.escapeHtml(opt)}</span>
              ${i === q.corretta ? '<span class="check-mark">ESATTA</span>' : '<span class="cross-mark">ERRATA</span>'}
            </div>
          `).join('')}
        </div>

        <div class="didactic-explanation-card">
          <div class="explanation-title">Nota Didattica di Approfondimento:</div>
          <p class="explanation-body">${this.escapeHtml(q.spiegazione)}</p>
        </div>

        <div class="reveal-actions">
          <button class="btn-primary-action btn-next-q" onclick="window.quizApp.showLeaderboard()">
            Visualizza Classifica del Turno
          </button>
        </div>
      </div>
    `;

    SFX.playTone(587.33, 'triangle', 0.2, 0.1);
  }

  showLeaderboard() {
    this.gameState = 'LEADERBOARD';
    const sorted = Array.from(this.players.values()).sort((a, b) => b.score - a.score);

    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    container.innerHTML = `
      <div class="quiz-leaderboard-view animate-fade-in">
        <div class="leaderboard-header">
          <h2>Classifica Parziale — Turno ${this.currentQuestionIdx + 1} di ${this.currentQuestions.length}</h2>
        </div>

        <div class="leaderboard-list">
          ${sorted.slice(0, 5).map((p, idx) => {
            return `
              <div class="leaderboard-row rank-${idx + 1} animate-slide-up" style="animation-delay: ${idx * 0.1}s">
                <span class="lb-rank">#${idx + 1}</span>
                <div class="lb-avatar-wrap">${this.renderAvatarHTML(p.avatar, 40)}</div>
                <span class="lb-name">${this.escapeHtml(p.name)}</span>
                ${p.streak > 1 ? `
                  <span class="lb-streak-badge ${p.streak >= 3 ? 'on-fire' : ''}">
                    ${p.streak} di Fila ${p.streakMultiplier > 1 ? `(${p.streakMultiplier}x)` : ''}
                  </span>
                ` : ''}
                <span class="lb-score">${p.score} pt</span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="reveal-actions">
          <button class="btn-primary-action btn-next-q" onclick="window.quizApp.advanceNext()">
            ${this.currentQuestionIdx + 1 >= this.currentQuestions.length ? 'Visualizza Podio Finale' : 'Prossima Domanda'}
          </button>
        </div>
      </div>
    `;
  }

  advanceNext() {
    this.currentQuestionIdx++;
    if (this.currentQuestionIdx >= this.currentQuestions.length) {
      this.endGame();
    } else {
      this.showNextQuestion();
    }
  }

  endGame() {
    this.gameState = 'PODIUM';
    const sorted = Array.from(this.players.values()).sort((a, b) => b.score - a.score);
    const winner = sorted[0] || { name: "Nessun Partecipante", score: 0, avatar: "cat" };
    const p1 = sorted[0];
    const p2 = sorted[1];
    const p3 = sorted[2];

    this.syncHub.broadcast('GAME_OVER', {
      podium: sorted.slice(0, 3),
      allPlayers: sorted
    });

    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    container.innerHTML = `
      <div class="quiz-podium-view animate-pop">
        <div class="podium-confetti-canvas-container" id="confetti-holder"></div>
        <h1 class="podium-main-title">Classifica Finale della Sessione</h1>
        
        <div class="podium-stage">
          ${p2 ? `
            <div class="podium-column silver animate-slide-up" style="animation-delay: 0.3s">
              <div class="podium-avatar-wrap">${this.renderAvatarHTML(p2.avatar, 60)}</div>
              <div class="podium-name">${this.escapeHtml(p2.name)}</div>
              <div class="podium-score">${p2.score} pt</div>
              <div class="podium-block step-2">2° Posto</div>
            </div>
          ` : ''}

          <div class="podium-column gold animate-slide-up" style="animation-delay: 0.1s">
            <div class="podium-avatar-wrap winner-wrap">${this.renderAvatarHTML(p1 ? p1.avatar : winner.avatar, 78)}</div>
            <div class="podium-name winner-name">${this.escapeHtml(p1 ? p1.name : winner.name)}</div>
            <div class="podium-score winner-score">${p1 ? p1.score : winner.score} pt</div>
            <div class="podium-block step-1">1° Posto</div>
          </div>

          ${p3 ? `
            <div class="podium-column bronze animate-slide-up" style="animation-delay: 0.5s">
              <div class="podium-avatar-wrap">${this.renderAvatarHTML(p3.avatar, 56)}</div>
              <div class="podium-name">${this.escapeHtml(p3.name)}</div>
              <div class="podium-score">${p3.score} pt</div>
              <div class="podium-block step-3">3° Posto</div>
            </div>
          ` : ''}
        </div>

        <div class="podium-actions">
          <button class="btn-primary-action" onclick="window.quizApp.restartGame()">
            Nuova Sessione di Verifica
          </button>
          <button class="btn-secondary-action" onclick="window.quizApp.backToScheda()">
            Torna alla Scheda Tecnica
          </button>
        </div>
      </div>
    `;

    SFX.fanfare();
    this.launchConfetti();
  }

  launchConfetti() {
    const holder = document.getElementById('confetti-holder');
    if (!holder) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '50';
    holder.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = holder.clientWidth || window.innerWidth;
    canvas.height = holder.clientHeight || window.innerHeight;

    const pieces = [];
    const colors = ['#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6'];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5
      });
    }

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });

      frames++;
      if (frames < 300) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.QuizEngine = QuizEngine;
window.SFX = SFX;
