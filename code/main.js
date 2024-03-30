const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const settingsBtn = document.getElementById('settingsBtn');
const settingsCard = document.getElementById('settingsCard');
const playbackSpeedSelect = document.getElementById('playbackSpeed');
const videoQualitySelect = document.getElementById('videoQuality');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const playerContainer = document.querySelector('.player-container');
const modalOverlay = document.getElementById('modalOverlay');
const videoLinkInput = document.getElementById('videoLinkInput');
const bar = document.getElementById('controlBar');

let isFullscreen = false;
let controlBarHideTimer;

// Modal overlay functionality
window.addEventListener('DOMContentLoaded', () => {
  modalOverlay.style.display = 'flex';
});

playVideoBtn.addEventListener('click', () => {
  const videoLink = videoLinkInput.value;
  if (videoLink) {
      videoPlayer.src = videoLink;
      videoPlayer.play();
      playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
      modalOverlay.style.display = 'none';
  }
});

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<box-icon name="play" color="white" size="24px"></box-icon>';
  }
});

video.addEventListener('click', () => {
    if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<box-icon name="play" color="white" size="24px"></box-icon>';
  }

});

// Seek Bar
function updateSeekBarGradient() {
  const value = (seekBar.value / 100) * 100;
  seekBar.style.setProperty('--value', `${value}%`);
}

video.addEventListener('timeupdate', () => {
  seekBar.value = (video.currentTime / video.duration) * 100;
  updateCurrentTime();
  updateSeekBarGradient();
});

seekBar.addEventListener('input', () => {
  video.currentTime = (seekBar.value / 100) * video.duration;
  updateSeekBarGradient();
});

// Update Current Time
function updateCurrentTime() {
  const minutes = Math.floor(video.currentTime / 60);
  const seconds = Math.floor(video.currentTime % 60);
  currentTime.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Duration
video.addEventListener('loadedmetadata', () => {
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration % 60);
  duration.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
});

// Volume
volumeBtn.addEventListener('click', () => {
  if (video.volume === 0) {
    video.volume = volumeSlider.value / 100;
    volumeBtn.innerHTML = '<box-icon name="volume-full" color="white" size="24px"></box-icon>';
  } else {
    video.volume = 0;
    volumeBtn.innerHTML = '<box-icon name="volume-mute" color="white" size="24px"></box-icon>';
  }

});

volumeBtn.addEventListener('mouseover', function() {
 document.getElementById('volumeSlide').classList.remove('hidden');
});

document.getElementById('volumeSlider').addEventListener('mouseout', function() {
    document.getElementById('volumeSlide').classList.add('hidden');
});

volumeBtn.addEventListener('mousedown', function() {
    // Start the timer
    pressTimer = window.setTimeout(function() {
        // If the timer is still running, it means the button was pressed for longer than 500ms
        document.getElementById('volumeSlide').classList.remove('hidden');

    }, 500);
});

document.getElementById('contt').addEventListener('click', () => {
    document.getElementById('volumeSlide').classList.add('hidden');
    
});



volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value / 100;
});

// Settings Card
settingsBtn.addEventListener('click', () => {
  settingsCard.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  if (!settingsBtn.contains(event.target) && !settingsCard.contains(event.target)) {
    settingsCard.classList.add('hidden');
  }
});

// Playback Speed
playbackSpeedSelect.addEventListener('change', () => {
  video.playbackRate = playbackSpeedSelect.value;
});

// Video Quality
videoQualitySelect.addEventListener('change', () => {
  const selectedQuality = videoQualitySelect.value;
  // Replace the video source with the selected quality
  // You'll need to have multiple video sources available
});

// Fullscreen
fullscreenBtn.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (!isFullscreen) {
    enterFullscreen();

  } else {
    exitFullscreen();
  }
}




function enterFullscreen() {
  if (playerContainer.requestFullscreen) {
      playerContainer.requestFullscreen();
  } else if (playerContainer.webkitRequestFullscreen) {
      playerContainer.webkitRequestFullscreen();
  } else if (playerContainer.msRequestFullscreen) {
      playerContainer.msRequestFullscreen();
  }
  isFullscreen = true;

  // Hide control bar after 3 seconds of inactivity
  document.addEventListener('mousemove', resetControlBarHideTimer);
  controlBarHideTimer = setTimeout(hideControlBar, 3000);
}

function exitFullscreen() {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
  isFullscreen = false;

  // Show control bar and remove event listeners
  showControlBar();
  document.removeEventListener('mousemove', resetControlBarHideTimer);
  clearTimeout(controlBarHideTimer);
}

function hideControlBar() {
  bar.style.opacity = '0';
}

function showControlBar() {
  bar.style.opacity = '1';
}

function resetControlBarHideTimer() {
  clearTimeout(controlBarHideTimer);
  showControlBar();
  controlBarHideTimer = setTimeout(hideControlBar, 3000);
}
