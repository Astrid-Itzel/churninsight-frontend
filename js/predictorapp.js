let myChart;
const API_URL = "http://localhost:8080/api/clientes/";

async function analizarCliente() {
    const idBusqueda = document.getElementById('customerId').value;
    if(!idBusqueda) return alert("Por favor, introduce un ID");

    // --- BLOQUE A: DATOS DE PRUEBA (MOCK) ---
    // Usa este bloque para probar el diseño sin internet/API
    const data = {
        clienteid: idBusqueda,
        genero: "Masculino",
        plan: "Premium",
        tiempo_contratacion: 12,
        uso_mensual: 250,
        soporte_tickets: 4,
        retrasos_pago: 2,
        pago_automatico: "No",
        cambio_plan: "Sí",
        probabilidad: 20
    };
    actualizarInterfaz(data);

    /* // --- BLOQUE B: CONEXIÓN REAL CON API (DESCOMENTAR LUEGO) ---
    try {
        const response = await fetch(`${API_URL}${idBusqueda}`);
        if (!response.ok) throw new Error("Cliente no encontrado");
        const data = await response.json();
        actualizarInterfaz(data);
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con la base de datos");
    }
    */
}

// Función auxiliar para no repetir código
function actualizarInterfaz(data) {
    document.getElementById('resId').innerText = data.clienteid;
    document.getElementById('resGenero').innerText = data.genero;
    document.getElementById('resPlan').innerText = data.plan;
    document.getElementById('resTiempo').innerText = data.tiempo_contratacion + " meses";
    document.getElementById('resUso').innerText = data.uso_mensual + " hrs";
    document.getElementById('resTickets').innerText = data.soporte_tickets;
    document.getElementById('resRetrasos').innerText = data.retrasos_pago + " meses";
    document.getElementById('resAutoPay').innerText = data.pago_automatico;
    document.getElementById('resCambioPlan').innerText = data.cambio_plan;

    // Actualizar Predicción y Gráfico
    document.getElementById('probValue').innerText = data.probabilidad + "%";
    actualizarGrafico(data.probabilidad);
}

function actualizarGrafico(valor) {
    const ctx = document.getElementById('gaugeChart').getContext('2d');
    
    let colorGrafico = '#198754'; 
    if (valor >= 70) colorGrafico = '#dc3545'; 
    else if (valor >= 40) colorGrafico = '#ffc107'; 

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [valor, 100 - valor],
                backgroundColor: [colorGrafico, '#e9ecef'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
                cutout: '85%'
            }]
        },
        options: {
            aspectRatio: 1.5,
            plugins: { 
                legend: { display: false }, 
                tooltip: { enabled: false } 
            }
        }
    });
}