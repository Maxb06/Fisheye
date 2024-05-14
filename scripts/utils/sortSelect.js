export function sortMedia(criteria, mediaData) {
    return [...mediaData].sort((a, b) => {
        if (criteria === 'likes') {
            return a.likes - b.likes;
        } else if (criteria === 'date') {
            return new Date(a.date) - new Date(b.date); 
        } else if (criteria === 'title') {
            return a.title.localeCompare(b.title); 
        }
    });
}

export function setupSortOptions(sortSelectButton, customOptions, mediaData, displayMedia) {
    // Gestion du clic sur le bouton pour ouvrir/fermer le tri
    sortSelectButton.addEventListener('click', () => {
        const isOpen = sortSelectButton.getAttribute('aria-expanded') === 'true';
        sortSelectButton.setAttribute('aria-expanded', !isOpen);
        customOptions.classList.toggle('open');
    });

    // Gestion du choix de l'élément dans le tri
    customOptions.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
            const selectedCriteria = event.target.getAttribute('data-value');
            sortSelectButton.innerHTML = event.target.textContent;
            sortSelectButton.setAttribute('aria-expanded', 'false');
            customOptions.classList.remove('open');
            const sortedMedia = sortMedia(selectedCriteria, mediaData);
            displayMedia(sortedMedia);
            updateDropdown(selectedCriteria, customOptions);
        }
    });
}

function updateDropdown(selectedCriteria, customOptions) {
    const options = customOptions.querySelectorAll('li');
    options.forEach(option => {
        if (option.getAttribute('data-value') === selectedCriteria) {
            option.style.display = 'none';
        } else {
            option.style.display = 'block';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const initialSelectedItem = document.querySelector('.custom-options li[aria-selected="true"]');
    if (initialSelectedItem) {
        initialSelectedItem.style.display = 'none';
    }
});

