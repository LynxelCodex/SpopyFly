"""
Fix-all script for SpopyFly — writes via temp files then renames.
"""
import os
import time
import tempfile
import shutil

BASE = r'd:\Documents\GitHub\SpopyFly'

# ═══════════════════════════════════════════════════════════
# 1. script.js
# ═══════════════════════════════════════════════════════════
SCRIPT_JS = """/* ===================================================================
   SPOTIFY CLONE - script.js
   Pure Vanilla JavaScript + YouTube IFrame API
===================================================================

   HOW TO ADD MORE SONGS
   ---------------------
   Add a new object inside the `songs` array below, following
   this exact shape:

     {
       title:          'Song Title',
       artist:         'Artist Name',
       coverImageURL:  'https://...image-url.jpg',
       youtubeVideoID: 'dQw4w9WgXcQ'
     }

   The YouTube ID is the part after "?v=" in a YouTube URL.
   e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ -> dQw4w9WgXcQ

=================================================================== */

/* ===================================================================
   1. SONG LIBRARY - Edit this array to add / remove tracks
=================================================================== */
const songs = [
  {
    title:          'Blinding Lights',
    artist:         'The Weeknd',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    youtubeVideoID: '4NRXx6U8ABQ'
  },
  {
    title:          'Shape of You',
    artist:         'Ed Sheeran',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    youtubeVideoID: 'JGwWNGJdvx8'
  },
  {
    title:          'Stay',
    artist:         'The Kid LAROI & Justin Bieber',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e14',
    youtubeVideoID: 'kTJczUoc26U'
  },
  {
    title:          'Levitating',
    artist:         'Dua Lipa',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f',
    youtubeVideoID: 'TUVcZfQe-Kw'
  },
  {
    title:          'Peaches',
    artist:         'Justin Bieber',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27312a2db8bb4c0d525c00bd2b9',
    youtubeVideoID: 'tQ0yjYUFKAE'
  },
  {
    title:          'drivers license',
    artist:         'Olivia Rodrigo',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27384a87d439bdb2b37c10e9d0c',
    youtubeVideoID: 'ZmDBbnmKpqQ'
  },
  {
    title:          'Watermelon Sugar',
    artist:         'Harry Styles',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
    youtubeVideoID: 'E07s5ZYygMg'
  },
  {
    title:          'Save Your Tears',
    artist:         'The Weeknd',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    youtubeVideoID: 'LIIDh-qI9oI'
  },
  {
    title:          'Good 4 U',
    artist:         'Olivia Rodrigo',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27384a87d439bdb2b37c10e9d0c',
    youtubeVideoID: 'gNi_6U5Pm_o'
  },
  {
    title:          'Montero',
    artist:         'Lil Nas X',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd',
    youtubeVideoID: '6swmTBVI83k'
  },
  {
    title:          'Kiss Me More',
    artist:         'Doja Cat ft. SZA',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2736cbf4b0e3f2c31d0b2b3f3b6',
    youtubeVideoID: '0EVVKs6DKA0'
  },
  {
    title:          'Bad Guy',
    artist:         'Billie Eilish',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273c6f7af36bc1f8b953d4dc274',
    youtubeVideoID: 'DyDfgMOUjCI'
  },
  // --- Taylor Swift - 1989 ---
  {
    title:          'Blank Space',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'e-ORhEE9VVg'
  },
  {
    title:          'Style',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: '-CmadmM5cOk'
  },
  {
    title:          'Shake It Off',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'nfWlot6h_JM'
  },
  {
    title:          'Bad Blood',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'QcIy9NiNbmo'
  },
  {
    title:          'Wildest Dreams',
    artist:         'Taylor Swift',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b7ddfc14f36e4f3a7f805a5a',
    youtubeVideoID: 'IdneKLhc5LM'
  },
  // --- Fleetwood Mac - Rumours ---
  {
    title:          'Dreams',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'Y3ywicfc0Lc'
  },
  {
    title:          'Go Your Own Way',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: '6ul-cZyuYq4'
  },
  {
    title:          "Don't Stop",
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'SyTvR1vWfB8'
  },
  {
    title:          'The Chain',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'PCXpE2856yY'
  },
  {
    title:          'Never Going Back Again',
    artist:         'Fleetwood Mac',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273e9112fa1dbab69da97992983',
    youtubeVideoID: 'sKkWg2kRAl4'
  },
  // --- Kendrick Lamar - DAMN. ---
  {
    title:          'HUMBLE.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'tvTRZJ-4EyI'
  },
  {
    title:          'DNA.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'NLZRYQMLDW4'
  },
  {
    title:          'LOYALTY.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'Dlg-P005U-Y'
  },
  {
    title:          'ELEMENT.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'glaG64Ao7sM'
  },
  {
    title:          'LOVE.',
    artist:         'Kendrick Lamar',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699',
    youtubeVideoID: 'ox7RsX1Ee34'
  },
  // --- Daft Punk - Discovery ---
  {
    title:          'One More Time',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0',
    youtubeVideoID: 'FGBhQbmPwH8'
  },
  {
    title:          'Aerodynamic',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0',
    youtubeVideoID: 'L93-7vRfxNs'
  },
  {
    title:          'Digital Love',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0',
    youtubeVideoID: 'QOngRDVtEQI'
  },
  {
    title:          'Harder, Better, Faster, Stronger',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0',
    youtubeVideoID: 'gAjR4_CbPpQ'
  },
  {
    title:          'Something About Us',
    artist:         'Daft Punk',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2f4264e1868a3c0',
    youtubeVideoID: 'em0MknB6wVw'
  },
  // --- Adele - 25 ---
  {
    title:          'Hello',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'YQHsXMglC9A'
  },
  {
    title:          'Send My Love (To Your New Lover)',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'fk4BbF7B29w'
  },
  {
    title:          'When We Were Young',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'DDWKuo3gXMQ'
  },
  {
    title:          'Water Under the Bridge',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'tE9F3fSoVVo'
  },
  {
    title:          'Remedy',
    artist:         'Adele',
    coverImageURL:  'https://i.scdn.co/image/ab67616d0000b27318ff24f5a3f2db1901a14da9',
    youtubeVideoID: 'rH4lP2lRlc0'
  }
];

/* ===================================================================
   2. GLOBAL STATE
=================================================================== */
const state = {
  currentTrackIndex: -1,
  isPlaying:         false,
  volume:            70,
  isMuted:           false,
  isShuffle:         false,
  isRepeat:          false,
  isLiked:           false,
  progressInterval:  null,
  ytReady:           false,
  recentlyPlayed:    []
};

/* ===================================================================
   3. YOUTUBE IFRAME API BOOTSTRAP
=================================================================== */
let ytPlayer = null;

(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width:  '1',
    playerVars: {
      autoplay:       0,
      controls:       0,
      disablekb:      1,
      enablejsapi:    1,
      modestbranding: 1,
      rel:            0,
      showinfo:       0
    },
    events: {
      onReady:       onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError:       onPlayerError
    }
  });
};

function onPlayerReady() {
  state.ytReady = true;
  setVolume(state.volume);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    handleTrackEnd();
  }
  if (event.data === YT.PlayerState.PLAYING) {
    state.isPlaying = true;
    updatePlayPauseUI();
    startProgressTracking();
  }
  if (event.data === YT.PlayerState.PAUSED) {
    state.isPlaying = false;
    updatePlayPauseUI();
    stopProgressTracking();
  }
}

function onPlayerError(event) {
  console.warn('YouTube player error:', event.data);
  setTimeout(nextTrack, 1500);
}

/* ===================================================================
   4. PLAYBACK CONTROLS
=================================================================== */
function loadTrack(index, autoplay = true) {
  if (!state.ytReady) { console.warn('YT player not ready yet'); return; }
  if (index < 0 || index >= songs.length) return;

  const song = songs[index];

  document.querySelectorAll('.track-card.playing, .featured-card.playing').forEach(el => {
    el.classList.remove('playing');
  });

  state.currentTrackIndex = index;

  state.recentlyPlayed = [index, ...state.recentlyPlayed.filter(i => i !== index)].slice(0, 6);
  renderRecentGrid();

  document.getElementById('playerTitle').textContent  = song.title;
  document.getElementById('playerArtist').textContent = song.artist;
  document.getElementById('playerCover').src          = song.coverImageURL;
  document.getElementById('playerCover').alt          = song.title + ' album art';

  document.getElementById('overlayTitle').textContent  = song.title;
  document.getElementById('overlayArtist').textContent = song.artist;
  document.getElementById('overlayArt').src            = song.coverImageURL;

  document.querySelectorAll('[data-index="' + index + '"]').forEach(el => el.classList.add('playing'));

  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('seekBar').value            = 0;
  document.getElementById('currentTime').textContent  = '0:00';
  document.getElementById('totalTime').textContent    = '0:00';

  state.isLiked = false;
  document.getElementById('playerLike').classList.remove('liked');
  var likeIcon = document.querySelector('#playerLike svg');
  if (likeIcon) likeIcon.style.fill = 'none';

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

  if (state.isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
}

function nextTrack() {
  if (state.isShuffle) {
    var next;
    do { next = Math.floor(Math.random() * songs.length); }
    while (next === state.currentTrackIndex && songs.length > 1);
    loadTrack(next);
  } else {
    loadTrack((state.currentTrackIndex + 1) % songs.length);
  }
}

function prevTrack() {
  if (state.ytReady && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() > 3) {
    ytPlayer.seekTo(0, true);
  } else {
    var prev = (state.currentTrackIndex - 1 + songs.length) % songs.length;
    loadTrack(prev);
  }
}

function handleTrackEnd() {
  if (state.isRepeat) {
    ytPlayer.seekTo(0, true);
    ytPlayer.playVideo();
  } else {
    nextTrack();
  }
}

function setVolume(vol) {
  state.volume = Math.max(0, Math.min(100, vol));
  if (state.ytReady && ytPlayer.setVolume) ytPlayer.setVolume(state.volume);
  document.getElementById('volumeFill').style.width = state.volume + '%';
  document.getElementById('volumeSlider').value     = state.volume;
  updateVolumeIcon();
}

function toggleMute() {
  if (!state.ytReady) return;
  state.isMuted = !state.isMuted;
  if (state.isMuted) {
    ytPlayer.mute();
    document.getElementById('volumeFill').style.width = '0%';
  } else {
    ytPlayer.unMute();
    document.getElementById('volumeFill').style.width = state.volume + '%';
  }
  updateVolumeIcon();
}

function updateVolumeIcon() {
  var icon = document.getElementById('volIcon');
  var vol  = state.isMuted ? 0 : state.volume;
  icon.setAttribute('data-lucide', vol === 0 ? 'volume-x' : vol < 50 ? 'volume-1' : 'volume-2');
  lucide.createIcons();
}

/* ===================================================================
   5. PROGRESS / SEEK BAR
=================================================================== */
function startProgressTracking() {
  stopProgressTracking();
  state.progressInterval = setInterval(updateProgress, 500);
}

function stopProgressTracking() {
  if (state.progressInterval) {
    clearInterval(state.progressInterval);
    state.progressInterval = null;
  }
}

function updateProgress() {
  if (!state.ytReady || !ytPlayer.getCurrentTime) return;
  try {
    var current  = ytPlayer.getCurrentTime();
    var duration = ytPlayer.getDuration();
    if (!duration || isNaN(duration) || duration === 0) return;

    var pct = (current / duration) * 100;

    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('seekBar').value            = pct;
    document.getElementById('currentTime').textContent  = formatTime(current);
    document.getElementById('totalTime').textContent    = formatTime(duration);

    // Also update overlay progress
    var overlayFill = document.getElementById('overlayProgressFill');
    var overlaySeek = document.getElementById('overlaySeekBar');
    var overlayCurrentTime = document.getElementById('overlayCurrentTime');
    var overlayTotalTime   = document.getElementById('overlayTotalTime');
    if (overlayFill) overlayFill.style.width = pct + '%';
    if (overlaySeek) overlaySeek.value = pct;
    if (overlayCurrentTime) overlayCurrentTime.textContent = formatTime(current);
    if (overlayTotalTime)   overlayTotalTime.textContent   = formatTime(duration);
  } catch (e) { /* player not in a seekable state */ }
}

function seekTo(pct) {
  if (!state.ytReady || !ytPlayer.getDuration) return;
  try {
    var duration = ytPlayer.getDuration();
    ytPlayer.seekTo((pct / 100) * duration, true);
  } catch (e) {}
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  var m = Math.floor(seconds / 60);
  var s = Math.floor(seconds % 60);
  return m + ':' + s.toString().padStart(2, '0');
}

/* ===================================================================
   6. UI RENDER HELPERS
=================================================================== */
function updatePlayPauseUI() {
  var icon = document.getElementById('playIcon');
  icon.setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');

  var overlayPlayIcon = document.getElementById('overlayPlayIcon');
  if (overlayPlayIcon) {
    overlayPlayIcon.setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
  }

  document.querySelectorAll('.track-card').forEach(function(card) {
    var idx = parseInt(card.dataset.index, 10);
    if (idx === state.currentTrackIndex) {
      card.classList.add('playing');
      var btn = card.querySelector('.card-play-btn i');
      if (btn) {
        btn.setAttribute('data-lucide', state.isPlaying ? 'pause' : 'play');
      }
    } else {
      card.classList.remove('playing');
      var btn2 = card.querySelector('.card-play-btn i');
      if (btn2) btn2.setAttribute('data-lucide', 'play');
    }
  });
  lucide.createIcons();
}

function createTrackCard(song, index) {
  var card = document.createElement('div');
  card.className = 'track-card';
  card.dataset.index = index;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', 'Play ' + song.title + ' by ' + song.artist);

  card.innerHTML =
    '<div class="card-cover">' +
      '<img src="' + song.coverImageURL + '" alt="' + escapeHtml(song.title) + ' album art" loading="lazy" />' +
      '<button class="card-play-btn" aria-label="Play ' + escapeHtml(song.title) + '">' +
        '<i data-lucide="play"></i>' +
      '</button>' +
      '<span class="card-now-playing">Playing</span>' +
    '</div>' +
    '<div class="card-body">' +
      '<p class="card-title">' + escapeHtml(song.title) + '</p>' +
      '<p class="card-artist">' +
        '<span class="card-equalizer">' +
          '<span class="eq-bar"></span>' +
          '<span class="eq-bar"></span>' +
          '<span class="eq-bar"></span>' +
          '<span class="eq-bar"></span>' +
        '</span>' +
        escapeHtml(song.artist) +
      '</p>' +
    '</div>';

  card.addEventListener('click', function() {
    if (state.currentTrackIndex === index) {
      playPause();
    } else {
      loadTrack(index);
    }
  });

  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });

  return card;
}

function createFeaturedCard(song, index) {
  var card = document.createElement('div');
  card.className = 'featured-card';
  card.dataset.index = index;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', 'Play ' + song.title);

  card.innerHTML =
    '<div class="featured-cover">' +
      '<img src="' + song.coverImageURL + '" alt="' + escapeHtml(song.title) + '" />' +
    '</div>' +
    '<span class="featured-title">' + escapeHtml(song.title) + '</span>' +
    '<button class="featured-play-btn" aria-label="Play ' + escapeHtml(song.title) + '">' +
      '<i data-lucide="play"></i>' +
    '</button>';

  card.addEventListener('click', function() {
    if (state.currentTrackIndex === index) {
      playPause();
    } else {
      loadTrack(index);
    }
  });
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });

  return card;
}

function renderTrackGrid() {
  var grid = document.getElementById('trackGrid');
  grid.innerHTML = '';
  songs.forEach(function(song, i) {
    grid.appendChild(createTrackCard(song, i));
    grid.lastChild.style.animationDelay = (i * 0.04) + 's';
  });
  lucide.createIcons();
}

function renderFeaturedGrid() {
  var grid = document.getElementById('featuredGrid');
  grid.innerHTML = '';
  songs.slice(0, 6).forEach(function(song, i) {
    grid.appendChild(createFeaturedCard(song, i));
    grid.lastChild.style.animationDelay = (i * 0.05) + 's';
  });
  lucide.createIcons();
}

function renderRecentGrid() {
  var grid = document.getElementById('recentGrid');
  grid.innerHTML = '';
  if (state.recentlyPlayed.length === 0) {
    grid.innerHTML = '<p class="empty-state">Nothing played yet...</p>';
    return;
  }
  state.recentlyPlayed.forEach(function(i) {
    grid.appendChild(createTrackCard(songs[i], i));
  });
  lucide.createIcons();
}

function renderLibraryList() {
  var list = document.getElementById('libraryList');
  list.innerHTML = '';
  songs.forEach(function(song, i) {
    var item = document.createElement('div');
    item.className = 'library-item';
    item.dataset.index = i;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.innerHTML =
      '<div class="library-item-cover">' +
        '<img src="' + song.coverImageURL + '" alt="' + escapeHtml(song.title) + '" />' +
      '</div>' +
      '<div class="library-item-meta">' +
        '<p class="library-item-title">' + escapeHtml(song.title) + '</p>' +
        '<p class="library-item-sub">Song - ' + escapeHtml(song.artist) + '</p>' +
      '</div>' +
      '<span class="library-item-duration">-</span>';
    item.addEventListener('click', function() { loadTrack(i); });
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadTrack(i); }
    });
    list.appendChild(item);
    item.style.animationDelay = (i * 0.03) + 's';
  });
  lucide.createIcons();
}

var CATEGORIES = [
  { label: 'Pop',        bg: '#8D67AB', emoji: '\\uD83C\\uDFA4' },
  { label: 'Hip-Hop',    bg: '#BA5D07', emoji: '\\uD83C\\uDFA7' },
  { label: 'Electronic', bg: '#0D73EC', emoji: '\\uD83C\\uDF9B' },
  { label: 'R&B',        bg: '#C62B2B', emoji: '\\uD83C\\uDFB5' },
  { label: 'Rock',       bg: '#1E3264', emoji: '\\uD83C\\uDFB8' },
  { label: 'Latin',      bg: '#DC148C', emoji: '\\uD83D\\uDC83' },
  { label: 'Indie',      bg: '#477D95', emoji: '\\uD83C\\uDF31' },
  { label: 'Soul',       bg: '#148A08', emoji: '\\uD83C\\uDFB7' }
];

function renderCategories() {
  var grid = document.getElementById('categoryGrid');
  grid.innerHTML = '';
  CATEGORIES.forEach(function(cat) {
    var card = document.createElement('div');
    card.className = 'category-card';
    card.style.background = cat.bg;
    card.innerHTML = escapeHtml(cat.label) + '<span class="cat-emoji">' + cat.emoji + '</span>';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    grid.appendChild(card);
  });
}

function renderSearchResults(query) {
  var grid = document.getElementById('searchGrid');
  grid.innerHTML = '';

  var q = query.trim().toLowerCase();
  if (!q) {
    grid.innerHTML = '<p class="empty-state">Start typing to search tracks...</p>';
    return;
  }

  var results = songs.filter(function(s) {
    return s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
  });

  if (results.length === 0) {
    grid.innerHTML = '<p class="empty-state">No results found.</p>';
    return;
  }

  results.forEach(function(song) {
    var i = songs.indexOf(song);
    grid.appendChild(createTrackCard(song, i));
  });
  lucide.createIcons();
}

/* ===================================================================
   7. NAVIGATION / VIEWS
=================================================================== */
function showView(viewName) {
  document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });

  var viewEl = document.getElementById('view-' + viewName);
  if (viewEl) viewEl.classList.add('active');

  var navBtn = document.querySelector('.nav-item[data-view="' + viewName + '"]');
  if (navBtn) navBtn.classList.add('active');

  // FIX: search bar was always visible (both branches returned 'flex')
  var searchWrap = document.getElementById('topbarSearchWrap');
  if (searchWrap) {
    searchWrap.style.display = viewName === 'search' ? 'flex' : 'none';
  }

  document.getElementById('mainContent').scrollTop = 0;
}

/* ===================================================================
   8. EVENT LISTENERS
=================================================================== */
function bindEvents() {
  document.querySelectorAll('.nav-item').forEach(function(btn) {
    btn.addEventListener('click', function() { showView(btn.dataset.view); });
  });

  document.getElementById('btnPlayPause').addEventListener('click', playPause);
  document.getElementById('btnNext').addEventListener('click', nextTrack);
  document.getElementById('btnPrev').addEventListener('click', prevTrack);

  document.getElementById('btnShuffle').addEventListener('click', function () {
    state.isShuffle = !state.isShuffle;
    this.classList.toggle('active', state.isShuffle);
  });

  document.getElementById('btnRepeat').addEventListener('click', function () {
    state.isRepeat = !state.isRepeat;
    this.classList.toggle('active', state.isRepeat);
  });

  var seekBar = document.getElementById('seekBar');
  seekBar.addEventListener('input', function() { seekTo(parseFloat(seekBar.value)); });

  var volSlider = document.getElementById('volumeSlider');
  volSlider.addEventListener('input', function() { setVolume(parseInt(volSlider.value, 10)); });

  document.getElementById('btnMute').addEventListener('click', toggleMute);

  document.getElementById('playerLike').addEventListener('click', function () {
    state.isLiked = !state.isLiked;
    this.classList.toggle('liked', state.isLiked);
    var svg = this.querySelector('svg');
    if (svg) svg.style.fill = state.isLiked ? 'var(--accent)' : 'none';
  });

  document.getElementById('playerCover').closest('.player-cover-wrap').addEventListener('click', function() {
    document.getElementById('nowPlayingOverlay').classList.add('open');
  });
  document.getElementById('overlayClose').addEventListener('click', function() {
    document.getElementById('nowPlayingOverlay').classList.remove('open');
  });
  document.getElementById('btnFullscreen').addEventListener('click', function() {
    document.getElementById('nowPlayingOverlay').classList.toggle('open');
  });

  // Overlay controls
  var overlayPlayPause = document.getElementById('overlayPlayPause');
  if (overlayPlayPause) overlayPlayPause.addEventListener('click', playPause);
  var overlayNext = document.getElementById('overlayNext');
  if (overlayNext) overlayNext.addEventListener('click', nextTrack);
  var overlayPrev = document.getElementById('overlayPrev');
  if (overlayPrev) overlayPrev.addEventListener('click', prevTrack);
  var overlaySeekBar = document.getElementById('overlaySeekBar');
  if (overlaySeekBar) overlaySeekBar.addEventListener('input', function() { seekTo(parseFloat(overlaySeekBar.value)); });

  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function() {
    showView('search');
    renderSearchResults(searchInput.value);
  });
  searchInput.addEventListener('focus', function() { showView('search'); });

  var toggle  = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');
  toggle.addEventListener('click', function() { sidebar.classList.toggle('open'); });

  document.getElementById('mainContent').addEventListener('click', function() {
    if (window.innerWidth <= 768) sidebar.classList.remove('open');
  });

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        playPause();
        break;
      case 'ArrowRight':
        if (e.shiftKey) { e.preventDefault(); nextTrack(); }
        break;
      case 'ArrowLeft':
        if (e.shiftKey) { e.preventDefault(); prevTrack(); }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(state.volume + 5);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(state.volume - 5);
        break;
      case 'KeyM':
        toggleMute();
        break;
    }
  });

  document.querySelector('.volume-wrap').addEventListener('wheel', function(e) {
    e.preventDefault();
    setVolume(state.volume + (e.deltaY < 0 ? 5 : -5));
  }, { passive: false });
}

/* ===================================================================
   9. UTILITY
=================================================================== */
function escapeHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/\\"/g, '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ===================================================================
   10. INIT
=================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  renderFeaturedGrid();
  renderTrackGrid();
  renderRecentGrid();
  renderLibraryList();
  renderCategories();
  bindEvents();
  showView('home');
  document.getElementById('volumeFill').style.width = state.volume + '%';
  lucide.createIcons();

  var hour = new Date().getHours();
  var greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  var titleEl = document.querySelector('#view-home .section-title');
  if (titleEl) titleEl.textContent = greeting;

  console.log(
    '%c SpopyFly Ready ',
    'background:#1DB954;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;',
    '\\n' + songs.length + ' tracks loaded.\\nKeyboard shortcuts: Space=play/pause, Shift+arrow=next/prev, arrows=volume, M=mute'
  );
});
"""

# small helper: write to temp then move
def safe_write(filepath, content):
    dirn = os.path.dirname(filepath)
    # Write to a temp file in the same directory
    tmp_path = filepath + '.tmp'
    with open(tmp_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    # Now remove original and rename
    try:
        os.remove(filepath)
    except:
        pass
    os.rename(tmp_path, filepath)
    print('OK: ' + os.path.basename(filepath) + ' (' + str(len(content)) + ' bytes)')


# Write script.js
safe_write(os.path.join(BASE, 'script.js'), SCRIPT_JS)
print('All done!')
