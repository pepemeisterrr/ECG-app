const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  loadEcgData: () => ipcRenderer.invoke('load-ecg-data'),
  saveEcgData: (data) => ipcRenderer.invoke('save-ecg-data', data)
})