import { setupSortOptions, sortMedia } from '../utils/sortSelect.js';
import { getPhotographers } from '../services/api.js';
import { photographerDetailsTemplate, createMediaCard, infoTemplate } from '../templates/photographer.js';
import { initLightbox, openLightbox } from '../utils/lightboxModal.js';

let mediaData = [];
let sortedMedia = [];

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  const { photographers, media } = await getPhotographers();
  const photographer = photographers.find(p => p.id === parseInt(photographerId));

  if (photographer) {
    photographerDetailsTemplate(photographer);
    mediaData = media.filter(m => m.photographerId === photographer.id);
    sortedMedia = sortMedia('likes', mediaData);
    displayMedia(sortedMedia);
    infoTemplate(photographer);
  } else {
    console.error('Photographe non trouvé');
  }

  // Prépare les éléments pour la config du tri
  const sortSelectButton = document.getElementById('sort-select');
  const customOptions = document.querySelector('.custom-options');
  setupSortOptions(sortSelectButton, customOptions, mediaData, displayMedia);

  // initialise la lightbox
  initLightbox(sortedMedia);
}

// Fonction pour afficher les médias dans la galerie
function displayMedia(mediaItems) {
  const gallery = document.getElementById('media-gallery');
  gallery.innerHTML = '';
  mediaItems.forEach((media, index) => {
    const mediaCard = createMediaCard(media);

    // Ecouteurs d'événements seulement pour img et video
    const mediaElement = mediaCard.querySelector('img, video');
    if (mediaElement) {
      mediaElement.addEventListener('click', (event) => {
        event.stopPropagation();
        openLightbox(index);
      });
    }

    // Empêche la propagation sur le conteneur .media-info
    const mediaInfo = mediaCard.querySelector('.media-info');
    if (mediaInfo) {
      mediaInfo.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    gallery.appendChild(mediaCard);
  });
  initLightbox(mediaItems); // Réinitialiser la lightbox avec le nouvel ordre
}

document.addEventListener('DOMContentLoaded', init);
