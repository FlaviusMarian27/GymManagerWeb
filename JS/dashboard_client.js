// FRONTEND/JS/dashboard_client.js

// ─── 1. AUTENTIFICARE & LOGOUT ─────────────────────────────────
const tokenKey = 'token';
const userKey  = 'username';
const roleKey  = 'role';

// Helper pentru HEADERE cu token
function getAuthHeaders() {
  const token = localStorage.getItem(tokenKey);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// la încărcarea paginii:
window.addEventListener('DOMContentLoaded', () => {
  // 1. Verificăm token-ul
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // 2. Afișăm username
  const username = localStorage.getItem(userKey) || '';
  const userEl = document.getElementById('usernamePlaceholder');
  if (userEl) userEl.textContent = username;
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
  localStorage.removeItem(roleKey);
  window.location.href = 'login.html';
});

// ─── 2. SERVICII (scroll & toggle) ──────────────────────────────
// „Servicii” în nav:
document.querySelector('a[href="#servicii"]')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
});

// ─── 3. NUTRIȚIE ────────────────────────────────────────────────
const nutritionPlans = {
  "Mic Dejun Sănătos": {
    image: "./IMAGES/ovaz.png",
    preparation: "Amestecă ingredientele și lasă la frigider 1 oră.",
    values: "350 kcal | 20g proteine | 40g carbohidrați"
  },
  "Gustare Fitness": {
    image: "./IMAGES/smoothie.png",
    preparation: "Consumă-le ca gustare între mese.",
    values: "250 kcal | 15g proteine | 18g carbohidrați"
  },
  "Prânz Echilibrat": {
    image: "./IMAGES/pui_orez_legume.png",
    preparation: "Grătar pui, fierbe orez, aburește broccoli.",
    values: "600 kcal | 45g proteine | 50g carbohidrați"
  },
  "Cină Ușoară": {
    image: "./IMAGES/tonsalad.png",
    preparation: "Amestecă ingredientele într-o salată rapidă.",
    values: "400 kcal | 35g proteine | 20g carbohidrați"
  },
  "Mic Dejun Fresh Cut": {
    image: "./IMAGES/tartine.png",
    preparation: "Ou poșat pe tartine cu avocado.",
    values: "360 kcal | 17g proteine | 28g carbohidrați"
  },
  "Gustare Rapidă Bulk": {
    image: "./IMAGES/budinca_chia.jpg",
    preparation: "Budincă de chia hidratată peste noapte.",
    values: "320 kcal | 10g proteine | 35g carbohidrați"
  },
  "Prânz Sportiv Cut": {
    image: "./IMAGES/oua_fierte_cu_ton.jpg",
    preparation: "Salată rece cu ton și ouă fierte.",
    values: "480 kcal | 42g proteine | 15g carbohidrați"
  },
  "Cină Rebuild Bulk": {
    image: "./IMAGES/cartofi_dulci_cu_vita.jpg",
    preparation: "Cartofi dulci copți + vită rumenită.",
    values: "550 kcal | 38g proteine | 45g carbohidrați"
  },
  "Mic Dejun Energetic": {
    image: "./IMAGES/toast_oua_rosii.jpg",
    preparation: "Toast integral cu ouă ochiuri și roșii.",
    values: "400 kcal | 22g proteine | 30g carbohidrați"
  },
  "Gustare Proteică": {
    image: "./IMAGES/iaurt_in.jpg",
    preparation: "Iaurt grecesc + unt de arahide + semințe de in.",
    values: "310 kcal | 20g proteine | 12g carbohidrați"
  },
  "Prânz Vegan": {
    image: "./IMAGES/quinoa.jpg",
    preparation: "Quinoa cu năut, spanac și dressing de lămâie.",
    values: "500 kcal | 25g proteine | 45g carbohidrați"
  },
  "Cină pentru Slăbit": {
    image: "./IMAGES/peste_sparanghel.jpg",
    preparation: "Pește alb + sparanghel coapte la cuptor.",
    values: "390 kcal | 35g proteine | 18g carbohidrați"
  }
};

// afișare planuri și scroll către secțiune
document.getElementById('nutritieBtn')?.addEventListener('click', () => {
  const el = document.getElementById('nutritie-plans');
  el.style.display = 'grid';
  el.scrollIntoView({ behavior: 'smooth' });
});

