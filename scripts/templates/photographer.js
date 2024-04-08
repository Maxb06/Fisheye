function photographerTemplate(data) {
    const { name, tagline, city, country, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        // ajout de l'attribut 'alt' avec le nom du photographe test
        img.setAttribute('alt', `Portrait de ${name}`);
        // ajout attribut aria-label nom et localisation du photographe test
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
        article.appendChild(pPrice)
        return (article);
    }
    return { name, tagline, city, country, price, picture, getUserCardDOM }
}
