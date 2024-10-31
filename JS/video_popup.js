function setupVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const section = document.getElementById('section');
    const trailer = document.getElementById('trailer');
    const video = document.getElementById('intro-video');

    // Mostrar el popup solo en la primera visita
    if (!sessionStorage.getItem('videoShown')) {
        videoPopup.style.display = 'flex'; 
        section.style.display = 'none'; // Ocultar contenido
        trailer.style.display = 'none'; // Ocultar trailer

        // Intentar reproducir el video automáticamente
        video.muted = false; // Asegúrate de que no esté silenciado en la primera visita
        video.play().then(() => {
            console.log("Video se está reproduciendo automáticamente."); // Para depuración
        }).catch(error => {
            console.error("Error al intentar reproducir el video: ", error);
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
}

// Solo ejecutar en index.html
if (window.location.pathname.includes("index.html")) {
    window.addEventListener('DOMContentLoaded', setupVideoPopup); // Configurar el popup del video
}