// click pe fiecare card
document.querySelectorAll('#nutritie-plans .plan-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').innerText;
    const p     = nutritionPlans[title];
    if (!p) return;
    document.getElementById('nutritionImage').src          = p.image;
    document.getElementById('nutritionTitle').textContent   = title;
    document.getElementById('nutritionDetails').textContent = p.preparation;
    document.getElementById('nutritionValues').textContent  = p.values;
    document.getElementById('nutritionModal').style.display = 'block';
  });
});

// buton „Ascunde Planurile” și închidere modal
window.togglePlans = () => {
  const el = document.getElementById('nutritie-plans');
  const isGrid = el.style.display === 'grid';
  if (isGrid) {
    el.style.display = 'none';
    document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
  } else {
    el.style.display = 'grid';
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
window.closeNutritionModal = () => {
  document.getElementById('nutritionModal').style.display = 'none';
};


// ─── 4. GRUPE ─────────────────────────────────────────────────
const groupInfo = {
  forta: {
    image: './IMAGES/gym1.jpg',
    title: 'Clasă de Forță',
    descriere: 'Antrenamente cu greutăți pentru definirea musculaturii.',
    info: 'Durată: 60 min | Nivel: Mediu - Avansat'
  },
  cardio: {
    image: './IMAGES/gym2.jpg',
    title: 'Cardio Power',
    descriere: 'Sesiune de intensitate crescută pentru arderea grăsimilor.',
    info: 'Durată: 45 min | Nivel: Începător - Avansat'
  },
  relaxare: {
    image: './IMAGES/gym3.jpg',
    title: 'Stretch & Relax',
    descriere: 'Relaxare musculară și reducerea stresului.',
    info: 'Durată: 40 min | Nivel: Toate nivelurile'
  },
  hiit: {
    image: './IMAGES/gym4.jpg',
    title: 'HIIT Challenge',
    descriere: 'Exerciții scurte și explozive pentru rezultate rapide.',
    info: 'Durată: 30 min | Nivel: Intens'
  }
};

document.getElementById('grupeBtn')?.addEventListener('click', () => {
  const el = document.getElementById('grupe-section');
  el.style.display = 'grid';
  el.scrollIntoView({ behavior: 'smooth' });
});

window.openGrupeModal = key => {
  const d = groupInfo[key];
  if (!d) return;
  document.getElementById('grupeImage').src        = d.image;
  document.getElementById('grupeTitle').textContent    = d.title;
  document.getElementById('grupeDescriere').textContent = d.descriere;
  document.getElementById('grupeInfo').textContent      = d.info;
  document.getElementById('grupeModal').style.display   = 'block';
};
window.closeGrupeModal = () => {
  document.getElementById('grupeModal').style.display = 'none';
};

// legăm cardurile
document.querySelectorAll('#grupe-section .plan-card[data-group]').forEach(card => {
  card.addEventListener('click', () => openGrupeModal(card.dataset.group));
});

// toggle Grupe cu scroll
window.toggleGrupe = () => {
  const el = document.getElementById('grupe-section');
  const isGrid = el.style.display === 'grid';
  if (isGrid) {
    el.style.display = 'none';
    document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
  } else {
    el.style.display = 'grid';
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

// ─── 5. ANTRENORI DIN MONGODB (NOUL COD) ───────────────────────
let currentTrainer = null;

async function fetchAndRenderTrainers() {
  const container = document.getElementById('antrenoriContainer');
  container.innerHTML = '<p style="color:white">Se încarcă antrenorii...</p>';

  try {
    const res = await fetch('/api/auth/trainers', {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    });
    if (!res.ok) {
      container.innerHTML = '<p style="color:red">Eroare la încărcare antrenori.</p>';
      return;
    }
    const trainers = await res.json();

    if (!Array.isArray(trainers) || trainers.length === 0) {
      container.innerHTML = '<p style="color:white">Niciun antrenor disponibil momentan.</p>';
      return;
    }

    container.innerHTML = '';
    trainers.forEach(tr => {
      const card = document.createElement('div');
      card.className = 'plan-card';
      card.innerHTML = `
        <h3>${tr.username}</h3>
        <p>${tr.email}</p>
      `;
      card.addEventListener('click', () => openAntrenorModal(tr));
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p style="color:red">Eroare de rețea!</p>';
    console.error('fetchAndRenderTrainers failed:', err);
  }
}

function openAntrenorModal(trainer) {
  currentTrainer = trainer;
  document.getElementById('antrenorImg').src       = './IMAGES/default_profile.png';
  document.getElementById('antrenorNume').textContent  = trainer.username;
  document.getElementById('antrenorEmail').textContent = trainer.email;
  document.getElementById('antrenorModal').style.display = 'block';
}

function closeAntrenorModal() {
  document.getElementById('antrenorModal').style.display = 'none';
}

async function trimiteCerere() {
  if (!currentTrainer) return;
  try {
    const res = await fetch('/api/auth/trainers/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ trainerId: currentTrainer._id })
    });
    
    const data = await res.json();
    if (res.ok) {
      alert(`Cererea a fost trimisă către ${currentTrainer.username}`);
      closeAntrenorModal();
      toggleAntrenori(); // închide secțiunea
    } else {
      alert(data.message || 'Eroare la trimiterea cererii!');
    }
  } catch (err) {
    alert('Nu s-a putut trimite cererea!');
    console.error('trimiteCerere failed:', err);
  }
}

// ─── 6. TOGGLE SECȚIUNE ANTORENORI ─────────────────────────────
function toggleAntrenori() {
  const sec = document.getElementById('select-antrenor');
  const isOpen = window.getComputedStyle(sec).display !== 'none';

  if (isOpen) {
    sec.style.display = 'none';
    document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
  } else {
    fetchAndRenderTrainers();
    sec.style.display = 'block';
    sec.scrollIntoView({ behavior: 'smooth' });
  }
}

// Legăm funcțiile pentru HTML (onclick)
window.openAntrenorModal  = openAntrenorModal;
window.closeAntrenorModal = closeAntrenorModal;
window.trimiteCerere      = trimiteCerere;
window.toggleAntrenori    = toggleAntrenori;

// 1. Click pe clopoțel: deschide dropdown și ascunde badge-ul
document.getElementById('notif-bell-client').addEventListener('click', async function (e) {
  e.preventDefault();
  const dropdown = document.getElementById('notif-dropdown-client');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

  // Marchează ca văzute pe backend
  const token = localStorage.getItem('token');
  await fetch('/api/auth/requests/client/mark-seen', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  fetchClientNotifications();

  // Ascunde badge-ul la click
  const notifCount = document.getElementById('notif-count-client');
  notifCount.style.display = 'none';
});

// 2. Închide dropdown dacă dai click în afara lui
document.addEventListener('click', function(e) {
  const bell = document.getElementById('notif-bell-client');
  const dropdown = document.getElementById('notif-dropdown-client');
  if (!bell.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// 3. Fetch și populează notificările + badge
async function fetchClientNotifications() {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const res = await fetch('/api/auth/requests/client', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const dropdown = document.getElementById('notif-dropdown-client');
    dropdown.innerHTML = '';

    // NUMĂRĂ doar cererile nevăzute
    let newNotif = 0;

    if (!Array.isArray(data) || data.length === 0) {
      dropdown.innerHTML = "<p style='color:#ffe43b;margin:0;text-align:center;'>Nu ai notificări noi.</p>";
    } else {
      data.forEach(req => {
        let statusHtml = '';
        if (req.status === "Acceptat" && !req.viewedByClient) {
          statusHtml = `<span style="color:#32cd32;font-weight:bold;">Acceptat</span>`;
          newNotif++;
        } else if (req.status === "Refuzat" && !req.viewedByClient) {
          statusHtml = `<span style="color:#ef4444;font-weight:bold;">Refuzat</span>`;
          newNotif++;
        } else if (req.status === "Acceptat" && req.viewedByClient) {
          statusHtml = `<span style="color:#ccc;font-weight:bold;">Acceptat (vizualizat)</span>`;
        } else if (req.status === "Refuzat" && req.viewedByClient) {
          statusHtml = `<span style="color:#ccc;font-weight:bold;">Refuzat (vizualizat)</span>`;
        } else {
          statusHtml = `<span style="color:#ffe43b;font-weight:bold;">În așteptare</span>`;
        }

        dropdown.innerHTML += `
          <div class="notif-request">
            <span style="color:#ffe43b;">Antrenor:</span> <b>${req.trainer?.username || req.trainer?.name || 'Antrenor'}</b>
            <div style="margin-top:2px;">${statusHtml}</div>
          </div>
        `;
      });
    }
    // Badge pentru nevăzute
    const notifCount = document.getElementById('notif-count-client');
    notifCount.innerText = newNotif;
    notifCount.style.display = newNotif > 0 ? 'inline-block' : 'none';

  } catch (err) {
    console.error(err);
  }
}

// 4. La încărcarea paginii, populează notificările și badge-ul
window.addEventListener('DOMContentLoaded', fetchClientNotifications);

