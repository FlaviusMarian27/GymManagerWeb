const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Selectam elementele de formular
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const roleSelect = document.getElementById("roleSelect");

// Functie pentru salvarea unui utilizator nou
function saveUser(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Functie pentru gasirea unui utilizator dupa email si parola
function findUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find(
    (user) => user.email === email && user.password === password
  );
}

// VALIDARE formular Sign Up
function validateRegisterForm(username, email, password, role) {
  if (!username || !email || !password || !role) {
    alert("Completeaza toate campurile!");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Introdu un email valid!");
    return false;
  }

  if (password.length < 6) {
    alert("Parola trebuie sa aiba minim 6 caractere!");
    return false;
  }

  return true;
}

// Eveniment: Creare cont (Register)
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = registerForm.querySelector("input[placeholder='Nume utilizator']").value;
    const email = registerForm.querySelector("input[placeholder='Email']").value;
    const password = registerForm.querySelector("input[placeholder='Parola']").value;
    const role = roleSelect.value;

    if (!validateRegisterForm(username, email, password, role)) return;

    const user = { username, email, password, role };
    saveUser(user);

    alert("Cont creat cu succes! Te poti loga acum.");
    window.location.reload();
  });
}

// Eveniment: Logare (Sign In)
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector("input[placeholder='Email']").value;
    const password = loginForm.querySelector("input[placeholder='Parola']").value;

    const user = findUser(email, password);

    if (user) {
      alert(`Bine ai revenit, ${user.username}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirectionare dupa rol
      if (user.role === "client") {
        window.location.href = "dashboard_client.html";
      } else if (user.role === "antrenor") {
        window.location.href = "dashboard_antrenor.html";
      }
    } else {
      alert("Email sau parola incorecta!");
    }
  });
}

