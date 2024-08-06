// auth.js
function checkAuth() {
    const userJson = localStorage.getItem('user');

    if (!userJson) {
        window.location.href = './login.html';
        return;
    }

    try {
        const userObject = JSON.parse(userJson);

        if (!userObject || !userObject.token) {
            throw new Error('No token found in user data');
        }

        // Token found, proceed normally
    } catch (error) {
        console.error('Error retrieving token:', error.message);
        window.location.href = './login.html';
    }
}

// Ejecuta la función de verificación de autenticación
checkAuth();

