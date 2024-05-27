import { getPhotographers } from '../services/api.js';

// Sélection des éléments du DOM
const modalBtn = document.querySelector(".photograph-header .contact_button");
const closeBtn = document.querySelector(".close-button");
const firstNameBalise = document.getElementById("firstname");
const lastNameBalise = document.getElementById("name");
const emailBalise = document.getElementById("email");
const textAreaBalise = document.getElementById("message");
const form = document.querySelector("form");
const modal = document.getElementById("contact_modal");

/**
 * Affiche la fenêtre modale de contact.
 */
function displayModal() {
    modal.showModal();
    // Récupération de l'ID du photographe depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    // Récupération des données du photographe correspondant à l'ID
    getPhotographers().then(data => {
        const photographer = data.photographers.find(p => p.id === photographerId);
        if (photographer) {
            const modalHeader = document.querySelector(".modal .modalHeader h1");
            let photographerNameElement = modalHeader.querySelector("span");

            if (!photographerNameElement) {
                photographerNameElement = document.createElement("span");
                modalHeader.appendChild(photographerNameElement);
            }

            photographerNameElement.textContent = photographer.name;
        }
    });
}

/**
 * Ferme la fenêtre modale de contact.
 */
function closeModal() {
    modal.close();
}

/**
 * Valide les champs du formulaire de contact.
 */
function validateForm() {
    const firstName = firstNameBalise.value.trim();
    const lastName = lastNameBalise.value.trim();
    const email = emailBalise.value.trim();
    const message = textAreaBalise.value.trim();
    
    if (firstName === '' || lastName === '' || email === '' || message === '') {
        alert("Veuillez remplir tous les champs.");
        return false;
    }
    return true;
}

/**
 * Réinitialise le formulaire de contact.
 */
function resetForm() {
    form.reset();
}

// Ecouteurs d'événements : Affiche la modale lors du clic sur le bouton de contact
modalBtn.addEventListener("click", displayModal);

// Ecouteurs d'événements : Ferme la modale lors du clic sur le bouton de fermeture
closeBtn.addEventListener("click", closeModal);

// Gère la soumission du formulaire de contact.
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validateForm()) {
        const formData = {
            firstName: firstNameBalise.value,
            lastName: lastNameBalise.value,
            email: emailBalise.value,
            message: textAreaBalise.value
        };
        // affiche les données du formulaire dans la console (objet)
        console.log(formData);
        resetForm();
        closeModal(); 
    }
});
