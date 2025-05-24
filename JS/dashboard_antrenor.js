// FRONTEND/JS/dashboard_antrenor.js

// ─── 1. AUTENTIFICARE & LOGOUT ─────────────────────────────────
const tokenKey = 'token';
const userKey  = 'username';
const roleKey  = 'role';
const userIdKey = 'userId';

window.addEventListener('DOMContentLoaded', () => {
  // Verificăm token-ul și rolul
  const token = localStorage.getItem(tokenKey);
  const role  = localStorage.getItem(roleKey);
  if (!token || role !== 'Antrenor') {
    window.location.href = 'login.html';
    return;
  }

  // Afișăm username-ul
  const username = localStorage.getItem(userKey) || '';
  const el = document.getElementById('usernamePlaceholder');
  if (el) el.textContent = username;

  // Inițializăm secțiunile
  setupSmoothScroll();
  setupNutrition();
  setupGrupe();
  // Se pot adăuga Afișare Cereri de la clienți aici
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  [tokenKey, userKey, roleKey, userIdKey].forEach(k => localStorage.removeItem(k));
  window.location.href = 'login.html';
});

// ─── 2. NAV & SERVICII (smooth scroll) ────────────────────────
function setupSmoothScroll() {
  document.querySelector('a[href="#servicii"]')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
  });
}

// ─── 3. NUTRIȚIE (toggle + scroll + modal) ─────────────────────
function setupNutrition() {
  const btn  = document.getElementById('nutritieBtn');
  const sec  = document.getElementById('nutritie-plans');
  const plans = {
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

  btn?.addEventListener('click', () => {
    sec.style.display = 'grid';
    sec.scrollIntoView({ behavior: 'smooth' });
  });

  window.togglePlans = () => {
    const isOpen = sec.style.display === 'grid';
    sec.style.display = isOpen ? 'none' : 'grid';
    (isOpen ? document.getElementById('servicii') : sec)
      .scrollIntoView({ behavior: 'smooth' });
  };

  // Modal
  document.querySelectorAll('#nutritie-plans .plan-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').innerText;
      const p = plans[title];
      if (!p) return;
      document.getElementById('nutritionImage').src = p.image;
      document.getElementById('nutritionTitle').textContent = title;
      document.getElementById('nutritionDetails').textContent = p.preparation;
      document.getElementById('nutritionValues').textContent = p.values;
      document.getElementById('nutritionModal').style.display = 'block';
    });
  });
  window.closeNutritionModal = () => document.getElementById('nutritionModal').style.display = 'none';
}

// ─── 4. GRUPE (toggle + scroll + modal) ───────────────────────
function setupGrupe() {
  const btn  = document.getElementById('grupeBtn');
  const sec  = document.getElementById('grupe-section');
  const info = {
    forta:    { image: './IMAGES/gym1.jpg', title: 'Clasă de Forță',    descriere: 'Antrenamente cu greutăți pentru definirea musculaturii.', info: 'Durată: 60 min | Nivel: Mediu - Avansat' },
    cardio:   { image: './IMAGES/gym2.jpg', title: 'Cardio Power',      descriere: 'Sesiune de intensitate crescută pentru arderea grăsimilor.', info: 'Durată: 45 min | Nivel: Începător - Avansat' },
    relaxare: { image: './IMAGES/gym3.jpg', title: 'Stretch & Relax',   descriere: 'Relaxare musculară și reducerea stresului.',          info: 'Durată: 40 min | Nivel: Toate nivelurile' },
    hiit:     { image: './IMAGES/gym4.jpg', title: 'HIIT Challenge',    descriere: 'Exerciții scurte și explozive pentru rezultate rapide.', info: 'Durată: 30 min | Nivel: Intens' }
  };

  btn?.addEventListener('click', () => {
    sec.style.display = 'grid';
    sec.scrollIntoView({ behavior: 'smooth' });
  });

  window.toggleGrupe = () => {
    const isOpen = sec.style.display === 'grid';
    sec.style.display = isOpen ? 'none' : 'grid';
    (isOpen ? document.getElementById('servicii') : sec)
      .scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('#grupe-section .plan-card[data-group]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.group;
      const d = info[key];
      if (!d) return;
      document.getElementById('grupeImage').src = d.image;
      document.getElementById('grupeTitle').textContent = d.title;
      document.getElementById('grupeDescriere').textContent = d.descriere;
      document.getElementById('grupeInfo').textContent = d.info;
      document.getElementById('grupeModal').style.display = 'block';
    });
  });
  window.closeGrupeModal = () => document.getElementById('grupeModal').style.display = 'none';
}

// ─── 5. ANTRENORI VIZUALIZARE (DOAR PROFIL) ───────────────────

