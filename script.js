const songs = [
  { title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', id: '4NRXx6U8ABQ' },
  { title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', id: 'JGwWNGJdvx8' },
  { title: 'Blank Space', artist: 'Taylor Swift', cover: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', id: 'e-ORhEE9VVg' },
  { title: 'HUMBLE.', artist: 'Kendrick Lamar', cover: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', id: 'tvTRZJ-4EyI' },
  { title: 'Digital Love', artist: 'Daft Punk', cover: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0', id: 'QOngRDVtEQI' },
  { title: 'Levitating', artist: 'Dua Lipa', cover: 'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f', id: 'TUVcZfQe-Kw' },
  { title: 'Peaches', artist: 'Justin Bieber', cover: 'https://i.scdn.co/image/ab67616d0000b27312a2db8bb4c0d525c00bd2b9', id: 'tQ0yjYUFKAE' }
];

let ytPlayer;
let currentTrackIdx = -1;
let isVideoOpen = false;

// Initialize YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
  ytPlayer = new YT.Player('yt-player', {
    height: '100%', width: '100%',
    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0 },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerStateChange(event) {
  const icon = document.getElementById('playIcon');
  if (event.data === YT.PlayerState.PLAYING) {
    icon.setAttribute('data-lucide', 'pause');
  } else {
    icon.setAttribute('data-lucide', 'play');
  }
  lucide.createIcons();
}

// Playback Logic
function loadTrack(index) {
  currentTrackIdx = index;
  const song = songs[index];
  document.getElementById('playerTitle').textContent = song.title;
  document.getElementById('playerArtist').textContent = song.artist;
  document.getElementById('playerCover').src = song.cover;
  ytPlayer.loadVideoById(song.id);
}

function togglePlay() {
  if (currentTrackIdx === -1) return loadTrack(0);
  const state = ytPlayer.getPlayerState();
  state === 1 ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
}

// UI Rendering
function initUI() {
  const trackGrid = document.getElementById('trackGrid');
  const featuredGrid = document.getElementById('featuredGrid');
  const artistGrid = document.getElementById('artistGrid');

  songs.forEach((song, i) => {
    // Featured Cards
    if (i < 4) {
      const fCard = document.createElement('div');
      fCard.className = 'featured-card';
      fCard.innerHTML = `<img src="${song.cover}"> <strong>${song.title}</strong>`;
      fCard.onclick = () => loadTrack(i);
      featuredGrid.appendChild(fCard);
    }
    // Track Cards
    const tCard = document.createElement('div');
    tCard.className = 'track-card';
    tCard.innerHTML = `<img src="${song.cover}"><p><strong>${song.title}</strong></p><p>${song.artist}</p>`;
    tCard.onclick = () => loadTrack(i);
    trackGrid.appendChild(tCard);
  });

  // Artist Cards
  const artists = [...new Set(songs.map(s => s.artist))];
  artists.forEach(name => {
    const aCard = document.createElement('div');
    aCard.className = 'artist-card';
    aCard.innerHTML = `<div class="artist-card-avatar"><img src="${songs.find(s=>s.artist===name).cover}"></div><p>${name}</p>`;
    aCard.onclick = () => showArtistView(name);
    artistGrid.appendChild(aCard);
  });
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  
  document.getElementById('view-' + viewName).classList.add('active');
  const activeLink = document.querySelector(`[data-view="${viewName}"]`);
  if (activeLink) activeLink.classList.add('active');
  
  document.getElementById('searchBar').style.display = (viewName === 'search') ? 'flex' : 'none';
}

function showArtistView(name) {
  const list = document.getElementById('artistTrackList');
  list.innerHTML = '';
  document.getElementById('artistNameDisplay').textContent = name;
  songs.filter(s => s.artist === name).forEach(s => {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.innerHTML = `<img src="${s.cover}"><p>${s.title}</p>`;
    card.onclick = () => loadTrack(songs.indexOf(s));
    list.appendChild(card);
  });
  showView('artist');
}

// Video Toggle
function toggleVideo() {
  const wrapper = document.getElementById('yt-player-wrapper');
  isVideoOpen = !isVideoOpen;
  if (isVideoOpen) {
    wrapper.style.top = '50%'; wrapper.style.left = '50%';
    wrapper.style.width = '80vw'; wrapper.style.height = '60vh';
    wrapper.style.transform = 'translate(-50%, -50%)'; wrapper.style.zIndex = '9999';
    document.getElementById('btnVideo').style.color = '#1DB954';
  } else {
    wrapper.style.top = '-9999px';
    document.getElementById('btnVideo').style.color = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  lucide.createIcons();

  document.getElementById('btnPlayPause').onclick = togglePlay;
  document.getElementById('btnNext').onclick = () => loadTrack((currentTrackIdx + 1) % songs.length);
  document.getElementById('btnPrev').onclick = () => loadTrack((currentTrackIdx - 1 + songs.length) % songs.length);
  document.getElementById('btnVideo').onclick = toggleVideo;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = () => showView(link.dataset.view);
  });
  document.getElementById('backBtn').onclick = () => showView('home');

  // Progress Tracker
  setInterval(() => {
    if (ytPlayer && ytPlayer.getCurrentTime) {
      const pct = (ytPlayer.getCurrentTime() / ytPlayer.getDuration()) * 100;
      document.getElementById('progressFill').style.width = pct + '%';
      
      const time = Math.floor(ytPlayer.getCurrentTime());
      document.getElementById('timeCurrent').textContent = `${Math.floor(time/60)}:${(time%60).toString().padStart(2,'0')}`;
    }
  }, 1000);
});