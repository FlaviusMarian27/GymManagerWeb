// Gestionam butonul de logout
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });
}

// Citim utilizatorul logat
const user = JSON.parse(localStorage.getItem('loggedUser'));

if (user) {
  // Scriem numele în span-ul special
  document.getElementById('usernamePlaceholder').textContent = user.username;
} else {
  // Daca nu e logat corect, redirectionam
  window.location.href = 'login.html';
}

