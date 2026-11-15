// Face pachetul pentru subdomeniu din calculatorul pregătit pentru offline (desktop/).
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); const out = path.join(root, 'web-dist');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out);
fs.cpSync(path.join(root, 'desktop', 'lib'), path.join(out, 'lib'), { recursive: true });
for (const f of ['manifest.json', 'sw.js', 'icon-192.png']) fs.copyFileSync(path.join(__dirname, f), path.join(out, f));
let html = fs.readFileSync(path.join(root, 'desktop', 'index.html'), 'utf8');
html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<link rel="manifest" href="manifest.json"><link rel="icon" href="icon-192.png"><link rel="apple-touch-icon" href="icon-192.png"><meta name="theme-color" content="#151718">');
html = html.replace(/<\/html>\s*$/, `<script>if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});</script>\n</html>\n`);
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.writeFileSync(path.join(out, '.htaccess'), 'DirectoryIndex index.html\nAddType application/manifest+json .json\n<IfModule mod_headers.c>\n<FilesMatch "(sw\\.js|index\\.html)$">\n  Header set Cache-Control "no-cache"\n</FilesMatch>\n</IfModule>\n');
console.log('pachet web gata:', fs.readdirSync(out).join(', '));
