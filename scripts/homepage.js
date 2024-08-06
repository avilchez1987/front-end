import { baseUrl } from "./auth";

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#userTable tbody');

    // Función para obtener datos de usuarios y llenar la tabla
    async function loadUsers() {
        try {
            const response = await fetch(`${baseUrl}/api/usuarios/listadoNormas`);
            if (response.ok) {
                const users = await response.json();
                tableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevos datos

                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.numero}</td>
                        <td>${user.actividad}</td>
                        <td>${user.norma}</td>
                        <td>${user.fechaPublicacion}</td>
                        <td>${user.articulo}</td>
                        <td>${user.obligacion}</td>
                        <td>${user.estado}</td>
                        <td>${user.cumplimiento}</td>
                        <td>${user.fechaEvaluacion || 'na'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }

    // Carga los datos al cargar la página
    loadUsers();
});