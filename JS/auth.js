const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container    = document.getElementById('container');
const registerForm = document.getElementById('registerForm');
const loginForm    = document.getElementById('loginForm');
const roleSelect   = document.getElementById('role');

if (signUpButton && signInButton && container) {
  signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
  signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));
}

// ─── Registration ─────────────────────────────────────────────
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = registerForm.querySelectorAll('input');
    const user   = {
      username: inputs[0].value.trim(),
      email:    inputs[1].value.trim(),
      password: inputs[2].value,
      role:     roleSelect.value
    };

    if (!user.username || !user.email || !user.password || !user.role) {
      return alert('Completează toate câmpurile!');
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === user.email)) {
      return alert('Există deja un cont cu acest email.');
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cont creat cu succes! Te rugăm să te autentifici.');
    container.classList.remove("right-panel-active");
  });
}

// ─── Login ───────────────────────────────────────────────────
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs   = loginForm.querySelectorAll('input');
    const username = inputs[0].value.trim();
    const password = inputs[1].value;

    if (!username || !password) {
      return alert('Completează toate câmpurile!');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user  = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return alert('Nume de utilizator sau parolă incorectă!');
    }

    // store under a single key:
    localStorage.setItem('currentUser', JSON.stringify(user));
    const dest = user.role === 'Client' ? 'dashboard_client.html' : 'dashboard_antrenor.html';
    window.location.href = dest;
  });
}
