const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Parse CLI arguments
const args = process.argv.slice(2);
let host = '127.0.0.1';
let port = parseInt(process.env.PORT, 10) || 3000;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--host' || arg === '-H') {
    const next = args[i + 1];
    if (next && !next.startsWith('-')) {
      host = next;
      i++;
    } else {
      host = '0.0.0.0';
    }
  } else if (arg.startsWith('--host=')) {
    host = arg.split('=')[1] || '0.0.0.0';
  } else if (arg === '--port' || arg === '-p') {
    const next = args[i + 1];
    if (next && !isNaN(parseInt(next, 10))) {
      port = parseInt(next, 10);
      i++;
    }
  } else if (arg.startsWith('--port=')) {
    port = parseInt(arg.split('=')[1], 10) || port;
  }
}

// Find local network IPv4 addresses
function getNetworkIps() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        ips.push(net.address);
      }
    }
  }
  return ips;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  
  // Prevent directory traversal
  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Disable caching for development previews
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, host, () => {
  const networkIps = getNetworkIps();
  console.log('\n  Kalpataru Saha Portfolio - Local Development Server\n');
  console.log(`  ➜  Local:   http://localhost:${port}/`);
  
  if (host === '0.0.0.0') {
    if (networkIps.length > 0) {
      networkIps.forEach(ip => {
        console.log(`  ➜  Network: http://${ip}:${port}/`);
      });
    } else {
      console.log(`  ➜  Network: http://<your-network-ip>:${port}/`);
    }
  } else {
    console.log(`  ➜  Network: use --host to expose to local Wi-Fi / LAN`);
  }
  console.log('\n  Ready for preview on desktop and mobile devices.\n');
});
