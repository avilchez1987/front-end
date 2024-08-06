import { baseUrl, getToken } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    
    
    async function loadUserCount() {

        const token = getToken().token;

        //console.log(token);

        try {
            const response = await fetch(`${baseUrl}/api/usuarios`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                  }
            });


            if (response.ok) {
                const data = await response.json();
                const total = data.total;

                document.getElementById('userCount').textContent = total;
                document.getElementById('usuarioActivo').textContent = data.totalActivos;
            } else {
                console.error('Error al obtener la cantidad de usuarios:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }
    
    // Llama a la función para cargar la cantidad de usuarios al cargar la página
    loadUserCount();

});


    
    