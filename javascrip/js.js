document.addEventListener('DOMContentLoaded', function () {
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeButton = document.querySelector('.lightbox-close');

  function openLightbox(src, alt, type) {
    if (type === 'video') {
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      const source = lightboxVideo.querySelector('source') || document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      if (!lightboxVideo.querySelector('source')) {
        lightboxVideo.appendChild(source);
      }
      lightboxVideo.load();
    } else {
      lightboxVideo.style.display = 'none';
      lightboxImage.style.display = 'block';
      lightboxImage.src = src;
      lightboxImage.alt = alt;
    }
    lightboxCaption.textContent = alt || 'Artwork';
    lightboxOverlay.classList.add('open');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('open');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxVideo.pause();
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.artwork img').forEach((img) => {
    img.addEventListener('click', function () {
      const videoSrc = img.getAttribute('data-video');
      if (videoSrc) {
        openLightbox(videoSrc, img.alt, 'video');
      } else {
        openLightbox(img.src, img.alt, 'image');
      }
    });
    img.style.cursor = 'zoom-in';
  });

  document.querySelectorAll('.artwork video').forEach((video) => {
    video.addEventListener('click', function () {
      openLightbox(video.querySelector('source').src, video.alt || 'Animation', 'video');
    });
    video.style.cursor = 'zoom-in';
  });

  closeButton.addEventListener('click', closeLightbox);

  lightboxOverlay.addEventListener('click', function (event) {
    if (event.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightboxOverlay.classList.contains('open')) {
      closeLightbox();
    }
  });
});
