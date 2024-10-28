const tracklist = document.getElementById('tracklist');
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.querySelector('.volume-slider');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const albumLogo = document.querySelector('.album-logo img'); // Asegúrate de seleccionar la imagen

let currentTrackIndex = 0;

// Cargar la pista inicial
loadTrack(currentTrackIndex);

// Función para cargar una pista
function loadTrack(index) {
    const tracks = tracklist.getElementsByTagName('li');
    audioPlayer.src = tracks[index].getAttribute('data-src');
    highlightCurrentTrack(index);
}

// Resaltar la pista actual
function highlightCurrentTrack(index) {
    const tracks = tracklist.getElementsByTagName('li');
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].classList.remove('active');
        if (i === index) {
            tracks[i].classList.add('active');
        }
    }
}

// Reproducir o pausar la pista
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        albumLogo.classList.add('rotate'); 
    } else {
        audioPlayer.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        albumLogo.classList.remove('rotate'); 
    }
}

// Cambiar a la pista anterior
function prevTrack() {
    currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : tracklist.getElementsByTagName('li').length - 1;
    loadTrack(currentTrackIndex);
    togglePlayPause();
}

// Cambiar a la siguiente pista
function nextTrack() {
    currentTrackIndex = (currentTrackIndex < tracklist.getElementsByTagName('li').length - 1) ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
    togglePlayPause();
}

// Actualizar el volumen
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Eventos de reproducción
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Escuchar cuando la pista termina
audioPlayer.addEventListener('ended', nextTrack);

// Escuchar cambios en el tiempo de la pista
audioPlayer.addEventListener('timeupdate', () => {
    const progress = document.querySelector('.progress');
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

// Permitir clic en la barra de progreso
const progressContainer = document.querySelector('.progress-bar');
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
});

//Spike.html- parte de las cartas de Vicious y Julia
function toggleText(fullId, previewId) {
    const fullText = document.getElementById(fullId);
    const previewText = document.getElementById(previewId);
    
    if (fullText.classList.contains('hidden')) {
        fullText.classList.remove('hidden');
        previewText.style.display = 'none';
    } else {
        fullText.classList.add('hidden');
        previewText.style.display = 'block';
    }
}
