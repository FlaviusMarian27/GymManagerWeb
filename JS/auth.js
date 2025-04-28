const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container    = document.getElementById('container');

signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));

const registerForm = document.getElementById('registerForm');
const loginForm    = document.getElementById('loginForm');
const roleSelect   = document.getElementById('role');        // id="role" în HTML

// Înregistrare
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs   = registerForm.querySelectorAll('input');
    const user     = {
      username: inputs[0].value.trim(),
      email:    inputs[1].value.trim(),
      password: inputs[2].value,
      role:     roleSelect.value
    };
    if (!user.username || !user.email || !user.password || !user.role) {
      alert('Completează toate câmpurile!');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === user.email)) {
      alert('Există deja un cont cu acest email.');
      return;
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cont creat cu succes! Te rugăm să te autentifici.');
    location.reload();
  });
}

// Autentificare
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs   = loginForm.querySelectorAll('input');
    const username = inputs[0].value.trim();
    const password = inputs[1].value;
    if (!username || !password) {
      alert('Completează toate câmpurile!');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user  = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert('Nume de utilizator sau parolă incorectă!');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    const dest = user.role === 'Client' ? 'dashboard_client.html' : 'dashboard_antrenor.html';
    window.location.href = dest;
  });
}
