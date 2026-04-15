/* ===================================================================
   1. SONG LIBRARY
=================================================================== */
const songs = [
  { title: 'Blinding Lights', artist: 'The Weeknd', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', youtubeVideoID: '4NRXx6U8ABQ' },
  { title: 'Shape of You', artist: 'Ed Sheeran', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', youtubeVideoID: 'JGwWNGJdvx8' },
  { title: 'Blank Space', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: 'e-ORhEE9VVg' },
  { title: 'Style', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: '-CmadmM5cOk' },
  { title: 'Shake It Off', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: 'nfWlot6h_JM' },
  { title: 'Dreams', artist: 'Fleetwood Mac', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983', youtubeVideoID: 'Y3ywicfc0Lc' },
  { title: 'HUMBLE.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'tvTRZJ-4EyI' },
  { title: 'DNA.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'NLZRYQMLDW4' },
  { title: 'One More Time', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0', youtubeVideoID: 'FGBhQbmPwH8' },
  { title: 'Digital Love', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0', youtubeVideoID: 'QOngRDVtEQI' },
  { title: 'Hello', artist: 'Adele', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9', youtubeVideoID: 'YQHsXMglC9A' }
];

/* ===================================================================
   2. GLOBAL STATE
=================================================================== */
let ytPlayer;
const state = {
  currentTrackIndex: -1,
  isPlaying: false,
  volume: 70,
  isShuffle: false,
  isRepeat: false,
  ytReady: false,
  viewHistory: ['home']
};

/* ===================================================================
   3. YOUTUBE API
=================================================================== */
(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('yt-player', {
    height: '100%', width: '100%',
    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0, disablekb: 1 },
    events: {
      onReady: () => { state.ytReady = true; setVolume(state.volume); },
      onStateChange: onPlayerStateChange
    }
  });
};

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) nextTrack();
  state.isPlaying = (event.data === YT.PlayerState.PLAYING);
  updatePlayPauseUI();
  if (state.isPlaying) startProgressTracking(); else stopProgressTracking();
}

/* ===================================================================
   4. CORE PLAYBACK
=================================================================== */
function loadTrack(index) {
  if (index < 0 || index >= songs.length) return;
  state.currentTrackIndex = index;
  const song = songs[index];

  document.getElementById('playerTitle').textContent = song.title;
  document.getElementById('playerArtist').textContent = song.artist;
  document.getElementById('playerCover').src = song.coverImageURL;
  
  // Update Video Overlay Info
  document.getElementById('videoTitle').textContent = song.title;
  document.getElementById('videoSubtitle').textContent = song.artist;

  ytPlayer.loadVideoById(song.youtubeVideoID);
}

function playPause() {
  if (state.currentTrackIndex === -1) return loadTrack(0);
  state.isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
}

function nextTrack() {
  let next = (state.currentTrackIndex + 1) % songs.length;
  if (state.isShuffle) next = Math.floor(Math.random() * songs.length);
  loadTrack(next);
}

function setVolume(vol) {
  state.volume = vol;
  if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(vol);
  document.getElementById('volumeFill').style.width = vol + '%';
  document.getElementById('volumeSlider').value = vol;
}

/* ===================================================================
   5. UI RENDERING
=================================================================== */
function renderTrackGrid() {
  const grid = document.getElementById('trackGrid');
  grid.innerHTML = '';
  songs.forEach((song, i) => {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.innerHTML = `
      <div class="card-cover"><img src="${song.coverImageURL}"></div>
      <p class="card-title">${song.title}</p>
      <p class="card-artist">${song.artist}</p>
    `;
    card.onclick = () => loadTrack(i);
    grid.appendChild(card);
  });
}

function renderArtistGrid() {
  const grid = document.getElementById('artistGrid');
  const artists = [...new Set(songs.map(s => s.artist))];
  grid.innerHTML = '';
  artists.forEach(name => {
    const song = songs.find(s => s.artist === name);
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.innerHTML = `
      <div class="artist-card-avatar"><img src="${song.coverImageURL}"></div>
      <p class="artist-card-name">${name}</p>
    `;
    card.onclick = () => showArtist(name);
    grid.appendChild(card);
  });
}

function showArtist(name) {
  const artistSongs = songs.filter(s => s.artist === name);
  document.getElementById('artistHeroName').textContent = name;
  document.getElementById('artistHeroStats').textContent = `${artistSongs.length} tracks`;
  document.getElementById('artistHeroAvatar').innerHTML = `<img src="${artistSongs[0].coverImageURL}">`;
  
  const list = document.getElementById('artistTrackList');
  list.innerHTML = '';
  artistSongs.forEach(song => {
    const idx = songs.indexOf(song);
    const row = document.createElement('div');
    row.className = 'artist-track-row';
    row.innerHTML = `<span class="artist-track-title">${song.title}</span>`;
    row.onclick = () => loadTrack(idx);
    list.appendChild(row);
  });
  showView('artist');
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');
  
  const nav = document.querySelector(`[data-view="${viewName}"]`);
  if (nav) nav.classList.add('active');

  document.getElementById('topbarSearchWrap').style.display = (viewName === 'search') ? 'flex' : 'none';
}

function toggleVideo() {
  const overlay = document.getElementById('videoOverlay');
  const wrapper = document.getElementById('yt-player-wrapper');
  overlay.classList.toggle('open');
  
  if (overlay.classList.contains('open')) {
    wrapper.style.width = "80vw"; wrapper.style.height = "60vh";
    wrapper.style.position = "fixed"; wrapper.style.top = "50%";
    wrapper.style.left = "50%"; wrapper.style.transform = "translate(-50%, -50%)";
    wrapper.style.zIndex = "3000";
  } else {
    wrapper.style.width = "1px"; wrapper.style.height = "1px";
    wrapper.style.zIndex = "-1"; wrapper.style.transform = "none";
  }
}

/* ===================================================================
   6. INIT & EVENTS
=================================================================== */
let progressInterval;
function startProgressTracking() {
  progressInterval = setInterval(() => {
    if (!ytPlayer || !ytPlayer.getDuration) return;
    const pct = (ytPlayer.getCurrentTime() / ytPlayer.getDuration()) * 100;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('seekBar').value = pct;
    
    const cur = Math.floor(ytPlayer.getCurrentTime());
    document.getElementById('currentTime').textContent = `${Math.floor(cur/60)}:${(cur%60).toString().padStart(2,'0')}`;
  }, 500);
}
function stopProgressTracking() { clearInterval(progressInterval); }

function updatePlayPauseUI() {
  const icon = document.getElementById('playIcon');
  if (icon) icon.setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
  lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTrackGrid();
  renderArtistGrid();
  lucide.createIcons();

  document.getElementById('btnPlayPause').onclick = playPause;
  document.getElementById('btnNext').onclick = nextTrack;
  document.getElementById('btnPrev').onclick = () => loadTrack(state.currentTrackIndex - 1);
  document.getElementById('btnVideo').onclick = toggleVideo;
  document.getElementById('videoClose').onclick = toggleVideo;
  document.getElementById('volumeSlider').oninput = (e) => setVolume(e.target.value);
  document.getElementById('sidebarToggle').onclick = () => document.getElementById('sidebar').classList.toggle('open');
  
  document.querySelectorAll('.nav-item').forEach(item => {
    item.onclick = () => showView(item.dataset.view);
  });

  document.getElementById('artistBackBtn').onclick = () => showView('home');

  // Greeting
  const hour = new Date().getHours();
  document.getElementById('greeting').textContent = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
});