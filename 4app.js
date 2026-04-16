let curr = null;
let currentSongIndex = 0;
let songsList = [];

const playPauseBtn = document.querySelector(".play");
const backBtn = document.querySelector(".back");
const nextBtn = document.querySelector(".next");
const songNameElement = document.querySelector(".N");
const timeElement = document.querySelector(".T");
const progressCircle = document.querySelector(".cir");
const progressBar = document.querySelector(".point");

const SONGS = [
    "/song/song1.mp3",
    "/song/song2.mp3",
    "/song/song3.mp3",
    "/song/song4.mp3",
    "/song/song5.mp3"
];

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function playTrack(trackUrl, index) {
    if (curr) {
        curr.pause();
        curr.currentTime = 0;
        curr = null;
    }

    curr = new Audio(trackUrl);
    currentSongIndex = index;

    const fileName = trackUrl.split("/").pop();
    if (songNameElement) songNameElement.textContent = fileName;

    curr.play();

    if (playPauseBtn) playPauseBtn.src = "pause.svg";

    curr.addEventListener("timeupdate", () => {
        if (timeElement) {
            timeElement.textContent = `${formatTime(curr.currentTime)}/${formatTime(curr.duration)}`;
        }
        if (progressCircle && curr.duration) {
            progressCircle.style.left = (curr.currentTime / curr.duration) * 100 + "%";
        }
    });

    curr.addEventListener("ended", () => {
        nextSong();
    });
}

function previousSong() {
    if (!songsList.length) return;
    currentSongIndex = (currentSongIndex - 1 + songsList.length) % songsList.length;
    playTrack(songsList[currentSongIndex], currentSongIndex);
}

function nextSong() {
    if (!songsList.length) return;
    currentSongIndex = (currentSongIndex + 1) % songsList.length;
    playTrack(songsList[currentSongIndex], currentSongIndex);
}

function togglePlayPause() {
    if (!curr) {
        if (songsList.length) playTrack(songsList[0], 0);
        return;
    }

    if (curr.paused) {
        curr.play();
        if (playPauseBtn) playPauseBtn.src = "pause.svg";
    } else {
        curr.pause();
        if (playPauseBtn) playPauseBtn.src = "play.svg";
    }
}

function loadSongs() {
    songsList = [...SONGS];
}

function renderLibrarySongs(songs) {
    const libraryList = document.querySelector(".list ul");
    if (!libraryList) return;
    
    libraryList.innerHTML = "";
    
    songs.forEach((song, index) => {
        const fileName = song.split("/").pop();
        const li = document.createElement("li");
        li.innerHTML = `<div class="card">${fileName}</div>`;
        
        li.addEventListener("click", () => {
            playTrack(song, index);
        });
        
        libraryList.appendChild(li);
    });
}

function setupTrendingCards(songs) {
    const cards = [".a", ".b", ".c", ".d", ".f"];
    
    cards.forEach((selector, index) => {
        const card = document.querySelector(selector);
        if (card && songs[index]) {
            card.addEventListener("click", () => {
                playTrack(songs[index], index);
            });
        }
    });
}

function setupProgressBar() {
    if (!progressBar) return;
    
    progressBar.addEventListener("click", (e) => {
        if (!curr || !curr.duration) return;
        
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * curr.duration;
        
        curr.currentTime = newTime;
        
        if (progressCircle) {
            progressCircle.style.left = `${percentage * 100}%`;
        }
    });
}

function setupControls() {
    if (backBtn) backBtn.addEventListener("click", previousSong);
    if (nextBtn) nextBtn.addEventListener("click", nextSong);
    if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause);
}

async function initializePlayer() {
    loadSongs();
    renderLibrarySongs(songsList);
    setupTrendingCards(songsList);
    setupProgressBar();
    setupControls();
    
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === "ArrowLeft") {
            previousSong();
        } else if (e.code === "ArrowRight") {
            nextSong();
        }
    });
}

initializePlayer();