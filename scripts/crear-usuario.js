import { baseUrl, getToken } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('registerForm');
    

    const loadSectores = async () => {
        try {
       
            const response = await fetch(`${baseUrl}/api/sectores/listarSectores`);
            
            if (response.ok) {

                const data = await response.json();
                const sectores = data.sectores;
                const total = data.total;

                const selectElement = document.getElementById('sectorEmpresa');
                
                // Limpia las opciones existentes
                selectElement.innerHTML = '<option value="" disabled selected>--Seleccione un sector--</option>';

                sectores.forEach(sector => {
                    // Crea una nueva opción para cada usuario
                    const option = document.createElement('option');
                    option.value = sector._id; // O el identificador único que uses
                    option.textContent = sector.sector; // O el campo que desees mostrar
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }

    // Cargar los datos cuando la página esté lista
    loadSectores();




    registerForm.addEventListener('submit', async (event) => {
        
        event.preventDefault();
        
        const newUser = {
            nombreUsuario: document.getElementById('nombreUsuario').value,
            apellidoUsuario: document.getElementById('apellidoUsuario').value,
            nombreEmpresa: document.getElementById('nombreEmpresa').value,        
            sectorEmpresa: document.getElementById('sectorEmpresa').value,
            celular: document.getElementById('celularUsuario').value,
            email: document.getElementById('email').value.toLowerCase(),
            password: document.getElementById('newPassword').value,
            rol: document.getElementById('rol').value
        };

        const errorMessages = document.getElementById('errorMessages');

        try {
            const response = await fetch(`${baseUrl}/api/usuarios/registroUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();
            

            if (response.ok) {
                alert('Usuario registrado con éxito');

                registerForm.reset(); // Limpia el formulario

                console.log(getToken().usuario.rol);

                if ( getToken().usuario.rol == 'ADMIN_ROLE') {
                    window.location.href = 'listado-usuarios.html'; // Redirige al listado
                } else {
                    window.location.href = 'login.html'; // Redirige al listado
                }
               
            } else {
               //alert('Error al registrar usuario');

                errorMessages.innerHTML = '';
                data.errors.forEach(error => {
                    const p = document.createElement('p');
                    p.textContent = error.msg;
                    p.style.color = 'red';
                    errorMessages.appendChild(p);
                });
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error en el servidor');
        }
    });
});