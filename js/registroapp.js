/**
 * ChurnInsight - Lógica de Registro de Clientes
 * Sincronizado con Dataset de Pandas (n=500)
 */

// 1. Al cargar el documento, inicializamos el ID automático
document.addEventListener('DOMContentLoaded', () => {
    asignarSiguienteID();
});

/**
 * Genera el siguiente ID basado en el localStorage 
 * para simular una base de datos persistente.
 */
function asignarSiguienteID() {
    let ultimoID = localStorage.getItem('ultimoClienteID');
    
    // Si es la primera vez, empezamos después del dataset original (500)
    if (!ultimoID) {
        ultimoID = 500; 
    }

    const nuevoID = parseInt(ultimoID) + 1;
    const inputID = document.getElementById('ClienteID');
    
    if (inputID) {
        inputID.value = nuevoID;
    }
}

/**
 * Escuchador del evento Submit del formulario
 */
document.getElementById('registroForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // 2. Captura de datos del DOM
    const idGenerado = document.getElementById('ClienteID').value;
    
    // Creamos el objeto con los nombres exactos de tu DataFrame de Pandas
    const nuevoRegistro = {
        ClienteID: parseInt(idGenerado),
        tiempo_meses: parseInt(document.getElementById('tiempo_meses').value),
        retrasos_pago: parseInt(document.getElementById('retrasos_pago').value),
        uso_mensual_horas: parseFloat(document.getElementById('uso_mensual_horas').value),
        plan: document.getElementById('plan').value,
        soporte_tickets: parseInt(document.getElementById('soporte_tickets').value),
        cambio_plan: document.getElementById('cambio_plan').checked ? 1 : 0,
        pago_automatico: document.getElementById('pago_automatico').checked ? 1 : 0,
        Genero: document.getElementById('Genero').value
    };

    console.log("Objeto preparado para enviar:", nuevoRegistro);

    // 3. Simulación de Guardado y Persistencia del ID
    try {
        // Guardamos el ID en localStorage para que el siguiente sea correlativo
        localStorage.setItem('ultimoClienteID', idGenerado);
        
        // --- OPCIONAL: Conexión con Java ---
        /*
        const response = await fetch('http://localhost:8080/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoRegistro)
        });
        if(!response.ok) throw new Error("Error en servidor");
        */

        // 4. Feedback al usuario
        alert(`✅ Cliente #${idGenerado} registrado con éxito.`);
        
        // Redirigimos al predictor para que el usuario pueda ver el resultado de la IA
        window.location.href = "predictor.html";

    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Hubo un error al intentar registrar el cliente.");
    }
});

/**
 * Función útil para resetear el formulario sin perder el ID automático
 */
function limpiarFormulario() {
    document.getElementById('registroForm').reset();
    asignarSiguienteID();
}