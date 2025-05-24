// FRONTEND/JS/auth.js

// ─── Toggle panels Sign In / Sign Up ───────────────────────────
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container    = document.getElementById('container');

signUpButton?.addEventListener('click', () =>
  container.classList.add('right-panel-active')
);
signInButton?.addEventListener('click', () =>
  container.classList.remove('right-panel-active')
);

// ─── REGISTER ───────────────────────────────────────────────────
const registerForm = document.getElementById('registerForm');
const registerBtn  = document.getElementById('registerBtn');

registerBtn?.addEventListener('click', async () => {
  console.log('CLICK pe SIGN UP');
  const username = registerForm.querySelector('input[name="username"]').value.trim();
  const email    = registerForm.querySelector('input[name="email"]').value.trim();
  const password = registerForm.querySelector('input[name="password"]').value;
  const role     = registerForm.querySelector('select[name="role"]').value;
  if (!username || !email || !password || !role) {
    return alert('Completează toate câmpurile!');
  }
  try {
    const res  = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    });
    console.log('➔ POST /register status:', res.status);
    const data = await res.json();
    if (res.ok) {
      alert('Cont creat cu succes! Poți acum să te autentifici.');
      registerForm.reset();
      container.classList.remove('right-panel-active');
    } else {
      alert(data.message || 'Eroare la înregistrare.');
    }
  } catch (err) {
    console.error(err);
    alert('Serverul nu răspunde.');
  }
});

// ─── LOGIN ───────────────────────────────────────────────────────
const loginForm = document.getElementById('loginForm');
const loginBtn  = document.getElementById('loginBtn');

loginBtn?.addEventListener('click', async () => {
  console.log('CLICK pe SIGN IN');
  const email    = loginForm.querySelector('input[name="email"]').value.trim();
  const password = loginForm.querySelector('input[name="password"]').value;
  if (!email || !password) {
    return alert('Completează toate câmpurile!');
  }
  try {
    const res  = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    console.log('➔ POST /login status:', res.status);
    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token',    data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('role',     data.user.role);
      localStorage.setItem('userId',   data.user.id);

      window.location.href =
        data.user.role === 'Client'
          ? 'dashboard_client.html'
          : 'dashboard_antrenor.html';
    } else {
      alert(data.message || 'Eroare la autentificare.');
    }
  } catch (err) {
    console.error(err);
    alert('Serverul nu răspunde.');
  }
});
