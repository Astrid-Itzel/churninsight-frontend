document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const user = document.getElementById('userInput').value;
    const pass = document.getElementById('passInput').value;

    // Validación 
    if (user === "admin@churn.com" && pass === "Contraseña12345") {
        // Guardamos en session storage del navegador que el usuario entró
        sessionStorage.setItem('isLogged', 'true');
        
        // Redirigir al Dashboard
        window.location.href = "predictor.html";
    } else {
        alert("Credenciales incorrectas.");
    }
});