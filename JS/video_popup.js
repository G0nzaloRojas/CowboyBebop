function setupVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const section = document.getElementById('section');
    const trailer = document.getElementById('trailer');
    const video = document.getElementById('intro-video');
    const playButton = document.getElementById('play-button');

    // Inicialmente ocultar la sección y el trailer
    section.style.display = 'none'; 
    trailer.style.display = 'none';

    // Mostrar el popup solo en la primera visita
    if (!sessionStorage.getItem('videoShown')) {
        videoPopup.style.display = 'flex'; 
        document.body.classList.add('video-popup-active'); // Agregar clase para ocultar el footer

        // Agregar evento al botón de reproducir
        playButton.addEventListener('click', () => {
            video.muted = false; // Desmutear el video
            video.play().then(() => {
                playButton.style.display = 'none'; // Ocultar botón al reproducir
            }).catch(error => {
                console.error("Error al intentar reproducir el video: ", error);
            });
        });

        // Marcar como mostrado cuando el video termine
        video.onended = () => {
            console.log("El video ha terminado."); // Para depuración
            sessionStorage.setItem('videoShown', 'true'); // Marcar como mostrado
            closeVideoPopup(); // Cerrar el popup
        };

        // Manejo de errores
        video.onerror = () => {
            console.error("Error al intentar reproducir el video.");
            closeVideoPopup(); // Cerrar el popup si hay error
        };

    } else {
        // En visitas posteriores
        videoPopup.style.display = 'none'; // Ocultar si ya se mostró
        section.style.display = 'block'; // Mostrar contenido
        trailer.style.display = 'block'; // Mostrar el trailer
        video.pause(); // Pausar el video
        video.currentTime = 0; // Reiniciar el video
        video.muted = true; // Silenciar el video en visitas posteriores
    }
}

function closeVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const section = document.getElementById('section');
    const trailer = document.getElementById('trailer');
    const video = document.getElementById('intro-video');

    video.pause(); // Pausar el video
    video.currentTime = 0; // Reiniciar el video
    videoPopup.style.display = 'none'; // Cerrar el popup
    section.style.display = 'block'; // Mostrar contenido
    trailer.style.display = 'block'; // Mostrar el trailer
    document.body.classList.remove('video-popup-active'); // Quitar clase para mostrar el footer
}

// Ejecutar la configuración del popup al cargar la página
window.addEventListener('DOMContentLoaded', setupVideoPopup);