import { MediaFactory } from '../services/mediaFactory.js';

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
export function photographerTemplate(data) {
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

/**
 * Modèle de carte pour les médias.
 */
export class MediaCard {
    /**
     * Crée une instance de la classe MediaCard.
     * @param {Object} media - Les données du média.
     */
    constructor(media) {
        this._media = media
    }

    /**
     * Crée une carte de média HTML à partir des données du média.
     * @returns {HTMLElement} La carte de média HTML.
     */
    createMediaCard() {
        const $wrapper = document.createElement('div');
        $wrapper.classList.add('media-card-wrapper');

        let mediaElement;
        const mediaFactory = MediaFactory.createMedia(this._media);
        if (this._media.image) {
            mediaElement = mediaFactory.createImageElement();
        } else if (this._media.video) {
            mediaElement = mediaFactory.createVideoElement();
        }

        const mediaCard = `
            <div class="mediaContainer">
                ${mediaElement}
            </div>
            <div class="mediaInfo">
                <h2>${this._media.title}</h2>
                <p>
                    <span>${this._media.likes}<i class="fa-solid fa-heart" aria-label="likes"></i></span>
                </p>
            </div>
        `;
        
        $wrapper.innerHTML = mediaCard;
        return $wrapper;
    }
}
    
