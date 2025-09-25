var lista = document.querySelectorAll('.nav li');
function activarLink() {
    lista.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}

lista.forEach((item) =>
    item.addEventListener('mouseover', activarLink));


//funcion mostrar el menu 
var toggle = document.querySelector('.toggle');
var nav= document.querySelector('.nav');
var container= document.querySelector('.container');

toggle.onclick =function() {
    nav.classList.toggle('active');
    container.classList.toggle('active');
}

// Funcionalidad responsive adicional
function handleResponsive() {
    const width = window.innerWidth;
    
    // En móvil, iniciamos con el menú colapsado
    if (width <= 768) {
        if (!nav.classList.contains('active')) {
            nav.classList.add('active');
            container.classList.add('active');
        }
    } else {
        // En desktop, iniciamos con el menú expandido
        nav.classList.remove('active');
        container.classList.remove('active');
    }
}

// Ejecutar al cargar la página
window.addEventListener('load', handleResponsive);

// Ejecutar al redimensionar la ventana
window.addEventListener('resize', handleResponsive);

// Mejorar accesibilidad del toggle
toggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
    }
});

// Cerrar menú al hacer click en un enlace en móvil
function cerrarMenuEnMovil() {
    if (window.innerWidth <= 768) {
        nav.classList.add('active');
        container.classList.add('active');
    }
}