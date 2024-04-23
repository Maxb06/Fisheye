const modalBtn = document.querySelector(".photograph-header .contact_button");
const closeBtn = document.querySelector(".modal img");

modalBtn.addEventListener("click", displayModal);

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

closeBtn.addEventListener("click", closeModal);

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

