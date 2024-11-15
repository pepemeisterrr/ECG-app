// Открытие и закрытие форм
function showForm(formType) {
  document.getElementById(`${formType}Form`).style.display = 'flex';
}

function closeForm(formType) {
  document.getElementById(`${formType}Form`).style.display = 'none';
}

// Обновление индикатора авторизации
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
