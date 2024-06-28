const API_KEY = 'AIzaSyDtJ4RaXg1HZSyh7oSoGTiF7AJKZI1sHtE';
const CHANNEL_ID = 'UCl2IeC8anS0ae_nOYYkjSFg';
const MAX_RESULTS = 10;

function createVideoElement(video) {
  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'video';
  videoWrapper.dataset.videoId = video.id.videoId;

  const thumbnail = video.snippet.thumbnails.high.url;
  const title = video.snippet.title;

  videoWrapper.innerHTML = `
    <img src="${thumbnail}" alt="${title}">
    <div class="video-content">
      <p class="video-title">${title}</p>
    </div>
  `;

  return videoWrapper;
}

async function fetchVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
  const data = await response.json();
  const videosContainer = document.getElementById('videos');
  
  data.items.forEach(item => {
    if (item.id.kind === 'youtube#video') {
      const videoElement = createVideoElement(item);
      videosContainer.appendChild(videoElement);
    }
  });

  setupModal();
}

function setupModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeModal = document.getElementsByClassName('close')[0];
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  document.querySelectorAll('.video').forEach(video => {
    video.onclick = function() {
      const videoId = this.dataset.videoId;
      modalVideo.src = `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&rel=0`;
      modal.style.display = 'block';
    }
  });

  closeModal.onclick = function() {
    modal.style.display = 'none';
    modalVideo.src = '';
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      modalVideo.src = '';
    }
  }

  fullscreenBtn.onclick = function() {
    if (modalVideo.requestFullscreen) {
      modalVideo.requestFullscreen();
    } else if (modalVideo.mozRequestFullScreen) { /* Firefox */
      modalVideo.mozRequestFullScreen();
    } else if (modalVideo.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      modalVideo.webkitRequestFullscreen();
    } else if (modalVideo.msRequestFullscreen) { /* IE/Edge */
      modalVideo.msRequestFullscreen();
    }
  }
}

fetchVideos();



// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {
  shrinkHeader();
};

function shrinkHeader() {
  const header = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
};