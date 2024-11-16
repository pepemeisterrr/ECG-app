const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loginUser: (userData) => ipcRenderer.send('login-user', userData),
    registerUser: (userData) => ipcRenderer.send('register-user', userData),
    logoutUser: () => ipcRenderer.send('logout-user'),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload script loaded');
});
//привет