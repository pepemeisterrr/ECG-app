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

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    window.electronAPI.loginUser({ email, password });
}

window.electronAPI.receive('registration-success', (message) => {
    alert(message);
    showTab('login');
});

window.electronAPI.receive('registration-failed', (message) => {
    alert(message);
});

window.electronAPI.receive('login-success', (message) => {
    alert(message);
});

window.electronAPI.receive('login-failed', (message) => {
    alert(message);
});
