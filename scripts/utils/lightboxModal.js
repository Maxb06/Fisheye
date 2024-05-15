let currentMediaIndex = 0;
let mediaData = [];

/**
 * Ouvre la lightbox avec le média spécifié par l'index.
 * @param {number} index - L'index du média à afficher dans la lightbox.
 */
export function openLightbox(index) {
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

/**
 * Ferme la lightbox.
 */
function closeLightbox() {
  const lightboxModal = document.querySelector('.lightbox-modal');
  lightboxModal.close();
}

/**
 * Affiche le média précédent dans la lightbox.
 */
function showPreviousMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaData.length) % mediaData.length;
  openLightbox(currentMediaIndex);
}

/**
 * Affiche le média suivant dans la lightbox.
 */
function showNextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaData.length;
  openLightbox(currentMediaIndex);
}

/**
 * Gère les événements de touches pour la navigation dans la lightbox.
 * @param {KeyboardEvent} event - L'événement de touche.
 */
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    showPreviousMedia();
  } else if (event.key === 'ArrowRight') {
    showNextMedia();
  }
}

/**
 * Initialise la lightbox avec les éléments média et les écouteurs d'événements.
 * @param {Array<Object>} mediaItems - Les éléments média à afficher dans la lightbox.
 */
export function initLightbox(mediaItems) {
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

