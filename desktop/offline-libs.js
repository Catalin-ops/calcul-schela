// Rulat la construire (GitHub Actions): pune în aplicație tot ce venea de pe internet,
// ca programul să meargă complet fără conexiune.
const fs = require('fs');
const path = require('path');
const LIB = path.join(__dirname, 'lib');
fs.mkdirSync(path.join(LIB, 'fonts'), { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
async function get(url, bin) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(url + ' -> ' + r.status);
  return bin ? Buffer.from(await r.arrayBuffer()) : await r.text();
}

(async () => {
  // pdf.js – pentru „Deschide proiect din PDF”
  for (const f of ['pdf.min.js', 'pdf.worker.min.js'])
    fs.writeFileSync(path.join(LIB, f), await get('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/' + f, true));

  // fonturile paginii
  const htmlPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const m = html.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com\/[^"]+)">/);
  if (m) {
    let css = await get(m[1].replace(/&amp;/g, '&'));
    const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(x => x[1]))];
    let i = 0;
    for (const u of urls) {
      const name = 'f' + (i++) + path.extname(new URL(u).pathname);
      fs.writeFileSync(path.join(LIB, 'fonts', name), await get(u, true));
      css = css.split(u).join('fonts/' + name);
    }
    fs.writeFileSync(path.join(LIB, 'fonts.css'), css);
    html = html.replace(m[0], '<link rel="stylesheet" href="lib/fonts.css">')
               .replace(/<link rel="preconnect"[^>]*>\s*/g, '');
    fs.writeFileSync(htmlPath, html);
    console.log('fonturi locale:', urls.length);
  }
  console.log('biblioteci offline gata');
})().catch(e => { console.error(e); process.exit(1); });
