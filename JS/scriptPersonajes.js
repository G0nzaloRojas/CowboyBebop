// Código para la animación de scroll
const seccionesOcultas = document.querySelectorAll('.hidden-animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('mostrar', entry.isIntersecting);
    });
}, { threshold: 0.8 });

seccionesOcultas.forEach((seccion) => observer.observe(seccion));

// Código para el botón "Volver Arriba"
const backToTopButton = document.querySelector('.back-to-top');

// Mostrar y ocultar el botón según el desplazamiento
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) { // Ajusta el valor según lo que prefieras
        backToTopButton.classList.add('show'); // Muestra el botón
    } else {
        backToTopButton.classList.remove('show'); // Oculta el botón
    }
});

// Desplazamiento suave al hacer clic en el botón
backToTopButton.addEventListener('click', function(e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave
    });
});
