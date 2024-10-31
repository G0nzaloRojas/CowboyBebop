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

        // Iniciar el video en modo muteado
        video.muted = true;

        // Intentar reproducir el video automáticamente
        video.play().catch(error => {
            console.error("Error al intentar reproducir el video: ", error);
        });

        // Desmutear el video después de 1 segundo
        setTimeout(() => {
            video.muted = false; // Desmutear el video
        }, 1000); // 1000 milisegundos = 1 segundo

        // Marcar como mostrado cuando el video termine
        video.onended = () => {
            sessionStorage.setItem('videoShown', 'true'); // Marcar como mostrado
            closeVideoPopup(); // Cerrar el popup
        };

    } else {
        // En visitas posteriores
        videoPopup.style.display = 'none'; // Ocultar si ya se mostró
        section.style.display = 'block'; // Mostrar contenido
        trailer.style.display = 'block'; // Mostrar el trailer
        video.pause(); // Pausar el video
        video.currentTime = 0; // Reiniciar el video
        video.muted = true; // Asegurarse de que esté muteado en visitas posteriores
    }
}

function closeVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const section = document.getElementById('section');
    const trailer = document.getElementById('trailer');
    const video = document.getElementById('intro-video');

    // Solo cerramos el popup, no pausamos el video aquí
    videoPopup.style.display = 'none'; // Cerrar el popup
    section.style.display = 'block'; // Mostrar contenido
    trailer.style.display = 'block'; // Mostrar el trailer
}

// Solo ejecutar en index.html
if (window.location.pathname.includes("index.html")) {
    window.addEventListener('DOMContentLoaded', setupVideoPopup); // Configurar el popup del video
}

