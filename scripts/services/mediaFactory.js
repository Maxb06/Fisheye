/**
 * @classdesc Représente une image.
 */
export class ImageMedia {
    constructor(data) {
        this._data = data;
    }

    createImageElement() {
        return `
            <img
                alt="${this._data.title}"
                src="/assets/photographers/${this._data.photographerId}/${this._data.image}"
            />
        `;
    }
}

/**
 * @classdesc Représente une vidéo.
 */
export class VideoMedia {
    constructor(data) {
        this._data = data;
    }

    createVideoElement() {
        return `
        <div class="video-wrapper">
            <video>
                <source src="/assets/photographers/${this._data.photographerId}/${this._data.video}" type="video/mp4">
                Your browser does not support this video.
            </video>
            <button class="play-button"><i class="fa-solid fa-play"></i></button>
        </div>
        `;
    }
}

/**
 * @classdesc Factory pour créer des médias (images ou vidéos) à partir des données JSON.
 */
export class MediaFactory {
    /**
     * Crée un média (image ou vidéo) à partir des données JSON fournies.
     * @param {Object} data - Les données JSON du média.
     * @returns {ImageMedia|VideoMedia} - Le média créé.
     * @throws {Error} - Si le type de média n'est pas reconnu.
     */
    static createMedia(data) {
        if (data.image) {
            return new ImageMedia(data);
        } else if (data.video) {
            return new VideoMedia(data);
        } else {
            throw new Error('Média non trouvé');
        }
    }
}

