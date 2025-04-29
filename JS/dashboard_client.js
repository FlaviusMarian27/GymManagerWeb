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

// Când apasă pe butonul "Solicită serviciul" de la Nutriție
const nutritieBtn = document.querySelector('#nutritieBtn');
const nutritieSection = document.querySelector('#nutritie-plans');

if (nutritieBtn && nutritieSection) {
  nutritieBtn.addEventListener('click', () => {
    nutritieSection.style.display = 'block';
    window.location.hash = '#nutritie-plans';
  });
}

function togglePlans() {
  const plansSection = document.getElementById('nutritie-plans');
  
  if (plansSection.style.display === "none" || plansSection.style.display === "") {
    plansSection.style.display = "block";
  } else {
    plansSection.style.display = "none";
  }
}
