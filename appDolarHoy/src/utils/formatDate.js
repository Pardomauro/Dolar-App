export function formatDate(fecha) {

    if (!fecha) return '';
    
    return new Date(fecha).toLocaleString('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}