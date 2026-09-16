/**
 * Hybrid Real-Time Synchronization Engine for Émile Zola Quiz Arena
 * Supporta:
 * 1. WebRTC Cloud P2P tramite PeerJS (permette a tutti i 21 studenti su 4G/5G/Wi-Fi diversi di connettersi senza problemi)
 * 2. HTTP Server Sync (/api/sync & /api/sync-pull per server Node.js locale / tunnel)
 * 3. BroadcastChannel & LocalStorage (per testing multi-scheda sullo stesso computer)
 */

// Generatore QR Code ISO standard
const QRCodeGenerator = {
  instance: null,

  generate: function(text, canvasId, size = 220) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Pulisci canvas precedente
    const parent = canvas.parentElement;
    if (!parent) return;

    parent.innerHTML = '<div id="qr-container-target" style="display:inline-block; padding:8px; background:#ffffff; border-radius:8px;"></div>';
    const target = document.getElementById('qr-container-target');

    if (window.QRCode && target) {
      try {
        new window.QRCode(target, {
          width: size,
          height: size,
          text: text,
          colorDark: "#0f172a",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.M
        });
      } catch (e) {
        console.error("Errore generazione QR Code:", e);
      }
    }
  }
};

// Hub di Sincronizzazione Ibrido Multi-Rete (WebRTC + HTTP + Local)
class SyncHub {
  constructor(roomCode) {
    this.roomCode = (roomCode || 'ZOLA-1885').toUpperCase();
    this.channelName = `zola_quiz_${this.roomCode}`;
    this.listeners = [];
    this.isHost = false;
    this.isHttpServer = (window.location.protocol.startsWith('http'));
    this.pollInterval = null;

    // WebRTC PeerJS state
    this.peer = null;
    this.peerConnections = new Map(); // id -> connection (per l'Host)
    this.hostConn = null; // connection all'Host (per i Client smartphone)
    this.peerId = null;

    // 1. BroadcastChannel per test locali multi-tab
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => this.handleIncomingMessage(event.data);
      } catch (e) {}
    }

    // 2. Storage Event (fallback multi-tab)
    window.addEventListener('storage', (event) => {
      if (event.key === this.channelName && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          this.handleIncomingMessage(data);
        } catch (e) {}
      }
    });

    // 3. Polling server se su HTTP
    if (this.isHttpServer) {
      this.startHttpServerPolling();
    }
  }

  // Inizializza WebRTC PeerJS
  initWebRTC(isHost, onReadyCallback) {
    this.isHost = isHost;
    const PeerClass = window.Peer;

    if (!PeerClass) {
      console.warn('[SyncHub] PeerJS non trovato, utilizzo fallback HTTP/Broadcast.');
      if (onReadyCallback) onReadyCallback(false);
      return;
    }

    const hostPeerId = `zola-quiz-host-${this.roomCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    try {
      if (this.isHost) {
        // L'Host si registra con un PeerID deterministico legato al PIN della stanza
        this.peer = new PeerClass(hostPeerId, {
          debug: 0,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' }
            ]
          }
        });

        this.peer.on('open', (id) => {
          this.peerId = id;
          console.log('[SyncHub Host] WebRTC Pronto. Peer ID:', id);
          if (onReadyCallback) onReadyCallback(true, id);
        });

        this.peer.on('connection', (conn) => {
          this.setupHostConnection(conn);
        });

        this.peer.on('error', (err) => {
          console.warn('[SyncHub Host Peer Error]', err.type || err);
          if (err.type === 'unavailable-id') {
            this.peer = new PeerClass();
          }
        });

      } else {
        // Il Client smartphone si connette all'Host
        this.peer = new PeerClass(null, {
          debug: 0,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' }
            ]
          }
        });

        this.peer.on('open', (id) => {
          this.peerId = id;
          this.connectToHostPeer(hostPeerId);
          if (onReadyCallback) onReadyCallback(true, id);
        });

        this.peer.on('error', (err) => {
          console.warn('[SyncHub Client Peer Error]', err);
        });
      }
    } catch (e) {
      console.warn('[SyncHub WebRTC Init Failed]', e);
      if (onReadyCallback) onReadyCallback(false);
    }
  }

  // Gestione connessione in entrata lato Host
  setupHostConnection(conn) {
    conn.on('open', () => {
      this.peerConnections.set(conn.peer, conn);
    });

    conn.on('data', (data) => {
      this.handleIncomingMessage(data);
    });

    conn.on('close', () => {
      this.peerConnections.delete(conn.peer);
    });

    conn.on('error', () => {
      this.peerConnections.delete(conn.peer);
    });
  }

  // Connessione lato Client allo smartphone dell'Host
  connectToHostPeer(hostPeerId) {
    if (!this.peer) return;
    try {
      this.hostConn = this.peer.connect(hostPeerId, { reliable: true });

      this.hostConn.on('open', () => {
        console.log('[SyncHub Client] Connesso con successo al server Host WebRTC');
      });

      this.hostConn.on('data', (data) => {
        this.handleIncomingMessage(data);
      });

      this.hostConn.on('close', () => {
        setTimeout(() => this.connectToHostPeer(hostPeerId), 3000);
      });
    } catch (e) {
      console.warn('[SyncHub connectToHostPeer failed]', e);
    }
  }

  on(eventType, callback) {
    this.listeners.push({ eventType, callback });
  }

  // Trasmette il messaggio su tutti i canali attivi
  broadcast(type, payload = {}) {
    const message = {
      type,
      payload,
      roomCode: this.roomCode,
      sender: this.isHost ? 'HOST' : (payload.playerId || payload.id || 'PLAYER'),
      timestamp: Date.now()
    };

    // 1. WebRTC DataChannel (Ultra-veloce tra reti diverse)
    if (this.isHost) {
      this.peerConnections.forEach((conn) => {
        if (conn && conn.open) {
          try { conn.send(message); } catch (e) {}
        }
      });
    } else if (this.hostConn && this.hostConn.open) {
      try { this.hostConn.send(message); } catch (e) {}
    }

    // 2. BroadcastChannel locale
    if (this.channel) {
      try { this.channel.postMessage(message); } catch (e) {}
    }

    // 3. Storage event locale
    try {
      localStorage.setItem(this.channelName, JSON.stringify(message));
    } catch (e) {}

    // 4. HTTP POST Server locale / tunnel
    if (this.isHttpServer) {
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      }).catch(() => {});
    }

    return message;
  }

  startHttpServerPolling() {
    let lastProcessedTimestamp = Date.now();
    this.pollInterval = setInterval(() => {
      fetch('/api/sync-pull')
        .then(res => res.json())
        .then(data => {
          if (data && data.state && data.state.lastEvent) {
            const ev = data.state.lastEvent;
            if (ev.timestamp > lastProcessedTimestamp) {
              lastProcessedTimestamp = ev.timestamp;
              this.handleIncomingMessage(ev);
            }
          }
        })
        .catch(() => {});
    }, 350);
  }

  handleIncomingMessage(message) {
    if (!message || message.roomCode !== this.roomCode) return;
    this.listeners
      .filter(l => l.eventType === '*' || l.eventType === message.type)
      .forEach(l => {
        try { l.callback(message.payload, message); } catch (e) { console.error(e); }
      });
  }
}

window.QRCodeGenerator = QRCodeGenerator;
window.SyncHub = SyncHub;
