//Mettre le code JavaScript lié à la page photographer.html

import { getPhotographers } from '../services/api.js';
import { Api } from '../services/api.js';
import { MediaCard } from '../templates/photographer.js';

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


/* Affiche la galerie sur la page photographe */

class App {
    constructor() {
        this.$mediasWrapper = document.querySelector('.media-wrapper')
        this.api = new Api('/data/photographers.json')
    }

    async main() {
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        const data = await this.api.getPhotographersId()
        const photographerMedias = data.media.filter(media => media.photographerId === parseInt(photographerId));

        photographerMedias.forEach(media => {
            const Template = new MediaCard(media);
            this.$mediasWrapper.appendChild(Template.createMediaCard())
        });
    }
}

const app = new App()
app.main()
