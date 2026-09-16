# Server Locale in Python per Émile Zola Web App
import http.server
import socketserver
import socket
import os
import webbrowser

PORT = 3000

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # non invia dati reali, serve solo per scoprire l'IP locale associato alla scheda di rete
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

local_ip = get_local_ip()
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
    print("================================================================")
    print("       SERVER LOCALE PYTHON AVVIATO — ÉMILE ZOLA               ")
    print("================================================================")
    print(f"[PC Proiettore]:        http://localhost:{PORT}")
    print(f"[Smartphone Studenti]: http://{local_ip}:{PORT}")
    print("================================================================")
    webbrowser.open(f"http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer arrestato.")
