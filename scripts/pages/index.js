import { getPhotographers } from '../services/api.js';
import { photographerTemplate } from '../templates/photographer.js';

/**
 * Affiche les données des photographes sur la page.
 * @param {Array<Object>} photographers - La liste des photographes.
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

/**
 * Initialise l'application en récupérant et en affichant les données des photographes.
 * @async
 */
async function init() {
    try {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    } catch (error) {
        console.error("Erreur lors de l'initialisation", error);
    }
}

init();
