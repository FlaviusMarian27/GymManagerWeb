// ─── Logout button ────────────────────────────────────────────
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}

// ─── Displaying the user ─────────────────────────────────────
const user = JSON.parse(localStorage.getItem('currentUser'));
if (user) {
  document.getElementById('usernamePlaceholder').textContent = user.username;
} else {
  window.location.href = 'login.html';
}
