/**
 * Multi-Network Realtime Server for Émile Zola Web App & Live Kahoot-style Quiz
 * Supporta:
 * 1. Tunnel Pubblico su Internet (localtunnel / cloudflare) per connessioni 4G / 5G / Wi-Fi diversi
 * 2. Rete Locale (Wi-Fi d'istituto / Hotspot)
 * 3. Sincronizzazione in tempo reale per 21+ studenti contemporanei
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, exec } = require('child_process');

const PORT = 3000;
const BASE_DIR = __dirname;
let publicTunnelUrl = null;

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

// Trova l'indirizzo IP locale (Wi-Fi / LAN / Hotspot)
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

// Memoria condivisa per sincronizzazione real-time
let activeRoomState = {
  roomCode: 'ZOLA-1885',
  gameState: 'LOBBY',
  players: [],
  currentQuestion: null,
  lastEvent: null,
  timestamp: Date.now()
};

// Creazione Server HTTP
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Info Server e Connessioni (Locale e Pubblica 4G/5G)
  if (req.url === '/api/server-info') {
    const activeUrl = publicTunnelUrl || `http://${localIP}:${PORT}`;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      localIP: localIP,
      port: PORT,
      publicUrl: publicTunnelUrl,
      activeUrl: activeUrl,
      playerUrl: `${activeUrl}?mode=player&room=${activeRoomState.roomCode}`
    }));
    return;
  }

  // API Sincronizzazione Realtime tra Dispositivi
  if (req.url === '/api/sync' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const msg = JSON.parse(body);
        if (msg.type === 'STATE_UPDATE') {
          activeRoomState = Object.assign(activeRoomState, msg.payload, { timestamp: Date.now() });
        } else if (msg.type === 'PLAYER_JOIN') {
          if (!activeRoomState.players.some(p => p.id === msg.payload.id)) {
            activeRoomState.players.push(msg.payload);
          }
          activeRoomState.lastEvent = msg;
          activeRoomState.timestamp = Date.now();
        } else if (msg.type === 'PLAYER_KICKED') {
          activeRoomState.players = activeRoomState.players.filter(p => p.id !== msg.payload.playerId);
          activeRoomState.lastEvent = msg;
          activeRoomState.timestamp = Date.now();
        } else {
          activeRoomState.lastEvent = msg;
          activeRoomState.timestamp = Date.now();
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, state: activeRoomState }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  if (req.url.startsWith('/api/sync-pull')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ state: activeRoomState }));
    return;
  }

  // Gestione File Statici
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(BASE_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 File Non Trovato');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Errore Server: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Avvio Tunnel Pubblico per connessioni 4G / 5G / Reti multiple
function startPublicTunnel() {
  try {
    const tunnel = spawn('npx', ['-y', 'localtunnel', '--port', String(PORT)], {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    tunnel.stdout.on('data', data => {
      const text = data.toString();
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.loca\.lt/);
      if (match) {
        publicTunnelUrl = match[0];
        console.log('----------------------------------------------------------------');
        console.log(`[LINK PUBBLICO ONLINE (4G / 5G / Qualsiasi Rete)]:`);
        console.log(`==> ${publicTunnelUrl}`);
        console.log(`==> Per gli studenti: ${publicTunnelUrl}?mode=player&room=${activeRoomState.roomCode}`);
        console.log('----------------------------------------------------------------');
      }
    });

    tunnel.on('error', () => {
      console.log('[INFO] Tunnel pubblico non disponibile, utilizzo rete Wi-Fi locale.');
    });
  } catch (e) {
    console.log('[INFO] Modalità rete locale attiva.');
  }
}

server.listen(PORT, '0.0.0.0', () => {
  console.log('================================================================');
  console.log('   SERVER MULTI-RETE AVVIATO — ÉMILE ZOLA SCHEDA & QUIZ LIVE    ');
  console.log('================================================================');
  console.log(`[PC Proiettore / Host]:  http://localhost:${PORT}`);
  console.log(`[Rete Locale Wi-Fi]:     http://${localIP}:${PORT}`);
  console.log('Avvio del collegamento pubblico per connessioni dati 4G/5G...');
  console.log('================================================================');

  startPublicTunnel();

  const startCmd = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
  exec(`${startCmd} http://localhost:${PORT}`);
});
