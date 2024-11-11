const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Функция для создания окна
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
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Путь к файлу для сохранения данных пользователей
const userDataPath = path.join(app.getPath('userData'), 'users.json');

// Функция для чтения данных пользователей
function readUserData() {
  if (fs.existsSync(userDataPath)) {
    const data = fs.readFileSync(userDataPath);
    return JSON.parse(data);
  }
  return {};
}

// Функция для записи данных пользователей
function writeUserData(data) {
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2));
}

// Обработчик регистрации пользователя
ipcMain.on('register-user', (event, userData) => {
  const users = readUserData();
  if (users[userData.email]) {
    event.reply('registration-failed', 'Этот email уже зарегистрирован.');
  } else {
    users[userData.email] = { password: userData.password };
    writeUserData(users);
    event.reply('registration-success', 'Регистрация прошла успешно!');
  }
});

// Обработчик логина пользователя
ipcMain.on('login-user', (event, userData) => {
  const users = readUserData();
  if (users[userData.email] && users[userData.email].password === userData.password) {
    event.reply('login-success', 'Вход выполнен успешно!');
  } else {
    event.reply('login-failed', 'Неверный email или пароль.');
  }
});
