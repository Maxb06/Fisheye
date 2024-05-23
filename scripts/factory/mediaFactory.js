/**
 * Représente un média image.
 */
export class ImageMedia {
    constructor(data) {
        this._data = data;
    }

    createImageElement() {
        const link = document.createElement('a');
        link.href = "#";
        link.setAttribute('aria-label', `Open lightbox to view ${this._data.title}`);

        const img = document.createElement('img');
        img.alt = this._data.title;
        img.src = `/assets/photographers/${this._data.photographerId}/${this._data.image}`;

        link.appendChild(img);
        return link;
    }
}

/**
 * Représente un média vidéo.
 */
export class VideoMedia {
    constructor(data) {
        this._data = data;
    }

    createVideoElement() {
        const link = document.createElement('a');
        link.href = "#";
        link.setAttribute('aria-label', `Open lightbox to view ${this._data.title}`);

        const video = document.createElement('video');
        const source = document.createElement('source');
        source.src = `/assets/photographers/${this._data.photographerId}/${this._data.video}`;
        source.type = 'video/mp4';

        video.appendChild(source);
        link.appendChild(video);

        return link;
    }
}

/**
 * Crée les instances de médias (image/vidéo).
 */
export class MediaFactory {
    static createMedia(data) {
        if (data.image) {
            return new ImageMedia(data).createImageElement();
        } else if (data.video) {
            return new VideoMedia(data).createVideoElement();
        } else {
            throw new Error('Média non trouvé');
        }
    }
}