// Funcția principală pentru încărcat toți antrenorii
async function fetchAndRenderTrainers() {
  const container = document.getElementById('antrenoriContainer');
  container.innerHTML = '<p style="color:white">Se încarcă antrenorii...</p>';

  try {
    const res = await fetch('/api/auth/trainers', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
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

// Deschide modalul cu profilul antrenorului
function openAntrenorModal(trainer) {
  document.getElementById('antrenorImg').src       = './IMAGES/default_profile.png';
  document.getElementById('antrenorNume').textContent  = trainer.username;
  document.getElementById('antrenorEmail').textContent = trainer.email;
  document.getElementById('antrenorModal').style.display = 'block';
}

function closeAntrenorModal() {
  document.getElementById('antrenorModal').style.display = 'none';
}

// Deschide/închide secțiunea de antrenori
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
function inchideAntrenori() {
  const sec = document.getElementById('select-antrenor');
  sec.style.display = 'none';
  document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
}

// Fac funcțiile vizibile pentru butoane onclick din HTML
window.openAntrenorModal  = openAntrenorModal;
window.closeAntrenorModal = closeAntrenorModal;
window.toggleAntrenori    = toggleAntrenori;
window.inchideAntrenori   = inchideAntrenori;

// ─── 6. Solicitarile Clienților (Placeholder) ────────────────────
// Afișează cererile primite de la clienți în secțiunea dedicată
async function afiseazaCereri() {
  const token = localStorage.getItem(tokenKey);
  try {
    const res = await fetch('/api/auth/requests', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Nu am putut încărca cererile');
    const requests = await res.json();
    const container = document.getElementById('requestsContainer');
    if (!container) return;
    container.innerHTML = '';
    requests.forEach(r => {
      // r.client poate fi obiect sau id; adaptează după model
      const div = document.createElement('div');
      div.className = 'cerere-item';
      div.textContent = `Client: ${r.client.username || r.client} — Status: ${r.status}`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// Apelează placeholder-ul la încărcare (dacă există containerul)
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('requestsContainer')) {
    afiseazaCereri();
  }
});

// ─── 7. Notificări Cereri Client - Clopoțel în Navbar ──────
document.getElementById('notif-bell').addEventListener('click', function (e) {
  e.preventDefault();
  const dropdown = document.getElementById('notif-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  fetchNotifications();
});

// Închide dropdown dacă dai click în afara lui
async function fetchNotifications() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch('/api/auth/requests', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const dropdown = document.getElementById('notif-dropdown');
    dropdown.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      dropdown.innerHTML = "<p style='color:#ffe43b;margin:0;text-align:center;'>Nu ai cereri noi în așteptare.</p>";
    } else {
      data.forEach(req => {
        let actionHtml = "";
        if (req.status === "În așteptare") {
          actionHtml = `
            <div class="notif-actions">
              <button class="notif-btn accept" onclick="acceptRequestNotif('${req._id}', this)">Acceptă</button>
              <button class="notif-btn reject" onclick="rejectRequestNotif('${req._id}', this)">Refuză</button>
            </div>
          `;
        } else if (req.status === "Acceptat") {
          actionHtml = `<span style="color:#32cd32;font-weight:bold;">Acceptat</span>`;
        } else if (req.status === "Refuzat") {
          actionHtml = `<span style="color:#ef4444;font-weight:bold;">Refuzat</span>`;
        }
        dropdown.innerHTML += `
          <div class="notif-request">
            <span class="client-name">${req.client?.username || req.client?.name || 'Client'}</span>
            ${actionHtml}
          </div>
        `;
      });
    }

    // Badge cu număr de cereri în așteptare
    const notifCount = document.getElementById('notif-count');
    const pending = data.filter(r => r.status === "În așteptare").length;
    notifCount.innerText = pending;
    notifCount.style.display = pending > 0 ? 'inline-block' : 'none';

  } catch (err) {
    console.error(err);
  }
}

async function acceptRequestNotif(id, btn) {
  if (btn.disabled) return;
  btn.disabled = true;
  const parent = btn.parentElement;
  const rejectBtn = parent.querySelector('.reject');
  if (rejectBtn) rejectBtn.disabled = true;
  
  const token = localStorage.getItem('token'); // <-- ia tokenul
  await fetch(`/api/auth/requests/accept/${id}`, { 
    method: "PATCH",
    headers: { 'Authorization': `Bearer ${token}` } // <-- PUNE TOKENUL!
  });
  parent.innerHTML = `<span style="color:#32cd32;font-weight:bold;">Acceptat</span>`;
}

async function rejectRequestNotif(id, btn) {
  if (btn.disabled) return;
  btn.disabled = true;
  const parent = btn.parentElement;
  const acceptBtn = parent.querySelector('.accept');
  if (acceptBtn) acceptBtn.disabled = true;

  const token = localStorage.getItem('token'); // <-- ia tokenul
  await fetch(`/api/auth/requests/reject/${id}`, { 
    method: "PATCH",
    headers: { 'Authorization': `Bearer ${token}` } // <-- PUNE TOKENUL!
  });
  parent.innerHTML = `<span style="color:#ef4444;font-weight:bold;">Refuzat</span>`;
}

// La încărcarea paginii, arată badge-ul dacă există cereri noi
window.addEventListener('DOMContentLoaded', () => {
  fetchNotifications();
});
