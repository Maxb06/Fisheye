import { getPhotographers } from '../services/api.js';

// Sélection des éléments du DOM
const modalBtn = document.querySelector(".photograph-header .contact_button");
const closeBtn = document.querySelector(".modal img");
const firstNameBalise = document.getElementById("firstname");
const lastNameBalise = document.getElementById("name");
const emailBalise = document.getElementById("email");
const textAreaBalise = document.getElementById("message");
const form = document.querySelector("form");
const modal = document.getElementById("contact_modal");

let focusableElements;
let firstFocusableElement;
let lastFocusableElement;

/**
 * Affiche la fenêtre modale de contact et gère le focus.
 */
function displayModal() {
    modal.style.display = "flex";
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

    // Gestion du trapping focus
    focusableElements = modal.querySelectorAll('input, textarea, button, [tabindex]:not([tabindex="-1"])');
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];

    document.addEventListener('keydown', trapFocus);
    firstFocusableElement.focus();
}

/**
 * Ferme la fenêtre modale de contact et retire le trapping focus.
 */
function closeModal() {
    modal.style.display = "none";
    document.removeEventListener('keydown', trapFocus);
}

/**
 * Empêche la navigation au clavier en dehors de la modale.
 * @param {KeyboardEvent} event - L'événement lors de l'utilisation au clavier.
 */
function trapFocus(event) {
    if (event.key === 'Tab') {
        if (event.shiftKey) { // Tab inverse
            if (document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // Tab normal
            if (document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
        }
    } else if (event.key === 'Escape') {
        closeModal();
    }
}

// Ecouteurs d'évenénements : Affiche la modale lors du clic sur le bouton de contact
modalBtn.addEventListener("click", displayModal);

// Ecouteurs d'évenénements : Ferme la modale lors du clic sur le bouton de fermeture
closeBtn.addEventListener("click", closeModal);

// Ajout d'un écouteur pour fermer la modale avec la touche "Entrée"
closeBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        closeModal();           
    }
});

/**
 * Gère la soumission du formulaire de contact.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
        firstName: firstNameBalise.value,
        lastName: lastNameBalise.value,
        email: emailBalise.value,
        message: textAreaBalise.value
    };
    // affiche les données du formulaire dans la console (objet)
    console.log(formData);
});
