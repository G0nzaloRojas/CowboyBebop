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

        // Reproducir el video cuando esté cargado
        video.onloadedmetadata = () => {
            video.play().catch(error => {
                console.error("Error al intentar reproducir el video: ", error);
            });
        };

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

        // Temporizador como respaldo
        const videoDurationInSeconds = 90; // 90 segundos
        setTimeout(() => {
            console.log("Cerrando popup por tiempo de espera."); // Para depuración
            sessionStorage.setItem('videoShown', 'true'); // Marcar como mostrado
            closeVideoPopup(); // Cerrar el popup después de 90 segundos
        }, videoDurationInSeconds * 1000); // Convertir a milisegundos
    } else {
        videoPopup.style.display = 'none'; // Ocultar si ya se mostró
        section.style.display = 'block'; // Mostrar contenido
        trailer.style.display = 'block'; // Mostrar el trailer
    }
}

function closeVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const section = document.getElementById('section');
    const trailer = document.getElementById('trailer');

    videoPopup.style.display = 'none'; // Cerrar el popup
    section.style.display = 'block'; // Mostrar contenido
    trailer.style.display = 'block'; // Mostrar el trailer
}

// Solo ejecutar en index.html
if (window.location.pathname.includes("index.html")) {
    window.addEventListener('DOMContentLoaded', setupVideoPopup); // Configurar el popup del video
}

