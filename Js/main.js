const usersKey = "users";

function switchToRegister() {
  document.getElementById("loginContainer").classList.add("hidden");
  document.getElementById("registerContainer").classList.remove("hidden");
  clearInputs();
}

function switchToLogin() {
  document.getElementById("registerContainer").classList.add("hidden");
  document.getElementById("loginContainer").classList.remove("hidden");
  clearInputs();
}

function register() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const message = document.getElementById("registerMessage");

  if (!username || !password) {
    message.textContent = "Por favor, complete todos los campos.";
    return;
  }

  let users = JSON.parse(localStorage.getItem(usersKey)) || [];
  if (users.find(user => user.username === username)) {
    message.textContent = "El usuario ya existe.";
    return;
  }

  users.push({ username, password });
  localStorage.setItem(usersKey, JSON.stringify(users));
  message.textContent = "Registro exitoso. Por favor, inicie sesión.";
  clearInputs();
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("loginMessage");

  if (!username || !password) {
    message.textContent = "Por favor, complete todos los campos.";
    return;
  }

  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert("Inicio de sesión exitoso.");
    window.location.href = "index.html";
  } else {
    message.textContent = "Usuario o contraseña incorrectos.";
  }
}

function clearInputs() {
  // Limpiar campos del formulario de registro
  document.getElementById("registerUsername").value = "";
  document.getElementById("registerPassword").value = "";
  document.getElementById("registerMessage").textContent = "";

  // Limpiar campos del formulario de inicio de sesión
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginMessage").textContent = "";
}

// Limpiar campos al cargar o recargar la página
window.onload = clearInputs;

// Limpiar campos al volver a mostrar la página desde el historial del navegador
window.onpageshow = function(event) {
  if (event.persisted) {
    clearInputs();
  }
};