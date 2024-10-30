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

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



let currentPage = 0;
const itemsPerPage = 3; // Asegúrate de que esto esté en 4

function displayEpisodes() {
    const allEpisodes = document.querySelectorAll(".platillo");
    allEpisodes.forEach((episode, index) => {
        episode.style.display = (index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage) ? "block" : "none";
    });

    // Deshabilitar botones de navegación según la página actual
    document.querySelector(".navegacion button:first-child").disabled = currentPage === 0;
    document.querySelector(".navegacion button:last-child").disabled = (currentPage + 1) * itemsPerPage >= allEpisodes.length;
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayEpisodes();
    }
}

function nextPage() {
    const allEpisodes = document.querySelectorAll(".platillo");
    if ((currentPage + 1) * itemsPerPage < allEpisodes.length) {
        currentPage++;
        displayEpisodes();
    }
}

// Cargar episodios al inicio
window.onload = displayEpisodes; 



function closePopup() {
    document.getElementById('video-popup').style.display = 'none'; // Ocultar popup
    document.getElementById('section').style.display = 'block'; // Mostrar contenido
    document.getElementById('trailer').style.display = 'block'; // Mostrar el trailer
}

window.onload = function() {
    document.getElementById('video-popup').style.display = 'flex'; // Mostrar el popup
    document.getElementById('section').style.display = 'none'; // Ocultar contenido al inicio
    document.getElementById('trailer').style.display = 'none'; // Ocultar el trailer al inicio

    // Usar un temporizador para ocultar el popup y mostrar el contenido después de 89 segundos
    var videoDuration = 89; // Duración en segundos del video
    setTimeout(closePopup, videoDuration * 1000); // Cerrar popup después de 89 segundos
};

