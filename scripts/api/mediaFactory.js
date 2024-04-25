export class ImageMedia {
    constructor(data) {
        this._data = data;
    }
}

export class VideoMedia {
    constructor(data) {
        this._data = data;
    }  
}

export class MediaFactory {
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

