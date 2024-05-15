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
    infoTemplate(photographer, mediaData);
    updateTotalLikes();
  } else {
    console.error('Photographe non trouvé');
  }

  // la config du tri
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
    mediaCard.setAttribute('data-id', media.id);

    // Ecouteurs d'événements seulement pour img et video
    const mediaElement = mediaCard.querySelector('img, video');
    if (mediaElement) {
      mediaElement.addEventListener('click', (event) => {
        event.stopPropagation();
        openLightbox(index);
      });
    }

    // Empêche la propagation du clic sur le conteneur .media-info
    const mediaInfo = mediaCard.querySelector('.media-info');
    if (mediaInfo) {
      mediaInfo.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    gallery.appendChild(mediaCard);
  });
  setupLikeButtons(mediaItems);
  initLightbox(mediaItems);
}

function setupLikeButtons(mediaItems) {
  mediaItems.forEach((media) => {
    const mediaCard = document.querySelector(`.media-card[data-id='${media.id}']`);
    if (mediaCard) {
      const likeIcon = mediaCard.querySelector('.like-icon');
      const likeCount = mediaCard.querySelector('.like-count');
      likeIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        let currentLikes = parseInt(likeCount.textContent, 10);
        if (!likeIcon.classList.contains('liked')) {
          likeIcon.classList.add('liked');
          likeCount.textContent = currentLikes + 1;
          media.likes++; // Incrémente le nombre de likes 
        } else {
          likeIcon.classList.remove('liked');
          likeCount.textContent = currentLikes - 1;
          media.likes--; // Décrémente le nombre de likes
        }
        updateTotalLikes();
      });
    }
  });
}

function updateTotalLikes() {
  const totalLikes = mediaData.reduce((acc, media) => acc + media.likes, 0);
  const totalLikesElement = document.getElementById('total-likes');
  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
    const likeIcon = document.createElement('i');
    likeIcon.className = 'fa-solid fa-heart like-icon';
    const parent = totalLikesElement.parentNode;
    if (parent) {
      parent.innerHTML = '';
      parent.appendChild(totalLikesElement);
      parent.appendChild(likeIcon);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
