function showTab(tabId) {
  document.getElementById('realtime').style.display = tabId === 'realtime' ? 'block' : 'none';
  document.getElementById('history').style.display = tabId === 'history' ? 'block' : 'none';
}
// Открытие и закрытие форм
function showForm(formType) {
    document.getElementById(`${formType}Form`).style.display = 'flex';
}
function closeForm(formType) {
    document.getElementById(`${formType}Form`).style.display = 'none';
}
// Инициализация графика ЭКГ
const canvas = document.getElementById('ecg-canvas');
const ctx = canvas.getContext('2d');

function drawStaticECG() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i += 5) {
    ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.05) * 20);
  }
  ctx.strokeStyle = '#00f';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
// Обновление индикатора авторизации!
function updateStatusIndicator(isOnline) {
    const indicator = document.getElementById('user-status-indicator');
    indicator.textContent = isOnline ? 'Online' : 'Offline';
    indicator.className = isOnline ? 'online' : 'offline';
}

// Регистрация пользователя
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (!email || !password) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

  window.electronAPI.registerUser({ email, password });
}

// Логин пользователя
function loginUser(event) {
  event.preventDefault(); // Отключаем стандартное поведение формы
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Пожалуйста, заполните все поля.'); // Проверяем, что данные введены
    return;
  }

  // Отправляем данные в main.js
  window.electronAPI.loginUser({ email, password });
}


// Logout пользователя
function logoutUser() {
  window.electronAPI.logoutUser();
}

// Обработчики сообщений из main.js
window.electronAPI.receive('registration-success', (message) => {
  alert(message);
  closeForm('register');
  updateStatusIndicator(true);
});

window.electronAPI.receive('registration-failed', (message) => {
  alert(message);
});

window.electronAPI.receive('login-success', (message) => {
  alert(message);
  closeForm('login');
  updateStatusIndicator(true);
});

window.electronAPI.receive('login-failed', (message) => {
  alert(message);
});

window.electronAPI.receive('logout-success', (message) => {
  alert(message);
  updateStatusIndicator(false);
});

drawStaticECG();
