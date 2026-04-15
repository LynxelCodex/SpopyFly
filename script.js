const songs = [
    { title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', id: '4NRXx6U8ABQ' },
    { title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', id: 'JGwWNGJdvx8' },
    { title: 'Blank Space', artist: 'Taylor Swift', cover: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', id: 'e-ORhEE9VVg' },
    { title: 'Style', artist: 'Taylor Swift', cover: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', id: '-CmadmM5cOk' },
    { title: 'HUMBLE.', artist: 'Kendrick Lamar', cover: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', id: 'tvTRZJ-4EyI' }
];

let ytPlayer;
let currentIdx = -1;

// Load YT API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
    ytPlayer = new YT.Player('yt-player', {
        events: { 'onStateChange': onStateChange }
    });
};

function onStateChange(event) {
    const btn = document.getElementById('btnPlayPause');
    if (event.data === YT.PlayerState.PLAYING) {
        btn.textContent = "Pause";
    } else {
        btn.textContent = "Play";
    }
}

function loadTrack(idx) {
    currentIdx = idx;
    const song = songs[idx];
    document.getElementById('playerTitle').textContent = song.title;
    document.getElementById('playerArtist').textContent = song.artist;
    document.getElementById('playerCover').src = song.cover;
    ytPlayer.loadVideoById(song.id);
}

function renderSongs() {
    const grid = document.getElementById('trackGrid');
    if (!grid) return;
    grid.innerHTML = '';
    songs.forEach((song, i) => {
        const div = document.createElement('div');
        div.className = 'track-card';
        div.innerHTML = `<img src="${song.cover}"><p>${song.title}</p>`;
        div.onclick = () => loadTrack(i);
        grid.appendChild(div);
    });
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + viewId).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
    lucide.createIcons();
    
    document.getElementById('btnPlayPause').onclick = () => {
        const state = ytPlayer.getPlayerState();
        state === 1 ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
    };

    document.getElementById('btnNext').onclick = () => loadTrack((currentIdx + 1) % songs.length);
    document.getElementById('btnPrev').onclick = () => loadTrack((currentIdx - 1 + songs.length) % songs.length);
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = () => showView(item.dataset.view);
    });

    // Simple Video Toggle
    document.getElementById('btnVideo').onclick = () => {
        const wrapper = document.getElementById('yt-player-wrapper');
        const isHidden = wrapper.style.top === '-999px';
        if (isHidden) {
            wrapper.style.top = '50%'; wrapper.style.left = '50%';
            wrapper.style.width = '80vw'; wrapper.style.height = '60vh';
            wrapper.style.transform = 'translate(-50%, -50%)';
            wrapper.style.zIndex = '5000';
        } else {
            wrapper.style.top = '-999px';
        }
    };
});