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