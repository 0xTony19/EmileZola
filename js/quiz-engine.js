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

  getAvatarData(avatarKey) {
    const list = window.QUIZ_AVATARS || [];
    const found = list.find(a => a.id === avatarKey || a.badge === avatarKey);
    if (found) return found;
    return {
      id: 'custom',
      badge: typeof avatarKey === 'string' && avatarKey ? avatarKey.slice(0, 2).toUpperCase() : 'ST',
      color: '#475569',
      name: 'Studente'
    };
  }

  addPlayer(id, name, avatar = 'zola') {
    if (!this.players.has(id)) {
      this.players.set(id, {
        id,
        name: name || `Studente_${id.slice(0, 4)}`,
        avatar: avatar || 'zola',
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
    const demoNames = [
      { name: "Chiara (Liceo)", avatar: "zola" },
      { name: "Marco (Voreux)", avatar: "minatore" },
      { name: "Elena (Médan)", avatar: "giornalista" },
      { name: "Giacomo (Dreyfus)", avatar: "tribuno" }
    ];
    demoNames.forEach((bot, idx) => {
      this.addPlayer(`bot_${idx}`, bot.name, bot.avatar);
    });
    this.renderLobbyPlayers();
  }

  startLobby() {
    this.gameState = 'LOBBY';
    this.isHost = true;
    this.syncHub.isHost = true;
    
    // Inizializza WebRTC per consentire connessioni su reti diverse (4G/5G/Wi-Fi)
    this.syncHub.initWebRTC(true, (ready, id) => {
      console.log('[WebRTC Host] Connessione mesh per 21 partecipanti:', ready, id);
    });

    // Genera URL di connessione per gli studenti
    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const joinUrl = `${baseUrl}?mode=player&room=${this.roomCode}`;
    
    // Genera QR Code
    QRCodeGenerator.generate(joinUrl, 'qr-canvas-holder', 200);

    const roomPinEl = document.getElementById('room-pin-display');
    if (roomPinEl) roomPinEl.textContent = this.roomCode;
    
    const joinUrlEl = document.getElementById('join-url-text');
    if (joinUrlEl) joinUrlEl.textContent = joinUrl;

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
      const av = this.getAvatarData(p.avatar);
      return `
        <div class="lobby-player-pill animate-pop">
          <span class="player-avatar-badge" style="background: ${av.color}; color: #ffffff;">${av.badge}</span>
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
    player.lastAnswerTime = timeTaken;

    if (isCorrect) {
      player.correctCount++;
      player.streak++;
      // Calcolo Punti: 500 base + fino a 500 per velocità + bonus streak
      const speedFraction = Math.max(0, (10 - timeTaken) / 10);
      const points = Math.round(500 + (500 * speedFraction) + (player.streak * 50));
      player.score += points;
      player.lastPoints = points;
    } else {
      player.streak = 0;
      player.lastPoints = 0;
    }

    this.updateHostAnswerCounter();
  }

  simulateBotAnswers(correctIdx) {
    this.players.forEach(p => {
      if (p.id.startsWith('bot_')) {
        // I bot rispondono con tempi variabili tra 2.0s e 8.5s
        const delay = 2000 + Math.random() * 6500;
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

    // Trasmetti fine domanda
    this.syncHub.broadcast('QUESTION_END', {
      corretta: q.corretta,
      spiegazione: q.spiegazione,
      players: Array.from(this.players.values())
    });

    this.renderAnswerRevealHost(q);
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
            <span id="quiz-timer-sec">10</span>s
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

  renderAnswerRevealHost(q) {
    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    const kahootColors = ['var(--kahoot-red)', 'var(--kahoot-blue)', 'var(--kahoot-yellow)', 'var(--kahoot-green)'];
    const kahootIcons = ['[A]', '[B]', '[C]', '[D]'];

    container.innerHTML = `
      <div class="quiz-reveal-view animate-pop">
        <div class="reveal-header">
          <span class="reveal-badge">Tempo Scaduto</span>
          <h2 class="reveal-question">${this.escapeHtml(q.domanda)}</h2>
        </div>

        <div class="quiz-options-grid reveal-mode">
          ${q.opzioni.map((opt, i) => `
            <div class="quiz-option-btn opt-${i} ${i === q.corretta ? 'is-correct-reveal' : 'is-wrong-reveal'}" style="--btn-color: ${kahootColors[i]}">
              <span class="opt-icon">${kahootIcons[i]}</span>
              <span class="opt-text">${this.escapeHtml(opt)}</span>
              ${i === q.corretta ? '<span class="check-mark">CORRETTA</span>' : '<span class="cross-mark">ERRATA</span>'}
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
            const av = this.getAvatarData(p.avatar);
            return `
              <div class="leaderboard-row rank-${idx + 1} animate-slide-up" style="animation-delay: ${idx * 0.1}s">
                <span class="lb-rank">#${idx + 1}</span>
                <span class="lb-avatar-badge" style="background: ${av.color}; color: #ffffff;">${av.badge}</span>
                <span class="lb-name">${this.escapeHtml(p.name)}</span>
                ${p.streak > 1 ? `<span class="lb-streak">Serie: ${p.streak}</span>` : ''}
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
    const winner = sorted[0] || { name: "Nessun Partecipante", score: 0, avatar: "zola" };
    const p1 = sorted[0];
    const p2 = sorted[1];
    const p3 = sorted[2];

    const av1 = p1 ? this.getAvatarData(p1.avatar) : { badge: 'EZ', color: '#be123c' };
    const av2 = p2 ? this.getAvatarData(p2.avatar) : null;
    const av3 = p3 ? this.getAvatarData(p3.avatar) : null;

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
              <div class="podium-avatar-badge" style="background: ${av2.color}; color: #ffffff;">${av2.badge}</div>
              <div class="podium-name">${this.escapeHtml(p2.name)}</div>
              <div class="podium-score">${p2.score} pt</div>
              <div class="podium-block step-2">2° Posto</div>
            </div>
          ` : ''}

          <div class="podium-column gold animate-slide-up" style="animation-delay: 0.1s">
            <div class="podium-avatar-badge winner-avatar" style="background: ${av1.color}; color: #ffffff;">${av1.badge}</div>
            <div class="podium-name winner-name">${this.escapeHtml(p1 ? p1.name : winner.name)}</div>
            <div class="podium-score winner-score">${p1 ? p1.score : winner.score} pt</div>
            <div class="podium-block step-1">1° Posto</div>
          </div>

          ${p3 ? `
            <div class="podium-column bronze animate-slide-up" style="animation-delay: 0.5s">
              <div class="podium-avatar-badge" style="background: ${av3.color}; color: #ffffff;">${av3.badge}</div>
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
