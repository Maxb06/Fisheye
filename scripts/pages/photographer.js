//Mettre le code JavaScript lié à la page photographer.html

// Import de la fonction getPhotographers depuis service.js
import { getPhotographers } from '../api/service.js';

/**
 * Affiche les données du photographe sur la page photographer.html.
 * @param {Object} photographer - Les données du photographe à afficher.
 */
async function displayPhotographerDetails(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    if (photographerSection) {
        const { name, tagline, city, country, portrait } = photographer;
        
        const photographerText = document.createElement('div');
        photographerText.classList.add('photographer-text');
        photographerText.innerHTML = `
            <h1>${name}</h1>
            <p class="location">${city}, ${country}</p>
            <p>${tagline}</p>
        `;

        const photographerPortrait = document.createElement('div');
        photographerPortrait.classList.add('photographer-portrait');
        photographerPortrait.innerHTML = `
            <img src="assets/photographers/${portrait}" alt="${name}">
        `;

        // Ajout des divs au conteneur .photograph-header
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

  