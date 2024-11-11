// Показ и скрытие вкладок
function showTab(tabId) {
  document.getElementById('realtime').style.display = tabId === 'realtime' ? 'block' : 'none';
  document.getElementById('history').style.display = tabId === 'history' ? 'block' : 'none';
}

// Показ и скрытие форм логина и регистрации
function showForm(formType) {
  document.getElementById(formType + 'Form').style.display = 'flex';
}

function closeForm(formType) {
  document.getElementById(formType + 'Form').style.display = 'none';
}

// Функции для входа и регистрации
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  window.electronAPI.loginUser({ email, password });
}

function registerUser(event) {
  event.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  window.electronAPI.registerUser({ email, password });
}

// Функция для выхода из аккаунта
function logoutUser() {
  window.electronAPI.logoutUser();
  updateStatusIndicator(false);
  document.getElementById('logout-btn').style.display = 'none'; // Скрываем кнопку выхода
  document.querySelector('.auth-buttons').style.display = 'flex'; // Показываем кнопки входа/регистрации
}

// Функция для обновления статуса пользователя
function updateStatusIndicator(isOnline) {
  const indicator = document.getElementById('user-status-indicator');
  indicator.classList.toggle('online', isOnline);
  indicator.classList.toggle('offline', !isOnline);
  document.getElementById('logout-btn').style.display = isOnline ? 'inline-block' : 'none'; // Показываем кнопку выхода, если онлайн
  document.querySelector('.auth-buttons').style.display = isOnline ? 'none' : 'flex'; // Прячем кнопки входа/регистрации, если онлайн
}

// Обработка результатов логина и регистрации
window.electronAPI.receive('registration-success', (message) => {
  alert(message);
  closeForm('register');
  updateStatusIndicator(true);
});

window.electronAPI.receive('registration-failed', (message) => {
  alert(message);
  updateStatusIndicator(false);
});

window.electronAPI.receive('login-success', (message) => {
  alert(message);
  closeForm('login');
  updateStatusIndicator(true);
});

window.electronAPI.receive('login-failed', (message) => {
  alert(message);
  updateStatusIndicator(false);
});

// Обработка выхода из аккаунта
window.electronAPI.receive('logout-success', () => {
  alert('Выход выполнен успешно!');
  updateStatusIndicator(false);
  document.getElementById('logout-btn').style.display = 'none';
  document.querySelector('.auth-buttons').style.display = 'flex';
});

// Отрисовка статического графика ЭКГ
const canvas = document.getElementById('ecg-canvas');
const ctx = canvas.getContext('2d');

function drawStaticECG() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    const y = canvas.height / 2 + Math.sin(i * 0.04) * 20;
    ctx.lineTo(i, y);
  }
  ctx.strokeStyle = '#00f';
  ctx.stroke();
}
drawStaticECG();
