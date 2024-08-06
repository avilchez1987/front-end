import { baseUrl, getToken } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('registerForm');
    

    registerForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        const uid = getToken().usuario.uid;       

        const newSector = {                  
            sector: document.getElementById('sector').value.toUpperCase(),
            uid                   
        };


        const errorMessages = document.getElementById('errorMessages');

        try {
            const response = await fetch(`${baseUrl}/api/sectores/registrarSector`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSector),
            });

           

            const data = await response.json();

            if (response.ok) {

                alert('Sector registrado con éxito');

                registerForm.reset(); // Limpia el formulario
                window.location.href = 'listar-sectores.html'; // Redirige al listado
            } else {
                //alert('Error al registrar usuario');
                errorMessages.innerHTML = '';

                if( data.errors && Array.isArray(data.errors) ){

                    data.errors.forEach(error => {                   
                        const p = document.createElement('p');
                        p.textContent = error.msg;
                        p.style.color = 'red';
                        errorMessages.appendChild(p);
                    });

                } else {
                    // Maneja caso donde 'errors' no esté presente o no es un array                   
                    const p = document.createElement('p');
                    p.textContent = data.msg;
                    p.style.color = 'red';
                    errorMessages.appendChild(p);
                }
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error en el servidor');
        }
    });
});