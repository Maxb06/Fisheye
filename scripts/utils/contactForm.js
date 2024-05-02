import { getPhotographers } from '../services/api.js';

// Sélection des éléments du DOM
const modalBtn = document.querySelector(".photograph-header .contact_button");
const closeBtn = document.querySelector(".modal img");
const firstNameBalise = document.getElementById("firstname");
const lastNameBalise = document.getElementById("name");
const emailBalise = document.getElementById("email");
const textAreaBalise = document.getElementById("message");
const form = document.querySelector("form");

/**
 * Affiche la fenêtre modale de contact.
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    // Récupération de l'ID du photographe depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    // Récupération des données du photographe correspondant à l'ID
    getPhotographers().then(data => {
        const photographer = data.photographers.find(p => p.id === photographerId);
        if (photographer) {
            const modalHeader = document.querySelector(".modal header h1");

            // Vérifier s'il existe déjà un span contenant le nom du photographe
            let photographerNameElement = modalHeader.querySelector("span");

            if (!photographerNameElement) {
                // Si aucun span n'existe, créer un nouveau
                photographerNameElement = document.createElement("span");
                modalHeader.appendChild(photographerNameElement);
            }
            // Met à jour le contenu du span avec le nom du photographe
            photographerNameElement.textContent = photographer.name;
        }
    });
}

/**
 * Ferme la fenêtre modale de contact.
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Ecouteurs d'évenénements : Affiche la modal lors du clic sur le bouton de contact
modalBtn.addEventListener("click", displayModal);

// Ecouteurs d'évenénements : Ferme la modal lors du clic sur le bouton de fermeture
closeBtn.addEventListener("click", closeModal);

// Renvoi les données du formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
        firstName: firstNameBalise.value,
        lastName: lastNameBalise.value,
        email: emailBalise.value,
        message: textAreaBalise.value
    };
    // Pour le moment, affiche les données du formulaire dans la console
    console.log(formData);
});

