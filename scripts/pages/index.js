    /**
    * Récupère les données des photographes depuis un fichier JSON.
    * @async
    * @returns {Promise<{ photographers: Object[] }>} Les données des photographes.
    */
    async function getPhotographers() {
        try {
            const response = await fetch('data/photographers.json');
            console.log(response);
            if (!response.ok) throw new Error('Impossible de récupérer les données photographers');
            return await response.json();
        } catch (error) {
            console.error('Erreur Fetch photographers:', error);
            return { photographers: [] }; 
        }
    }

    /**
    * Affiche les données des photographes sur la page.
    * @param {Object[]} photographers - Les données des photographes à afficher.
    */
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            console.log(photographer);
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

            const link = document.createElement('a');
            link.href = `photographer.html?id=${photographer.id}`; // Utilise l'ID du photographe dans l'url
            link.appendChild(userCardDOM);
            
            photographersSection.appendChild(link);
        });
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

  
