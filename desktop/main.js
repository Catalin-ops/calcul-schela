const { app, BrowserWindow, ipcMain, dialog, clipboard, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 920, minWidth: 380, minHeight: 600,
    title: 'Calcul Schelă – Giovani Construct',
    icon: path.join(__dirname, 'icon.ico'),
    backgroundColor: '#151718',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'index.html'));
  // linkurile externe se deschid în browser
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); } });
  // F11 ecran complet, Ctrl+P raport PDF, Ctrl +/- zoom
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') win.setFullScreen(!win.isFullScreen());
    if (input.control && (input.key === '=' || input.key === '+')) win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.5);
    if (input.control && input.key === '-') win.webContents.setZoomLevel(win.webContents.getZoomLevel() - 0.5);
    if (input.control && input.key === '0') win.webContents.setZoomLevel(0);
  });
}

ipcMain.handle('copy', (_e, text) => { clipboard.writeText(String(text || '')); return true; });

ipcMain.handle('print', async (e, title) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const safe = String(title || 'proiect').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 80);
  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: 'Salvează raportul pentru schelar',
    defaultPath: path.join(app.getPath('documents'), `Raport schela - ${safe}.pdf`),
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  });
  if (canceled || !filePath) return false;
  const data = await e.sender.printToPDF({ pageSize: 'A3', landscape: true, printBackground: true, preferCSSPageSize: true });
  fs.writeFileSync(filePath, data);
  shell.openPath(filePath);
  return true;
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
