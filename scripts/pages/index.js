    async function getPhotographers() {
        try {
            const response = await fetch('data/photographers.json');
            if (!response.ok) throw new Error('Impossible de récupérer les données photographers');
            return await response.json();
        } catch (error) {
            console.error('Erreur Fetch photographers:', error);
            return { photographers: [] }; 
        }
    }

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
  
