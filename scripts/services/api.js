/**
 * Récupère les données des photographes depuis le fichier JSON.
 * @returns {Promise<Array<Object>>} Une promesse résolue avec un tableau d'objets contenant les données des photographes.
 */
export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');

        if (!response.ok) throw new Error('Impossible de récupérer les données photographers');
        return await response.json();
    } catch (error) {
        console.error('Erreur Fetch photographers:', error);
        return { photographers: [] };
    }
}

/* Récupère les medias depuis le fichier JSON */
/**
 * @classdesc Représente une API pour récupérer les données des photographes.
 */
export class Api {
    constructor(url) {
        this._url = url;
    }

    /**
     * Récupère les données des photographes à partir de l'URL spécifiée.
     * @returns {Promise<Object>} - Une promesse résolue avec les données JSON des photographes.
     */
    async getPhotographersId() {
        try {
            const response = await fetch(this._url);
            if (!response.ok) {
                throw new Error('Impossible de récupérer les données');
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur Fetch:', error);
            // En cas d'erreur, retourne un objet vide
            return { photographers: [], media: [] };
        }
    }
}

