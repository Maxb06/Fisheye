import { getPhotographers } from '../services/api.js';
import { photographerTemplate } from '../templates/photographer.js';

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

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
