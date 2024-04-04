function photographerTemplate(data) {
    const { name, tagline, city, country, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        p.textContent = city + ' , ' + country;
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + '€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(pTagline);
        article.appendChild(pPrice)
        return (article);
    }
    return { name, tagline, city, country, price, picture, getUserCardDOM }
}
