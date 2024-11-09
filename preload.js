const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    loadCsv: () => ipcRenderer.invoke('load-csv')
});
