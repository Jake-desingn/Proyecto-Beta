let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}
function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
let textoExpandido = false;

function expandirTexto() {
    const info = document.querySelector('.info p');
    const boton = document.querySelector('.info button');
    
    if (!textoExpandido) {
        info.style.maxHeight = 'none';
        info.style.overflow = 'visible';
        boton.textContent = 'Leer Menos';
        textoExpandido = true;
    } else {
        info.style.maxHeight = '25px'; 
        info.style.overflow = 'hidden';
        boton.textContent = 'Leer Más';
        textoExpandido = false;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const boton = document.querySelector('.info button');
    boton.addEventListener('click', expandirTexto);
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Usando EmailJS - primero necesitas crear una cuenta en emailjs.com
    emailjs.init("GB20SfjXHQ4rpYGP2"); // Reemplaza con tu User ID
    
    emailjs.send("service_fm3ick1", "template_zg3ienc", {
        from_email: email,
        message: mensaje,
    }).then(
        function(response) {
            alert("¡Mensaje enviado con éxito!");
            document.getElementById('contactForm').reset();
        },
        function(error) {
            alert("Error al enviar el mensaje. Por favor, intenta de nuevo.");
        }
    );
    
})
// Función para mostrar la ventana emergente
function showPopup(type, title, message) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');

    popupTitle.textContent = title;
    popupMessage.textContent = message;

    if (type === 'success') {
        popup.classList.add('success');
        popup.classList.remove('error');
    } else if (type === 'error') {
        popup.classList.add('error');
        popup.classList.remove('success');
    }

    popup.style.display = 'block';
    overlay.style.display = 'block';
}
const currentUserKey = "currentUser";

// Verificar si hay una sesión activa al cargar la página
window.onload = () => {
    const currentUser = localStorage.getItem(currentUserKey);
    const loginLink = document.getElementById("login");

    if (currentUser) {
        // Si hay usuario logueado, cambiar el texto del botón a "Cerrar Sesión"
        loginLink.textContent = "Cerrar Sesión";
        alert(`Bienvenido`); // Mensaje de bienvenida
        loginLink.onclick = logout;
    } else {
        // Si no hay usuario, redirigir al login
        loginLink.href = "Iniciodesesión.html";
    }
};

function logout() {
    localStorage.removeItem(currentUserKey); // Elimina la sesión
    window.location.href = "Iniciodesesión.html"; // Redirige al login
}
