// Verifica daca exista user logat
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Daca exista, afisam numele
if (currentUser) {
  const usernamePlaceholder = document.getElementById("usernamePlaceholder");
  if (usernamePlaceholder) {
    usernamePlaceholder.textContent = currentUser.username;
  }
} else {
  // Daca nu exista user logat, redirectioneaza spre login
  window.location.href = "login.html";
}

// Log Out
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

// Functie pentru click pe poza de profil
function goToProfile() {
  alert("Pagina de profil va fi disponibila in curand!");
}
