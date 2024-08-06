
document.addEventListener('DOMContentLoaded', () => {
    fetch('templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
 
            // EXTRAER EL NOMBRE LOGUEADO
            const userJson = localStorage.getItem('user');
            if (userJson) {
                const userObject = JSON.parse(userJson);

                // Verificar que la información del usuario esté disponible
                if (userObject && userObject.usuario) {

                    const username = userObject.usuario.nombreUsuario;
                    const userEmail = userObject.usuario.email;

                    document.getElementById('username').textContent = `Hola, ${username}`;
                    document.getElementById('user-email').textContent = `${userEmail}`;
                } else {
                    document.getElementById('username').textContent = 'Usuario desconocido';
                    document.getElementById('user-email').textContent = '';
                }
            } else {
                document.getElementById('username').textContent = 'Usuario no registrado';
                document.getElementById('user-email').textContent = '';
            }

            // Manejar el menú desplegable
            const userDetails = document.getElementById('userDetails');
            const dropdownMenu = document.getElementById('dropdownMenu');

            userDetails.addEventListener('click', () => {
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            });

             // Manejar el cierre de sesión
            document.getElementById('logout').addEventListener('click', () => {
                localStorage.removeItem('user');
                window.location.href = 'login.html'; // Redirige a la página de login
            });

            // Cerrar el menú al hacer clic fuera de él
            document.addEventListener('click', (event) => {
                if (!userDetails.contains(event.target) && !dropdownMenu.contains(event.target)) {
                    dropdownMenu.style.display = 'none';
                }
            });




        })
        .catch(error => console.error('Error al cargar el encabezado:', error));
});