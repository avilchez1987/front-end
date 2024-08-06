import { baseUrl, getToken } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#userTable tbody');

    const pageInfo = document.querySelector('#pageInfo');
    const prevPageButton = document.querySelector('#prevPage');
    const nextPageButton = document.querySelector('#nextPage');

    let currentPage = 1;
    const pageSize = 5;

    // Función para obtener datos de usuarios y llenar la tabla
    window.loadUsers = async function(page = 1) {
        try {
            const token = getToken().token;

            const desde = (page - 1) * pageSize;
            const response = await fetch(`${baseUrl}/api/usuarios?limite=${pageSize}&desde=${desde}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                  }
            });

            if (response.ok) {

                const data = await response.json();
                const users = data.usuarios;
                const total = data.total;
                
                // Calcula el número total de páginas
                const totalPages = Math.ceil(total / pageSize);

                // Limpia la tabla antes de agregar nuevos datos
                tableBody.innerHTML = '';
                
                //console.log(users);

                users.forEach(user => {

                    // Transforma el valor del campo `estado` de booleano a texto
                    const estado = user.estado ? 'Activo' : 'Inactivo';

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        
                        <td>${user.nombreUsuario}</td>
                        <td>${user.apellidoUsuario}</td>
                        <td>${user.nombreEmpresa}</td>
                        <td>${user.sectorEmpresa.sector}</td>
                        <td>${user.email}</td>
                        <td>${user.rol}</td>
                        <td>${estado}</td>
                        <td>
                        <button class="btn btn-edit" onclick="editUser('${user.uid}')"><i class="fas fa-edit"></i> Editar</button>
                        <button class="btn btn-delete" onclick="deleteUser('${user.uid}')"><i class="fas fa-trash-alt"></i> Eliminar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                 // Actualiza la información de la página
                 pageInfo.textContent = `Página ${page} de ${totalPages}`;

                 // Habilita o deshabilita los botones de navegación
                 prevPageButton.disabled = (page === 1);
                 nextPageButton.disabled = (page === totalPages);

            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
            //window.location.href = './login.html';
        }
    }

    // Maneja el cambio de página
    window.changePage = function(direction) {
        currentPage += direction;
        loadUsers(currentPage);
    }

    // Carga los datos al cargar la página
    loadUsers(currentPage);

});



// Función para eliminar usuario
window.deleteUser = async function(userId) {
    //console.log(userId)

    /*const userJson = localStorage.getItem('user');
    const userObject = JSON.parse(userJson);
    const token = userObject.token;*/

    const token = getToken().token;

    //console.log(token);


    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {

            const response = await fetch(`${baseUrl}/api/usuarios/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                  }
            });

            if (response.ok) {
                alert('Usuario eliminado exitosamente.');
                await loadUsers(); // Vuelve a cargar la lista de usuarios
            } else {
                console.error('Error al eliminar el usuario:', response.statusText);
                alert('Error al eliminar el usuario.');
            }
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
            alert('Hubo un problema al eliminar el usuario.');
        }
    }
}