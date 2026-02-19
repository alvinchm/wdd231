const url = 'data/menu.json';

export async function getMenuData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al cargar los datos del menú');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetch:', error);
        return []; 
    }
}