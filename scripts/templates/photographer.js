/**
 * Modèle de photographe.
 * @typedef {Object} PhotographerModel
 * @property {string} name - Le nom du photographe.
 * @property {string} tagline - La phrase d'accroche du photographe.
 * @property {string} city - La ville du photographe.
 * @property {string} country - Le pays du photographe.
 * @property {number} price - Le prix du photographe par jour.
 * @property {string} picture - Le chemin vers la photo du photographe.
 * @property {Function} getUserCardDOM - Fonction pour obtenir la carte DOM du photographe.
 */
/**
 * Crée un modèle de photographe à partir des données fournies.
 * @param {Object} data - Les données du photographe.
 * @returns {PhotographerModel} Le modèle de photographe.
 */
function photographerTemplate(data) {
    const { name, tagline, city, country, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
     * Obtient la carte DOM du photographe.
     * @returns {HTMLElement} La carte DOM du photographe.
     */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt', `Portrait de ${name}`);
        img.setAttribute('aria-label', `Portrait de ${name}, photographe basé à ${city}, ${country}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pLocations = document.createElement( 'p' );
        pLocations.textContent = city + ' , ' + country;
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + '€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocations);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, tagline, city, country, price, picture, getUserCardDOM }
}
