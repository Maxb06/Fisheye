import { getPhotographers } from '../services/api.js';

const modalBtn = document.querySelector(".photograph-header .contact_button");
const closeBtn = document.querySelector(".modal img");
const firstNameBalise = document.getElementById("firstname");
const lastNameBalise = document.getElementById("name");
const emailBalise = document.getElementById("email");
const textAreaBalise = document.getElementById("message");
const form = document.querySelector("form");

modalBtn.addEventListener("click", displayModal);

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

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

            // Mettre à jour le contenu du span avec le nom du photographe
            photographerNameElement.textContent = photographer.name;
        }
    });
}

closeBtn.addEventListener("click", closeModal);

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const formData = {
        firstName: firstNameBalise.value,
        lastName: lastNameBalise.value,
        email: emailBalise.value,
        message: textAreaBalise.value
    };
    console.log(formData);
});

