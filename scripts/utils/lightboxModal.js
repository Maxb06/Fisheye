let currentMediaIndex = 0;
let mediaData = [];

function openLightbox(index) {
  currentMediaIndex = index;
  const media = mediaData[currentMediaIndex];
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxVideo = document.querySelector('.lightbox-video');
  const lightboxDescription = document.querySelector('.lightbox-post-description');
  const lightboxModal = document.querySelector('.lightbox-modal');

  if (media.image) {
    lightboxImage.src = `/assets/photographers/${media.photographerId}/${media.image}`;
    lightboxImage.alt = media.title;
    lightboxImage.classList.remove('hide');
    lightboxVideo.classList.add('hide');
  } else if (media.video) {
    lightboxVideo.src = `/assets/photographers/${media.photographerId}/${media.video}`;
    lightboxVideo.classList.remove('hide');
    lightboxImage.classList.add('hide');
  }
  lightboxDescription.textContent = media.title;
  lightboxModal.showModal();
}

function closeLightbox() {
  const lightboxModal = document.querySelector('.lightbox-modal');
  lightboxModal.close();
}

function showPreviousMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaData.length) % mediaData.length;
  openLightbox(currentMediaIndex);
}

function showNextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaData.length;
  openLightbox(currentMediaIndex);
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    showPreviousMedia();
  } else if (event.key === 'ArrowRight') {
    showNextMedia();
  }
}

function initLightbox(mediaItems) {
  mediaData = mediaItems;
  const closeButton = document.querySelector('.lightbox-button-close-dialog');
  const prevButton = document.querySelector('.lightbox-button-previous');
  const nextButton = document.querySelector('.lightbox-button-next');

  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', showPreviousMedia);
  nextButton.addEventListener('click', showNextMedia);
  document.addEventListener('keydown', handleKeyDown);

  document.querySelectorAll('.media-card').forEach((card, index) => {
    card.addEventListener('click', () => openLightbox(index));
  });
}

export { initLightbox, openLightbox };
