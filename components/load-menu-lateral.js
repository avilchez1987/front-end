document.addEventListener('DOMContentLoaded', () => {
    fetch('templates/menu-lateral.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-lateral-container').innerHTML = data;        


        })
        .catch(error => console.error('Error al cargar el encabezado:', error));
});