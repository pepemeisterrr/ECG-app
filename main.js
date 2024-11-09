const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    win.loadFile('index.html');
}

app.on('ready', createWindow);

// Load CSV Data
ipcMain.handle('load-csv', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: 'CSV Files', extensions: ['csv'] }],
        properties: ['openFile']
    });

    if (canceled || filePaths.length === 0) return null;

    const csvData = fs.readFileSync(filePaths[0], 'utf-8');
    return csvData;
});
