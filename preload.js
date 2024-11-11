const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload script loaded');
});

contextBridge.exposeInMainWorld('electronAPI', {
    loginUser: (userData) => ipcRenderer.send('login-user', userData),
    registerUser: (userData) => ipcRenderer.send('register-user', userData),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});
