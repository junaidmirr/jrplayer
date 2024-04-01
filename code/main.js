

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
const overlay = document.getElementById('ovrly');
const vidInput = document.getElementById('vidInput');

const trackBackward = document.getElementById('trackbackward');
const playPause = document.getElementById('playPause');
const trackForward = document.getElementById('trackforward');

let isFullscreen = false;
let controlBarHideTimer;

// Modal overlay functionality
window.addEventListener('DOMContentLoaded', () => {
  modalOverlay.style.display = 'flex';
});

vidInput.addEventListener('change', () => {
  const selectedFile = vidInput.files[0];
  if (selectedFile) {
    const fileURL = URL.createObjectURL(selectedFile);
    video.src = fileURL;
    video.play();
    playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
    modalOverlay.style.display = 'none';
  }
});

playVideoBtn.addEventListener('click', () => {
  const videoLink = videoLinkInput.value;
  if (videoLink) {
    video.src = videoLink;
    video.play();
    playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
    modalOverlay.style.display = 'none';
  } else {
    // Handle case when no video link or file is selected
    console.log('Please enter a video link or select a video file.');
  }
});



vidInput.addEventListener('change', () => {
    const selectedFile = vidInput.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      const fileType = selectedFile.type;
  
      if (fileType.startsWith('audio/')) {
        // Handle audio files
        const audioElement = document.createElement('audio');
        audioElement.src = fileURL;
        audioElement.addEventListener('loadedmetadata', () => {
          const thumbnailUrl = getAudioThumbnailUrl(audioElement);
          if (thumbnailUrl) {
            video.poster = thumbnailUrl;
          } else {
            video.poster = 'https://i.ibb.co/G7QpZYk/logo.gif'; // Replace with the path to your custom GIF image
          }
          video.load();
          video.play();
          playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
          modalOverlay.style.display = 'none';
        });
      } else {
        // Handle video files
        video.src = fileURL;
        video.play();
        playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
        modalOverlay.style.display = 'none';
      }
    }
  });
  
  playVideoBtn.addEventListener('click', () => {
    const videoLink = videoLinkInput.value;
    if (videoLink) {
      const fileType = getFileTypeFromUrl(videoLink);
  
      if (fileType && fileType.startsWith('audio/')) {
        // Handle audio links
        const audioElement = document.createElement('audio');
        audioElement.src = videoLink;
        audioElement.addEventListener('loadedmetadata', () => {
          const thumbnailUrl = getAudioThumbnailUrl(audioElement);
          if (thumbnailUrl) {
            video.poster = thumbnailUrl;
          } else {
            video.poster = 'https://i.ibb.co/G7QpZYk/logo.gif'; // Replace with the path to your custom GIF image
          }
          video.load();
          video.play();
          playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
          modalOverlay.style.display = 'none';
        });
      } else {
        // Handle video links
        video.src = videoLink;
        video.play();
        playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
        modalOverlay.style.display = 'none';
      }
    } else {
      // Handle case when no video link or file is selected
      console.log('Please enter a video link or select a video file.');
    }
  });
  
  // Helper functions
  function getAudioThumbnailUrl(audioElement) {
    // Check if the audio file has a thumbnail image
    // You can use the appropriate metadata property or API to retrieve the thumbnail URL
    // Return the thumbnail URL if available, otherwise return null or an empty string
    return audioElement.poster || null;
  }
  
  function getFileTypeFromUrl(url) {
    // Extract the file type from the URL using the file extension or MIME type
    // Return the file type or null if it can't be determined
    const extension = url.split('.').pop().toLowerCase();
    const mimeTypes = {
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      // Add more file extensions and MIME types as needed
    };
    return mimeTypes[extension] || null;
  }
  



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
  const hours = Math.floor(video.currentTime / 3600);
  const minutes = Math.floor((video.currentTime % 3600) / 60);
  const seconds = Math.floor(video.currentTime % 60);
  currentTime.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Duration
video.addEventListener('loadedmetadata', () => {
  const hours = Math.floor(video.duration / 3600);
  const minutes = Math.floor((video.duration % 3600) / 60);
  const seconds = Math.floor(video.duration % 60);
  duration.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
});

// Volume
volumeBtn.addEventListener('click', () => {
  if (video.volume === 0) {
    video.volume = volumeSlider.value / 100;
    volumeBtn.innerHTML = '<box-icon name="volume-full" color="white" size="20px" class="sm:size-24px"></box-icon>';
  } else {
    video.volume = 0;
    volumeBtn.innerHTML = '<box-icon name="volume-mute" color="white" size="20px" class="sm:size-24px"></box-icon>';
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

// Keydown event listener for space bar and arrow keys
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    // Play/Pause video
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
      playPause.style.opacity="0%";
    } else {
      video.pause();
      playPauseBtn.innerHTML = '<box-icon name="play" color="white" size="24px"></box-icon>';
      playPause.style.opacity="80%";
    }
  } else if (event.code === 'ArrowLeft') {
    // Seek backward 5 seconds
    video.currentTime -= 5;
  } else if (event.code === 'ArrowRight') {
    // Seek forward 5 seconds
    video.currentTime += 5;
  }
});

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
      playPause.style.opacity="0%";
    
    } else {
      video.pause();
      playPauseBtn.innerHTML = '<box-icon name="play" color="white" size="24px"></box-icon>';
      playPause.style.opacity="80%";
    
    }
  });


  playPause.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = '<box-icon name="pause" color="white" size="24px"></box-icon>';
      playPause.style.opacity="0%";
    
    } else {
      video.pause();
      playPauseBtn.innerHTML = '<box-icon name="play" color="white" size="24px"></box-icon>';
      playPause.style.opacity="80%";
    
    }
  });


  trackBackward.addEventListener('click', () => {
    video.currentTime -= 5;
    trackBackward.style.opacity="50%";
    function timerFunction() {
        setTimeout(function() {
            trackBackward.style.opacity="0%";
        }, 300); // 2000 milliseconds = 2 seconds
    }
    
    // Call the timer function
    timerFunction();
  });

  trackForward.addEventListener('click', () => {
    video.currentTime += 5;
    trackForward.style.opacity="50%";
    function timerFunction() {
        setTimeout(function() {
            trackForward.style.opacity="0%";
        }, 300); // 2000 milliseconds = 2 seconds
    }
    
    // Call the timer function
    timerFunction();

  });
  

  document.addEventListener('DOMContentLoaded', function() {
    let mappedElement = null;
  
    document.addEventListener('click', function(event) {
      mappedElement = event.target;
 
    });
  
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space' && mappedElement !== null) {
        event.preventDefault();
       
      }
    });
  });
  // Add event listener to remove the click event after it's triggered once

  
