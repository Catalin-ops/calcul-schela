const { contextBridge, ipcRenderer } = require('electron');
// aceeași interfață ca în aplicația Android: copiere în clipboard și salvare raport PDF
contextBridge.exposeInMainWorld('AndroidApp', {
  desktop: true,
  copy: (text) => { ipcRenderer.invoke('copy', text); },
  print: (title) => { ipcRenderer.invoke('print', title); }
});
