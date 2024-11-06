function setupVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const section = document.getElementById('section');
    const trailer = document.getElementById('trailer');
    const video = document.getElementById('intro-video');
    const playButton = document.getElementById('play-button');
    const closeButton = document.getElementById('close-button'); // Obtén el botón de cierre

    // Inicialmente ocultar la sección y el trailer
    section.style.display = 'none'; 
    trailer.style.display = 'none';

    // Mostrar el popup solo en la primera visita
    // Verifica si el video ya ha sido mostrado (usando sessionStorage)
    if (!sessionStorage.getItem('videoShown')) {
        // Si el video no ha sido mostrado, mostramos el popup
        videoPopup.style.display = 'flex'; 
        document.body.classList.add('video-popup-active'); // Agregar clase para ocultar el footer

        // Mostrar el botón de cerrar
        closeButton.style.display = 'block'; 

        // Agregar evento al botón de reproducir
        playButton.addEventListener('click', () => {
            video.muted = false; // Desmutear el video
            video.play().then(() => {
                playButton.style.display = 'none'; // Ocultar el botón de play al reproducir
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

        // Manejo de errores (si el video no puede reproducirse)
        video.onerror = () => {
            console.error("Error al intentar reproducir el video.");
            closeVideoPopup(); // Cerrar el popup si hay error
        };

        // Agregar evento al botón de cerrar
        closeButton.addEventListener('click', () => {
            sessionStorage.setItem('videoShown', 'true'); // Marcar como mostrado cuando se cierra el popup
            closeVideoPopup();
        });
        
    } else {
        // En visitas posteriores, asegurarse de que el popup esté oculto
        console.log("El video ya fue mostrado anteriormente."); // Para depuración
        videoPopup.style.display = 'none'; // Ocultar el popup
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
