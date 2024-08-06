import { baseUrl, getToken } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#userTable tbody');

    const pageInfo = document.querySelector('#pageInfo');
    const prevPageButton = document.querySelector('#prevPage');
    const nextPageButton = document.querySelector('#nextPage');

    let currentPage = 1;
    const pageSize = 5;

    // Función para obtener datos de usuarios y llenar la tabla
    window.loadSectores = async function(page = 1) {
        try {
            
            const desde = (page - 1) * pageSize;
            const response = await fetch(`${baseUrl}/api/sectores/listarSectores?limite=${pageSize}&desde=${desde}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                  }
            });

            if (response.ok) {

                const data = await response.json();
                const sectores = data.sectores;
                const total = data.total;
                
                // Calcula el número total de páginas
                const totalPages = Math.ceil(total / pageSize);

                // Limpia la tabla antes de agregar nuevos datos
                tableBody.innerHTML = '';
                
                sectores.forEach(sector => {

                    // Transforma el valor del campo `estado` de booleano a texto
                    const estado = sector.estado ? 'Activo' : 'Inactivo';
                   
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        
                        <td>${sector.sector}</td>
                        
                        <td>${sector.fechaCreacion}</td>
                        <td>${sector.usuarioCreacion.email}</td>
                        <td>${estado}</td>
                        <td>
                        <button class="btn btn-edit" onclick="editUser('${sector.uid}')"><i class="fas fa-edit"></i> Editar</button>
                        <button class="btn btn-delete" onclick="deleteSector('${sector._id}')"><i class="fas fa-trash-alt"></i> Eliminar</button>
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
        loadSectores(currentPage);
    }

    // Carga los datos al cargar la página
    loadSectores(currentPage);

});



// Función para eliminar usuario
window.deleteSector = async function(_id) {
    
     const token = getToken().token;
    //console.log(token);

    if (confirm('¿Estás seguro de que deseas eliminar este sector?')) {
        try {

            const response = await fetch(`${baseUrl}/api/sectores/borrarSector/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                  }
            });

            if (response.ok) {
                alert('Sector eliminado exitosamente.');
                await loadSectores(); // Vuelve a cargar la lista de sectores
            } else {
                console.error('Error al eliminar el sector:', response.statusText);
                alert('Error al eliminar el sector.');
            }
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
            alert('Hubo un problema al eliminar el sector.');
        }
    }
}