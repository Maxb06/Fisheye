import { MediaFactory } from '../factory/mediaFactory.js';

/* Template pour la page d'accueil */
export function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`;
        link.setAttribute('aria-label', `Aller sur la page de ${name}`);
        link.className = 'photographer-link';

        const img = document.createElement('img');
        img.src = picture;
        img.alt = `Portrait de ${name}`;
        img.className = 'photographer-image';
        link.appendChild(img);  

        const h2 = document.createElement('h2');
        h2.textContent = name;
        link.appendChild(h2); 

        const locationP = document.createElement('p');
        locationP.textContent = `${city}, ${country}`;
        locationP.className = 'photographer-location';

        const taglineP = document.createElement('p');
        taglineP.textContent = tagline;
        taglineP.className = 'photographer-tagline';

        const priceP = document.createElement('p');
        priceP.textContent = `${price}€/jour`;
        priceP.className = 'photographer-price';

        article.appendChild(link);
        article.appendChild(locationP);
        article.appendChild(taglineP);
        article.appendChild(priceP);

        return article;
    }
    return { getUserCardDOM };
}

export function photographerDetailsTemplate(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    
    const { name, tagline, city, country, portrait } = photographer;
    
    const img = document.createElement('img');
    img.src = `assets/photographers/${portrait}`;
    img.alt = `Portrait de ${name}`;
    photographerSection.appendChild(img);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'photographer-info';

    const nameElement = document.createElement('h1');
    nameElement.textContent = name;
    infoDiv.appendChild(nameElement);

    const locationElement = document.createElement('p');
    locationElement.className = 'location';
    locationElement.textContent = `${city}, ${country}`;
    infoDiv.appendChild(locationElement);

    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;
    infoDiv.appendChild(taglineElement);

    photographerSection.appendChild(infoDiv);
}

export function createMediaCard (media) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('media-card');

    const mediaContent = MediaFactory.createMedia(media);
    wrapper.appendChild(mediaContent);

    const info = document.createElement('div');
    info.className = 'media-info';

    const title = document.createElement('h2');
    title.textContent = media.title;

    const likes = document.createElement('p');
    const likeCountSpan = document.createElement('span');
    likeCountSpan.className = 'like-count';
    likeCountSpan.textContent = media.likes;

    const likeIcon = document.createElement('i');
    likeIcon.className = 'fa-solid fa-heart like-icon';
    likes.appendChild(likeCountSpan);
    likes.appendChild(likeIcon);

    info.append(title, likes);
    wrapper.append(info);

    return wrapper;
}

export function infoTemplate(photographer) {
    // Récupération du conteneur existant dans le DOM
    const pricingContainer = document.getElementById('photographer-stats');
    if (!pricingContainer) {
        console.error("Le conteneur de tarification n'a pas été trouvé dans le DOM.");
        return;
    }

    // Assure la propreté du conteneur si réutilisation
    pricingContainer.innerHTML = '';
    // Création et ajout de l'élément de prix
    const price = document.createElement('p');
    price.textContent = `${photographer.price}€/jour`;
    price.className = 'pricing-info'; // Appliquez la classe pour le style si nécessaire
    pricingContainer.appendChild(price);
}
