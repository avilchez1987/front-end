import { baseUrl } from "./auth.js";

const formElement = document.getElementById("loginForm");

formElement.addEventListener('submit', async (event) => {

    event.preventDefault(); // Evita el envío del formulario

    const email = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;

    const login = {email, password};
    const errorMessages = document.getElementById('errorMessages');

    try{        
        // Realiza la solicitud POST al servidor REST
        const response = await fetch(`${baseUrl}/api/usuarios/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json' // Importante para que el servidor sepa que es JSON
            },
            body: JSON.stringify(login)
        });

        //const data = await response.json();

        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            // Guarda la información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Redirige al usuario a la página principal después del login exitoso
            window.location.href = 'dashboard.html'; // Cambia a la URL de tu página de destino
        } else {
            const error = await response.json();  
            
            //alert('Error en el inicio de sesión: ' + error.message);

            errorMessages.innerHTML = '';
            const p = document.createElement('p');
            p.textContent = error.msg;
            p.style.color = 'red';
            errorMessages.appendChild(p);

            
        }
    }    
    catch(error) {
        console.error('Hubo un problema con la solicitud:', error);
        alert('Error en la solicitud: ' + error.message);
    }; 
    
})