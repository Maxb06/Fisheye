//Mettre le code JavaScript lié à la page photographer.html

import { getPhotographers } from '../services/api.js';
import { Api } from '../services/api.js';
import { MediaCard } from '../templates/photographer.js';

// Déclaration des variables
const sortSelect = document.getElementById('sort-select');
const videoThumbnails = document.querySelectorAll('.video-wrapper');

/**
 * Affiche les données du photographe dans le header de la page photographer.html.
 * @param {Object} photographer - Les données du photographe à afficher.
 */
async function displayPhotographerDetails(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    if (photographerSection) {
        const { name, tagline, city, country, portrait } = photographer;

        // Création des éléments div pour le texte du photographe
        const photographerText = document.createElement('div');
        photographerText.classList.add('photographer-text');
        photographerText.innerHTML = `<h1>${name}</h1><p class="location">${city}, ${country}</p><p>${tagline}</p>`;

        // Création de l'élément img pour le portrait du photographe
        const photographerPortrait = document.createElement('div');
        photographerPortrait.classList.add('photographer-portrait');
        const portraitImg = document.createElement('img');
        portraitImg.src = `assets/photographers/${portrait}`;
        portraitImg.alt = name;
        photographerPortrait.appendChild(portraitImg);

        // Ajout des éléments au conteneur .photograph-header
        photographerSection.appendChild(photographerText);
        photographerSection.appendChild(photographerPortrait);
    } else {
        console.error("Section du photographe non trouvée dans le DOM.");
    }
}

/**
 * Charge les données des photographes et les affiche sur la page photographer.html.
 */
async function loadPhotographerDetails() {
    // Récupération de l'ID du photographe à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    console.log("ID du photographe : " + photographerId);

    // Appel de la fonction getPhotographers pour récupérer les données des photographes
    try {
        const { photographers } = await getPhotographers();
        // Recherche du photographe selon l'ID
        const photographer = photographers.find(p => p.id === parseInt(photographerId));
        if (photographer) {
            // les détails du photographe
            displayPhotographerDetails(photographer);
        } else {
            console.error('Photographe non trouvé');
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données des photographes:", error);
    }
}

// Appel de la fonction pour charger et afficher les détails du photographe
loadPhotographerDetails();

/**
 * Classe représentant l'application pour la page photographer.html.
 * Gère l'affichage des médias, le tri et les interactions utilisateur.
 */
class App {
    constructor() {
        this.$mediasWrapper = document.querySelector('.media-wrapper');
        this.api = new Api('/data/photographers.json');
        this.mediaData = null; // Garde une copie des données des médias pour le tri
        this.sortBy = 'likes'; // Critère de tri par défaut
    }

    /**
     * Méthode principale de l'application.
     * Charge les données des médias, les trie et les affiche.
     */
    async main() {
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        const data = await this.api.getPhotographersId();
        this.mediaData = data.media.filter(media => media.photographerId === parseInt(photographerId));

        this.sortMedia(); // Tri initial des médias
        this.displayMedia(); // Affichage initial des médias
    }

    /**
     * Trie les médias en fonction du critère sélectionné.
     */
    sortMedia() {
        // Tri des médias en fonction du critère sélectionné (ordre descendant)
        this.mediaData.sort((a, b) => {
            if (this.sortBy === 'likes') {
                return a.likes - b.likes; // Tri par nombre de likes
            } else if (this.sortBy === 'date') {
                return new Date(a.date) - new Date(b.date); // Tri par date
            } else if (this.sortBy === 'title') {
                return a.title.localeCompare(b.title); // Tri par titre
            }
        });
    }

    /**
     * Affiche les médias triés.
     */
    displayMedia() {
        // Efface les médias actuels
        this.$mediasWrapper.innerHTML = '';

        // Affiche les médias triés
        this.mediaData.forEach(media => {
            const Template = new MediaCard(media);
            this.$mediasWrapper.appendChild(Template.createMediaCard());
        });
    }

    /**
     * Gère le changement de critère de tri des médias.
     * @param {string} sortBy - Le critère de tri sélectionné.
     */
    handleSortChange(sortBy) {
        this.sortBy = sortBy; // Met à jour le critère de tri
        this.sortMedia(); // Trie les médias en fonction du nouveau critère
        this.displayMedia(); // Met à jour l'affichage des médias
    }
}

const app = new App();
app.main();

// Ajout de l'écouteur d'événements de changement
sortSelect.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    // Appel de la méthode handleSortChange de 'App' pour mettre à jour le tri des médias
    app.handleSortChange(sortBy);
});

videoThumbnails.forEach(thumbnail => {
    const playButton = thumbnail.querySelector('.play-button');
    // gestionnaire d'événements pour démarrer la lecture de la vidéo quand le bouton de lecture est cliqué
    playButton.addEventListener('click', () => {
        const video = thumbnail.querySelector('video');
        if (video) {
            video.play();
            playButton.classList.add('hide');
        }
    });
});

document.addEventListener('click', function (event) {
    const playButton = event.target.closest('.play-button');
    if (playButton) {
        const videoWrapper = playButton.closest('.video-wrapper');
        const video = videoWrapper.querySelector('video');
        if (video) {
            if (video.paused) {
                video.play();
                playButton.classList.add('hide');
            } else {
                video.pause();
                playButton.classList.remove('hide');
            }
        }
    } else {
        // Pour mettre en pause la vidéo si elle est en lecture et la recommencer une fois finie
        const video = event.target.closest('video');
        if (video && !video.paused) {
            video.pause();
            const playButton = video.closest('.video-wrapper').querySelector('.play-button');
            playButton.classList.remove('hide');
        } else if (video) {
            video.play();
        }
    }
});
