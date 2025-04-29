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

// Cand apasa pe butonul "Solicita serviciul" de la Nutritie
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
    plansSection.style.display = "grid"; 
  } else {
    plansSection.style.display = "none";

    // Scroll smooth catre sectiunea servicii
    const serviciiSection = document.getElementById('servicii');
    if (serviciiSection) {
      serviciiSection.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Datele pentru fiecare plan
const nutritionPlans = {
  "Mic Dejun Sănătos": {
    image: "IMAGES/omleta.jpg",
    ingredients: "Ovăz, fructe, iaurt grecesc, semințe chia",
    preparation: "Amestecă ingredientele și lasă la frigider 1 oră.",
    values: "350 kcal | 20g proteine | 40g carbohidrați"
  },
  "Gustare Fitness": {
    image: "IMAGES/gustare_fitness.jpg",
    ingredients: "Migdale, smoothie proteic, fructe de pădure",
    preparation: "Consumă-le ca gustare între mese.",
    values: "250 kcal | 15g proteine | 18g carbohidrați"
  },
  "Prânz Echilibrat": {
    image: "IMAGES/pranz_echilibrat.jpg",
    ingredients: "Pui grill, orez brun, broccoli",
    preparation: "Grătar pui, fierbe orezul, aburește broccoli.",
    values: "600 kcal | 45g proteine | 50g carbohidrați"
  },
  // ... ȘI CONTINUI AȘA PENTRU CELELALTE PLANURI
};

// Deschide Modalul
function openNutritionModal(planName) {
  const modal = document.getElementById('nutritionModal');
  const plan = nutritionPlans[planName];

  if (plan) {
    document.getElementById('nutritionImage').src = plan.image;
    document.getElementById('nutritionTitle').textContent = planName;
    document.getElementById('nutritionDetails').textContent = "Ingrediente & Mod preparare: " + plan.preparation;
    document.getElementById('nutritionValues').textContent = plan.values;
    modal.style.display = "block";
  }
}

// Închide Modalul
function closeNutritionModal() {
  document.getElementById('nutritionModal').style.display = "none";
}

// Legare click pe plan-card
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').innerText;
    openNutritionModal(title);
  });
});
