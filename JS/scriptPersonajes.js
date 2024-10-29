document.addEventListener("DOMContentLoaded", () => {
    const seccionesOcultas = document.querySelectorAll('.hidden-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('mostrar', entry.isIntersecting);
        });
    }, { threshold: 0.8 });

    seccionesOcultas.forEach((seccion) => observer.observe(seccion));
});


