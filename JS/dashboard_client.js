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
    image: "IMAGES/ovaz.png",
    ingredients: "Ovăz, fructe, iaurt grecesc, semințe chia",
    preparation: "Amestecă ingredientele și lasă la frigider 1 oră.",
    values: "350 kcal | 20g proteine | 40g carbohidrați"
  },
  "Gustare Fitness": {
    image: "IMAGES/smoothie.png",
    ingredients: "Migdale, smoothie proteic, fructe de pădure",
    preparation: "Consumă-le ca gustare între mese.",
    values: "250 kcal | 15g proteine | 18g carbohidrați"
  },
  "Prânz Echilibrat": {
    image: "IMAGES/pui_orez_legume.png",
    ingredients: "Pui grill, orez brun, broccoli",
    preparation: "Grătar pui, fierbe orezul, aburește broccoli.",
    values: "600 kcal | 45g proteine | 50g carbohidrați"
  },
  "Cină Ușoară": {
    image: "IMAGES/tonsalad.png",
    ingredients: "Ton, avocado, legume crude",
    preparation: "Amestecă ingredientele într-o salată rapidă.",
    values: "400 kcal | 35g proteine | 20g carbohidrați"
  },
  "Mic Dejun Fresh Cut": {
    image: "IMAGES/tartine.png",
    ingredients: "Avocado, pâine integrală, ou",
    preparation: "Prepară oul poșat, așază pe tartine cu avocado.",
    values: "360 kcal | 17g proteine | 28g carbohidrați"
  },
  "Gustare Rapidă Bulk": {
    image: "IMAGES/budinca_chia.jpg",
    ingredients: "Chia, lapte vegetal, miere",
    preparation: "Lasă la hidratat peste noapte în frigider.",
    values: "320 kcal | 10g proteine | 35g carbohidrați"
  },
  "Prânz Sportiv Cut": {
    image: "IMAGES/oua_fierte_cu_ton.jpg",
    ingredients: "Ton, ouă fierte, salată mixtă",
    preparation: "Combină ingredientele și servește rece.",
    values: "480 kcal | 42g proteine | 15g carbohidrați"
  },
  "Cină Rebuild Bulk": {
    image: "IMAGES/cartofi_dulci_cu_vita.jpg",
    ingredients: "Cartofi dulci, mușchi de vită, condimente",
    preparation: "Coace cartofii, rumenește carnea la tigaie.",
    values: "550 kcal | 38g proteine | 45g carbohidrați"
  },
  "Mic Dejun Energetic": {
    image: "IMAGES/toast_oua_rosii.jpg",
    ingredients: "Toast integral, ouă ochiuri, roșii cherry, avocado",
    preparation: "Prăjește pâinea, adaugă ouăle și legumele.",
    values: "400 kcal | 22g proteine | 30g carbohidrați"
  },
  "Gustare Proteică": {
    image: "IMAGES/iaurt_in.jpg",
    ingredients: "Iaurt grecesc, unt de arahide, semințe de in",
    preparation: "Amestecă și servește imediat.",
    values: "310 kcal | 20g proteine | 12g carbohidrați"
  },
  "Prânz Vegan": {
    image: "IMAGES/quinoa.jpg",
    ingredients: "Quinoa, năut, spanac, dressing de lămâie",
    preparation: "Fierbe quinoa, amestecă toate ingredientele.",
    values: "500 kcal | 25g proteine | 45g carbohidrați"
  },
  "Cină pentru Slăbit": {
    image: "IMAGES/peste_sparanghel.jpg",
    ingredients: "Pește alb, sparanghel, dovlecel",
    preparation: "Coace peștele și legumele la cuptor.",
    values: "390 kcal | 35g proteine | 18g carbohidrați"
  }
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
