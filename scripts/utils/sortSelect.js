/**
 * Trie les éléments média selon le critère spécifié.
 * @param {string} criteria - Le critère de tri ('likes', 'date', 'title').
 * @param {Array<Object>} mediaData - Les données des médias à trier.
 * @returns {Array<Object>} - Les médias triés.
 */
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

/**
 * Configure les options de tri et met à jour l'affichage des médias triés.
 * @param {HTMLElement} sortSelectButton - Le bouton pour ouvrir/fermer le menu de tri.
 * @param {HTMLElement} customOptions - La liste des options de tri.
 * @param {Array<Object>} mediaData - Les données des médias à trier.
 * @param {function} displayMedia - La fonction pour afficher les médias triés.
 */
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
            selectOption(event.target);
        }
    });

    // Gestion de la navigation clavier et sélection avec la touche "Entrée"
    customOptions.addEventListener('keydown', event => {
        const activeElement = document.activeElement;
        if (event.key === 'Enter' && activeElement.tagName === 'LI') {
            selectOption(activeElement);
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const options = [...customOptions.querySelectorAll('li')];
            let currentIndex = options.indexOf(activeElement);
            if (event.key === 'ArrowDown') {
                currentIndex = (currentIndex + 1) % options.length;
            } else if (event.key === 'ArrowUp') {
                currentIndex = (currentIndex - 1 + options.length) % options.length;
            }
            options[currentIndex].focus();
        }
    });

    function selectOption(option) {
        const selectedCriteria = option.getAttribute('data-value');
        sortSelectButton.innerHTML = option.textContent;
        sortSelectButton.setAttribute('aria-expanded', 'false');
        customOptions.classList.remove('open');
        const sortedMedia = sortMedia(selectedCriteria, mediaData);
        displayMedia(sortedMedia);
        updateDropdown(selectedCriteria, customOptions);
    }
}

/**
 * Met à jour l'affichage des options du menu de tri.
 * @param {string} selectedCriteria - Le critère de tri sélectionné.
 * @param {HTMLElement} customOptions - La liste des options de tri.
 */
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
