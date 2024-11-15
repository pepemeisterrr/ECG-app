const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let currentUser = null; // Переменная для хранения текущего пользователя

// Путь к файлу для сохранения данных пользователей в проекте
const userDataPath = path.join(__dirname, 'users.json');

// Функция для чтения данных пользователей
function readUserData() {
  if (fs.existsSync(userDataPath)) {
    const data = fs.readFileSync(userDataPath, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

// Функция для записи данных пользователей
function writeUserData(data) {
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2));
}

// Создание окна приложения
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

// Обработка событий приложения
app.on('ready', () => {
  app.commandLine.appendSwitch('disable-gpu'); // Отключение GPU для устранения ошибок
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Регистрация событий IPC
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

ipcMain.on('login-user', (event, userData) => {
  const users = readUserData();
  if (users[userData.email] && users[userData.email].password === userData.password) {
    currentUser = userData.email;
    event.reply('login-success', 'Вход выполнен успешно!');
  } else {
    event.reply('login-failed', 'Неверный email или пароль.');
  }
});

ipcMain.on('logout-user', (event) => {
  currentUser = null;
  event.reply('logout-success', 'Вы успешно вышли из аккаунта.');
});

