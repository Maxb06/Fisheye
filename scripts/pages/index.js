    import { getPhotographers } from '../api/service.js';
    import { photographerTemplate } from '../templates/photographer.js';

    /**
    * Affiche les données des photographes sur la page.
    * @param {Object[]} photographers - Les données des photographes à afficher.
    */
    async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    if (photographersSection) {
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

            const link = document.createElement('a');
            link.href = `photographer.html?id=${photographer.id}`; // Utilise l'ID du photographe dans l'url
            link.appendChild(userCardDOM);

            photographersSection.appendChild(link);
        });
        } else {
            console.error("Section des photographes non trouvée dans le DOM.");
        }
    }

    /**
    * Initialise l'application en récupérant et affichant les données des photographes.
    * Gère les éventuelles erreurs d'initialisation.
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