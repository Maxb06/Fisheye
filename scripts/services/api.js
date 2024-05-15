/**
 * Récupère les données des photographes à partir d'un fichier JSON.
 * @async
 * @returns {Promise<Object>} Les données des photographes et des médias.
 * @throws {Error} Si une erreur se produit lors de la récupération des données.
 */
export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Error network response');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}
