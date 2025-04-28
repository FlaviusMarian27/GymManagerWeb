const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container    = document.getElementById('container');
const registerForm = document.getElementById('registerForm');
const loginForm    = document.getElementById('loginForm');
const roleSelect   = document.getElementById('role');

signUpButton?.addEventListener('click',  () => container.classList.add("right-panel-active"));
signInButton?.addEventListener('click', () => container.classList.remove("right-panel-active"));

// -- Register --
registerForm?.addEventListener('submit', e => {
  e.preventDefault();
  const [usernameInput, emailInput, passwordInput] = registerForm.querySelectorAll('input');
  const user = {
    username: usernameInput.value.trim(),
    email:    emailInput.value.trim(),
    password: passwordInput.value,
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

// -- Login --
loginForm?.addEventListener('submit', e => {
  e.preventDefault();
  const [usernameInput, passwordInput] = loginForm.querySelectorAll('input');
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) {
    return alert('Completează toate câmpurile!');
  }
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user  = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return alert('Nume de utilizator sau parolă incorectă!');
  }
  // **Consistent key** here:
  localStorage.setItem('currentUser', JSON.stringify(user));
  const dest = user.role === 'Client'
             ? 'dashboard_client.html'
             : 'dashboard_antrenor.html';
  window.location.href = dest;
});
