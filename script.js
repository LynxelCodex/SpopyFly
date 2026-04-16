/* ===================================================================
   SPOTIFY CLONE - script.js with YouTube Search
=================================================================== */

// YouTube API Key - Add your own key here from https://console.developers.google.com
const YOUTUBE_API_KEY = 'AIzaSyCwciHt_mhdeGVeF4DYHKxYQAJ2a24uFTc'; // Replace with your YouTube API key

// Load songs from localStorage, fallback to default
let songs = JSON.parse(localStorage.getItem('spotifyCloneSongs')) || [
  { title: 'Blinding Lights', artist: 'The Weeknd', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', youtubeVideoID: '4NRXx6U8ABQ' },
  { title: 'Shape of You', artist: 'Ed Sheeran', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', youtubeVideoID: 'JGwWNGJdvx8' },
  { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e14', youtubeVideoID: 'kTJczUoc26U' },
  { title: 'Levitating', artist: 'Dua Lipa', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f', youtubeVideoID: 'TUVcZfQe-Kw' },
  { title: 'Peaches', artist: 'Justin Bieber', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27312a2db8bb4c0d525c00bd2b9', youtubeVideoID: 'tQ0yjYUFKAE' },
  { title: 'drivers license', artist: 'Olivia Rodrigo', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27384a87d439bdb2b37c10e9d0c', youtubeVideoID: 'ZmDBbnmKpqQ' },
  { title: 'Watermelon Sugar', artist: 'Harry Styles', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f', youtubeVideoID: 'E07s5ZYygMg' },
  { title: 'Save Your Tears', artist: 'The Weeknd', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', youtubeVideoID: 'LIIDh-qI9oI' },
  { title: 'Good 4 U', artist: 'Olivia Rodrigo', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27384a87d439bdb2b37c10e9d0c', youtubeVideoID: 'gNi_6U5Pm_o' },
  { title: 'Montero', artist: 'Lil Nas X', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd', youtubeVideoID: '6swmTBVI83k' },
  { title: 'Kiss Me More', artist: 'Doja Cat ft. SZA', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2736cbf4b0e3f2c31d0b2b3f3b6', youtubeVideoID: '0EVVKs6DKA0' },
  { title: 'Bad Guy', artist: 'Billie Eilish', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273c6f7af36bc1f8b953d4dc274', youtubeVideoID: 'DyDfgMOUjCI' },
  { title: 'Blank Space', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: 'e-ORhEE9VVg' },
  { title: 'Style', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: '-CmadmM5cOk' },
  { title: 'Shake It Off', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: 'nfWlot6h_JM' },
  { title: 'Bad Blood', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: 'QqwH2i_845c' },
  { title: 'Wildest Dreams', artist: 'Taylor Swift', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a', youtubeVideoID: 'IdneKLooZaU' },
  { title: 'Dreams', artist: 'Fleetwood Mac', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983', youtubeVideoID: 'Y3ywicfc0Lc' },
  { title: 'Go Your Own Way', artist: 'Fleetwood Mac', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983', youtubeVideoID: '6ul-cZyuYq4' },
  { title: "Don't Stop", artist: 'Fleetwood Mac', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983', youtubeVideoID: 'SyTvR1vWfB8' },
  { title: 'The Chain', artist: 'Fleetwood Mac', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983', youtubeVideoID: 'PCXpE2856yY' },
  { title: 'Never Going Back Again', artist: 'Fleetwood Mac', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983', youtubeVideoID: 'sKkWg2kRAl4' },
  { title: 'BLOOD.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'V-HkLDEY_Ew' },
  { title: 'DNA.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'NLZRYQMLDW4' },
  { title: 'YAH.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'vCNOeS3zXEQ' },
  { title: 'ELEMENT.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'glaG64Ao7sM' },
  { title: 'LOYALTY.', artist: 'Kendrick Lamar', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', youtubeVideoID: 'Dlg-P005U-Y' },
  { title: 'One More Time', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83', youtubeVideoID: 'FGBhQbmPwH8' },
  { title: 'Aerodynamic', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83', youtubeVideoID: 'L93-7vRfxNs' },
  { title: 'Digital Love', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83', youtubeVideoID: 'F_O1E42XlEI' },
  { title: 'Harder, Better, Faster, Stronger', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83', youtubeVideoID: 'gAjR4_CbPpQ' },
  { title: 'Something About Us', artist: 'Daft Punk', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b273e319bbafea153f387a32fd83', youtubeVideoID: 'em0MknB6wVw' },
  { title: 'Hello', artist: 'Adele', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9', youtubeVideoID: 'YQHsXMglC9A' },
  { title: 'Send My Love (To Your New Lover)', artist: 'Adele', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9', youtubeVideoID: 'fk4BbF7B29w' },
  { title: 'I Miss You', artist: 'Adele', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9', youtubeVideoID: 'dHn1_u9S3T0' },
  { title: 'When We Were Young', artist: 'Adele', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9', youtubeVideoID: 'DDWKuo3gXMQ' },
  { title: 'Remedy', artist: 'Adele', coverImageURL: 'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9', youtubeVideoID: 'rH4lP2lRlc0' }
];

// Save songs to localStorage
function saveSongs() {
  localStorage.setItem('spotifyCloneSongs', JSON.stringify(songs));
}

// Add new song to permanent list
function addSongToLibrary(song) {
  const exists = songs.some(s => s.youtubeVideoID === song.youtubeVideoID);
  if (!exists) {
    songs.push(song);
    saveSongs();
    renderTrackGrid();
    renderLibraryList();
    renderArtistGrid();
  }
}

function handleYouTubeTrackClick(song) {
  addSongToLibrary(song);
  const trackIndex = songs.findIndex(s => s.youtubeVideoID === song.youtubeVideoID);
  if (trackIndex !== -1) {
    loadTrack(trackIndex);
    generateRecommendations(trackIndex);
  }
}

// Search YouTube for songs
async function searchYouTube(query) {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not set');
    return [];
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      coverImageURL: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || 'https://via.placeholder.com/226',
      youtubeVideoID: item.id.videoId
    }));
  } catch (error) {
    console.error('YouTube search error:', error);
    return [];
  }
}

/* === STATE === */
const state = {
  currentTrackIndex: -1,
  isPlaying: false,
  volume: 70,
  isMuted: false,
  isShuffle: false,
  isRepeat: false,
  isLiked: false,
  progressInterval: null,
  ytReady: false,
  recentlyPlayed: [],
  currentArtistIndices: []
};

let ytPlayer = null;
let viewHistory = ['home'];

/* === YOUTUBE API === */
(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '100%',
    width: '100%',
    playerVars: { autoplay: 0, controls: 1, disablekb: 0, enablejsapi: 1, modestbranding: 1, rel: 0, showinfo: 0, fs: 1 },
    events: {
      onReady: () => { state.ytReady = true; setVolume(state.volume); },
      onStateChange: onPlayerStateChange,
      onError: onPlayerError
    }
  });
};

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) handleTrackEnd();
  if (event.data === YT.PlayerState.PLAYING) {
    state.isPlaying = true; updatePlayPauseUI(); startProgressTracking();
  }
  if (event.data === YT.PlayerState.PAUSED) {
    state.isPlaying = false; updatePlayPauseUI(); stopProgressTracking();
  }
}

function onPlayerError(event) {
  setTimeout(nextTrack, 1500);
}

function safeLucide() {
  try { lucide.createIcons(); } catch (e) {}
}

/* === PLAYBACK CONTROLS === */
function loadTrack(index, autoplay = true) {
  if (!state.ytReady) return;
  if (index < 0 || index >= songs.length) return;

  const song = songs[index];
  const videoOverlay = document.getElementById('videoOverlay');
  if (videoOverlay && videoOverlay.classList.contains('open')) closeVideoOverlay();

  document.querySelectorAll('.track-card.playing, .featured-card.playing').forEach(el => el.classList.remove('playing'));

  state.currentTrackIndex = index;
  state.recentlyPlayed = [index, ...state.recentlyPlayed.filter(i => i !== index)].slice(0, 6);
  renderRecentGrid();

  document.getElementById('playerTitle').textContent = song.title;
  document.getElementById('playerArtist').textContent = song.artist;
  document.getElementById('playerCover').src = song.coverImageURL;

  document.getElementById('overlayTitle').textContent = song.title;
  document.getElementById('overlayArtist').textContent = song.artist;
  document.getElementById('overlayArt').src = song.coverImageURL;

  document.querySelectorAll(`[data-index="${index}"]`).forEach(el => el.classList.add('playing'));

  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('seekBar').value = 0;
  document.getElementById('currentTime').textContent = '0:00';
  document.getElementById('totalTime').textContent = '0:00';

  if (autoplay) {
    ytPlayer.loadVideoById(song.youtubeVideoID);
    state.isPlaying = true;
  } else {
    ytPlayer.cueVideoById(song.youtubeVideoID);
    state.isPlaying = false;
  }
  updatePlayPauseUI();
}

function playPause() {
  if (!state.ytReady) return;
  if (state.currentTrackIndex === -1) { loadTrack(0); return; }
  state.isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
}

function nextTrack() {
  if (state.isShuffle) {
    let next;
    do { next = Math.floor(Math.random() * songs.length); } while (next === state.currentTrackIndex && songs.length > 1);
    loadTrack(next);
  } else {
    loadTrack((state.currentTrackIndex + 1) % songs.length);
  }
}

function prevTrack() {
  if (state.ytReady && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() > 3) ytPlayer.seekTo(0, true);
  else loadTrack((state.currentTrackIndex - 1 + songs.length) % songs.length);
}

function handleTrackEnd() {
  if (state.isRepeat) { ytPlayer.seekTo(0, true); ytPlayer.playVideo(); } else nextTrack();
}

function setVolume(vol) {
  state.volume = Math.max(0, Math.min(100, vol));
  if (state.ytReady && ytPlayer.setVolume) ytPlayer.setVolume(state.volume);
  document.getElementById('volumeFill').style.width = state.volume + '%';
  document.getElementById('volumeSlider').value = state.volume;
  updateVolumeIcon();
}

function toggleMute() {
  if (!state.ytReady) return;
  state.isMuted = !state.isMuted;
  if (state.isMuted) {
    ytPlayer.mute(); document.getElementById('volumeFill').style.width = '0%';
  } else {
    ytPlayer.unMute(); document.getElementById('volumeFill').style.width = state.volume + '%';
  }
  updateVolumeIcon();
}

function updateVolumeIcon() {
  const icon = document.getElementById('volIcon');
  const vol = state.isMuted ? 0 : state.volume;
  icon.setAttribute('data-lucide', vol === 0 ? 'volume-x' : vol < 50 ? 'volume-1' : 'volume-2');
  safeLucide();
}

/* === PROGRESS === */
function startProgressTracking() { clearInterval(state.progressInterval); state.progressInterval = setInterval(updateProgress, 500); }
function stopProgressTracking() { clearInterval(state.progressInterval); }

function updateProgress() {
  if (!state.ytReady || !ytPlayer.getCurrentTime) return;
  try {
    const current = ytPlayer.getCurrentTime();
    const duration = ytPlayer.getDuration();
    if (!duration) return;
    const pct = (current / duration) * 100;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('seekBar').value = pct;
    document.getElementById('currentTime').textContent = formatTime(current);
    document.getElementById('totalTime').textContent = formatTime(duration);
  } catch(e) {}
}

function seekTo(pct) {
  if (!state.ytReady || !ytPlayer.getDuration) return;
  ytPlayer.seekTo((pct / 100) * ytPlayer.getDuration(), true);
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }

/* === UI HELPERS & RENDERING === */
function updatePlayPauseUI() {
  document.getElementById('playIcon').setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
  const overlayIcon = document.getElementById('overlayPlayIcon');
  if (overlayIcon) overlayIcon.setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
  safeLucide();
}

function createTrackCard(song, index, showAddBtn = false) {
  const card = document.createElement('div');
  card.className = 'track-card';
  card.dataset.index = index;
  let addButton = '';
  if (showAddBtn) {
    addButton = `<button class="card-play-btn youtube-add-btn" style="background:#E63946;" onclick="handleYouTubeTrackClick({title:'${escapeHtml(song.title)}',artist:'${escapeHtml(song.artist)}',coverImageURL:'${song.coverImageURL}',youtubeVideoID:'${song.youtubeVideoID}'})"><i data-lucide="plus"></i></button>`;
  } else {
    addButton = `<button class="card-play-btn"><i data-lucide="play"></i></button>`;
  }
  card.innerHTML = `
    <div class="card-cover">
      <img src="${song.coverImageURL}" alt="art" />
      ${addButton}
      <span class="card-now-playing">Playing</span>
    </div>
    <div class="card-body">
      <p class="card-title">${escapeHtml(song.title)}</p>
      <p class="card-artist">
        <span class="card-equalizer"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>
        ${escapeHtml(song.artist)}
      </p>
    </div>
  `;
  if (!showAddBtn) {
    card.onclick = () => state.currentTrackIndex === index ? playPause() : loadTrack(index);
  }
  return card;
}

function createFeaturedCard(song, index) {
  const card = document.createElement('div');
  card.className = 'featured-card';
  card.dataset.index = index;
  card.innerHTML = `<div class="featured-cover"><img src="${song.coverImageURL}" /></div><span class="featured-title">${escapeHtml(song.title)}</span><button class="featured-play-btn"><i data-lucide="play"></i></button>`;
  card.onclick = () => state.currentTrackIndex === index ? playPause() : loadTrack(index);
  return card;
}

function renderTrackGrid() {
  const grid = document.getElementById('trackGrid');
  grid.innerHTML = '';
  songs.forEach((song, i) => grid.appendChild(createTrackCard(song, i)));
  safeLucide();
}

function renderFeaturedGrid() {
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = '';
  songs.slice(0, 6).forEach((song, i) => grid.appendChild(createFeaturedCard(song, i)));
  safeLucide();
}

function renderRecentGrid() {
  const grid = document.getElementById('recentGrid');
  grid.innerHTML = '';
  if (state.recentlyPlayed.length === 0) grid.innerHTML = '<p class="empty-state">Nothing played yet...</p>';
  else state.recentlyPlayed.forEach(i => grid.appendChild(createTrackCard(songs[i], i)));
  safeLucide();
}

function renderLibraryList() {
  const list = document.getElementById('libraryList');
  list.innerHTML = '';
  songs.forEach((song, i) => {
    const item = document.createElement('div');
    item.className = 'library-item';
    item.innerHTML = `<div class="library-item-cover"><img src="${song.coverImageURL}" /></div><div class="library-item-meta"><p class="library-item-title">${escapeHtml(song.title)}</p><p class="library-item-sub">Song &middot; ${escapeHtml(song.artist)}</p></div>`;
    item.onclick = () => loadTrack(i);
    list.appendChild(item);
  });
}

function renderArtistGrid() {
  const grid = document.getElementById('artistGrid');
  grid.innerHTML = '';
  const artistMap = {};
  songs.forEach((s, i) => {
    if (!artistMap[s.artist]) artistMap[s.artist] = { name: s.artist, cover: s.coverImageURL, indices: [] };
    artistMap[s.artist].indices.push(i);
  });
  Object.values(artistMap).forEach(artist => {
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.innerHTML = `<div class="artist-card-avatar"><img src="${artist.cover}"><button class="artist-card-play"><i data-lucide="play"></i></button></div><p class="artist-card-name">${escapeHtml(artist.name)}</p><p class="artist-card-role">Artist</p>`;
    card.onclick = () => showArtist(artist);
    grid.appendChild(card);
  });
  safeLucide();
}

function showArtist(artist) {
  document.getElementById('artistHeroAvatar').innerHTML = `<img src="${artist.cover}" />`;
  document.getElementById('artistHeroName').textContent = artist.name;
  document.getElementById('artistHeroStats').textContent = `${artist.indices.length} tracks`;
  const listEl = document.getElementById('artistTrackList');
  listEl.innerHTML = '';
  artist.indices.forEach((songIdx, pos) => {
    const song = songs[songIdx];
    const row = document.createElement('div');
    row.className = 'artist-track-row';
    row.dataset.index = songIdx;
    row.innerHTML = `<span class="artist-track-num">${pos + 1}</span><div class="artist-track-cover"><img src="${song.coverImageURL}" /></div><div class="artist-track-meta"><span class="artist-track-title">${escapeHtml(song.title)}</span><span class="artist-track-subtitle">${escapeHtml(song.artist)}</span></div>`;
    row.onclick = () => loadTrack(songIdx);
    listEl.appendChild(row);
  });
  state.currentArtistIndices = artist.indices;
  showView('artist');
  safeLucide();
}

const CATEGORIES = [
  { label: 'Pop', bg: '#8D67AB', emoji: '🎤' },
  { label: 'Hip-Hop', bg: '#BA5D07', emoji: '🎧' },
  { label: 'Electronic', bg: '#0D73EC', emoji: '🎛️' },
  { label: 'R&B', bg: '#C62B2B', emoji: '🎵' },
  { label: 'Rock', bg: '#1E3264', emoji: '🎸' },
  { label: 'Latin', bg: '#DC148C', emoji: '💃' }
];

function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.style.background = cat.bg;
    card.innerHTML = `${escapeHtml(cat.label)}<span class="cat-emoji">${cat.emoji}</span>`;
    grid.appendChild(card);
  });
}

function renderSearchResults(query) {
  const grid = document.getElementById('searchGrid');
  grid.innerHTML = '';
  const q = query.trim().toLowerCase();
  if (!q) { grid.innerHTML = '<p class="empty-state">Start typing...</p>'; return; }
  const results = songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));

  // If local results found, display them
  if (results.length > 0) {
    results.forEach(song => grid.appendChild(createTrackCard(song, songs.indexOf(song))));
    safeLucide();
    return;
  }

  // No local results, fetch from YouTube
  if (YOUTUBE_API_KEY) {
    grid.innerHTML = '<p class="empty-state">Searching YouTube...</p>';
    searchYouTube(query).then(ytResults => {
      grid.innerHTML = '';
      if (ytResults.length === 0) {
        grid.innerHTML = '<p class="empty-state">No results found.</p>';
        return;
      }
      ytResults.forEach((song, idx) => {
        const card = createTrackCard(song, idx, true);
        card.style.opacity = '0.9';
        card.style.borderLeft = '3px solid var(--accent)';
        grid.appendChild(card);
      });
      safeLucide();
    });
  } else {
    grid.innerHTML = '<p class="empty-state">No results found. YouTube search not configured.</p>';
  }
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-btn').forEach(n => n.classList.remove('active'));

  const viewEl = document.getElementById(`view-${viewName}`);
  if (viewEl) viewEl.classList.add('active');
  const navBtn = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  if (navBtn) navBtn.classList.add('active');
  const mobileNavBtn = document.querySelector(`.mobile-nav-btn[data-view="${viewName}"]`);
  if (mobileNavBtn) mobileNavBtn.classList.add('active');

  const searchWrap = document.getElementById('topbarSearchWrap');
  if (searchWrap) searchWrap.style.display = viewName === 'search' ? 'flex' : 'none';

  if (viewHistory[viewHistory.length - 1] !== viewName) viewHistory.push(viewName);
  document.getElementById('mainContent').scrollTop = 0;
}

/* === EMPTY STATE === */
function showEmptyState() {
  const homeView = document.getElementById('view-home');
  homeView.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:24px;">
      <div style="font-size:4rem;">🎵</div>
      <h1 style="font-size:2.4rem;font-weight:700;margin:0;">Search for music to get started</h1>
      <p style="font-size:1.4rem;color:var(--text-secondary);margin:0;">Try searching for an artist or song</p>
    </div>
  `;
}

/* === RECOMMENDATIONS === */
async function generateRecommendations(trackIndex) {
  const track = songs[trackIndex];
  if (!track) return;

  const artist = track.artist;
  const relatedResults = await searchYouTube(`${artist} similar`);
  const discographyResults = await searchYouTube(`${artist} all songs`);

  displayRecommendations(relatedResults.slice(0, 5), discographyResults.slice(0, 5), artist);
}

function displayRecommendations(relatedTracks, discographyTracks, artist) {
  const homeView = document.getElementById('view-home');
  homeView.innerHTML = '';

  if (relatedTracks && relatedTracks.length > 0) {
    const section1 = document.createElement('section');
    section1.className = 'content-section';
    section1.innerHTML = '<h2 class="section-title">Similar to this track</h2>';
    const grid1 = document.createElement('div');
    grid1.className = 'track-grid';
    relatedTracks.forEach((track, idx) => grid1.appendChild(createTrackCard(track, -1000 - idx, true)));
    section1.appendChild(grid1);
    homeView.appendChild(section1);
  }

  if (discographyTracks && discographyTracks.length > 0) {
    const section2 = document.createElement('section');
    section2.className = 'content-section';
    section2.innerHTML = `<h2 class="section-title">More from ${escapeHtml(artist)}</h2>`;
    const grid2 = document.createElement('div');
    grid2.className = 'track-grid';
    discographyTracks.forEach((track, idx) => grid2.appendChild(createTrackCard(track, -2000 - idx, true)));
    section2.appendChild(grid2);
    homeView.appendChild(section2);
  }
}

/* === VIDEO OVERLAY LOGIC === */
let isVideoMode = false;

function toggleVideoOverlay() {
  const overlay = document.getElementById('videoOverlay');
  const isOpen = overlay.classList.contains('open');
  if (isOpen && !overlay.classList.contains('mini')) return closeVideoOverlay();
  if (isOpen && overlay.classList.contains('mini')) return expandVideo();
  if (state.currentTrackIndex === -1) return;
  openVideoFull();
}

function openVideoFull() {
  const song = songs[state.currentTrackIndex];
  const overlay = document.getElementById('videoOverlay');
  const playerWrapper = document.getElementById('yt-player-wrapper');

  document.getElementById('videoTitle').textContent = song.title;
  document.getElementById('videoSubtitle').textContent = song.artist + ' — Music Video';
  document.getElementById('videoMiniTitle').textContent = song.title;
  document.getElementById('videoMiniArtist').textContent = song.artist;
  document.getElementById('videoMiniCover').src = song.coverImageURL;

  playerWrapper.style.display = 'block';
  overlay.classList.remove('mini');
  overlay.classList.add('open');
  document.getElementById('btnVideo').classList.add('active');
  document.getElementById('videoMinimize').style.display = '';
  document.getElementById('videoExpand').style.display = 'none';
  isVideoMode = true;
  safeLucide();
}

function minimizeVideo() {
  const overlay = document.getElementById('videoOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.add('mini');
  document.getElementById('videoMinimize').style.display = 'none';
  document.getElementById('videoExpand').style.display = '';
}

function expandVideo() {
  const overlay = document.getElementById('videoOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.remove('mini');
  overlay.classList.remove('theater');
  document.getElementById('videoMinimize').style.display = '';
  document.getElementById('videoExpand').style.display = 'none';
}

function toggleTheaterMode() {
  const overlay = document.getElementById('videoOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.toggle('theater');
  overlay.classList.remove('mini');
  document.getElementById('videoMinimize').style.display = '';
  document.getElementById('videoExpand').style.display = 'none';
}

function closeVideoOverlay() {
  const overlay = document.getElementById('videoOverlay');
  const playerWrapper = document.getElementById('yt-player-wrapper');

  playerWrapper.style.display = 'none';
  overlay.classList.remove('open', 'mini', 'theater');
  document.getElementById('btnVideo').classList.remove('active');

  if (state.currentTrackIndex !== -1 && state.isPlaying) setTimeout(() => ytPlayer.playVideo(), 100);
  isVideoMode = false;
}

/* === EVENTS & INITIALIZATION === */
document.addEventListener('DOMContentLoaded', () => {
  showEmptyState();
  renderLibraryList();
  renderCategories();
  safeLucide();

  document.querySelectorAll('.nav-item, .mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showView(btn.dataset.view);
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  document.getElementById('btnPlayPause').onclick = playPause;
  document.getElementById('btnNext').onclick = nextTrack;
  document.getElementById('btnPrev').onclick = prevTrack;
  document.getElementById('btnShuffle').onclick = function() { state.isShuffle = !state.isShuffle; this.classList.toggle('active'); };
  document.getElementById('btnRepeat').onclick = function() { state.isRepeat = !state.isRepeat; this.classList.toggle('active'); };

  document.getElementById('seekBar').oninput = (e) => seekTo(parseFloat(e.target.value));
  document.getElementById('volumeSlider').oninput = (e) => setVolume(parseInt(e.target.value, 10));
  document.getElementById('btnMute').onclick = toggleMute;

  document.getElementById('playerCover').closest('.player-cover-wrap').onclick = () => document.getElementById('nowPlayingOverlay').classList.add('open');
  document.getElementById('overlayClose').onclick = () => document.getElementById('nowPlayingOverlay').classList.remove('open');
  document.getElementById('btnFullscreen').onclick = () => document.getElementById('nowPlayingOverlay').classList.toggle('open');

  document.getElementById('overlayPlayPause').onclick = playPause;
  document.getElementById('overlayNext').onclick = nextTrack;
  document.getElementById('overlayPrev').onclick = prevTrack;
  document.getElementById('overlaySeekBar').oninput = (e) => seekTo(parseFloat(e.target.value));

  document.getElementById('btnVideo').onclick = toggleVideoOverlay;
  document.getElementById('videoClose').onclick = closeVideoOverlay;
  document.getElementById('videoTheater').onclick = toggleTheaterMode;
  document.getElementById('videoMinimize').onclick = minimizeVideo;
  document.getElementById('videoExpand').onclick = expandVideo;
  document.getElementById('videoMiniExpand').onclick = expandVideo;
  document.getElementById('videoMiniClose').onclick = closeVideoOverlay;

  document.getElementById('searchInput').oninput = (e) => {
    showView('search');
    renderSearchResults(e.target.value);
  };

  document.getElementById('sidebarToggle').onclick = () => document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('artistBackBtn').onclick = () => {
    viewHistory.pop();
    showView(viewHistory[viewHistory.length - 1] || 'home');
  };
  document.getElementById('artistPlayAllBtn').onclick = () => {
    if(state.currentArtistIndices.length) loadTrack(state.currentArtistIndices[0]);
  };
  document.getElementById('navBack').onclick = () => {
    if(viewHistory.length>1) { viewHistory.pop(); showView(viewHistory[viewHistory.length-1]); }
  };
});
