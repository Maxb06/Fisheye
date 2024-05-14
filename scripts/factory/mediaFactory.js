export class ImageMedia {
    constructor(data) {
        this._data = data;
    }

    createImageElement() {
        const img = document.createElement('img');
        img.alt = this._data.title;
        img.src = `/assets/photographers/${this._data.photographerId}/${this._data.image}`;
        return img;
    }
}

export class VideoMedia {
    constructor(data) {
        this._data = data;
    }

    createVideoElement() {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';

        const video = document.createElement('video');
        const source = document.createElement('source');
        source.src = `/assets/photographers/${this._data.photographerId}/${this._data.video}`;
        source.type = 'video/mp4';
        video.appendChild(source);

        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.setAttribute('aria-label', 'Play video');
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        videoWrapper.appendChild(video);
        videoWrapper.appendChild(playButton);

        return videoWrapper;
    }
}

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
