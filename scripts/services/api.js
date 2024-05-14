
export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Error network response');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur Fetch:', error);
    }
}
