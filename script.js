let inicioTiempo = 0;          // Guarda el momento en que se inicia el cronómetro
let tiempoTranscurrido = 0;    // Guarda cuánto tiempo ha pasado
let intervalo;                 // Referencia del intervalo de actualización
let enPausa = false;           // Estado del cronómetro
let tiemposCasos = [];         // Lista de tiempos registrados (en minutos)

// Referencias a elementos del HTML
const timerDisplay = document.getElementById("timer-display");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnDetener = document.getElementById("btn-detener");
const btnAgregar = document.getElementById("btn-agregar");
const promedioTexto = document.getElementById("promedio-tiempo");
const inputIdeal = document.getElementById("tiempo-ideal");


// Formato de tiempo hh:mm:ss
function formatearTiempo(ms) {
const totalSegundos = Math.floor(ms / 1000);
const horas = Math.floor(totalSegundos / 3600);
const minutos = Math.floor((totalSegundos % 3600) / 60);
const segundos = totalSegundos % 60;

const h = horas < 10 ? "0" + horas : horas;
const m = minutos < 10 ? "0" + minutos : minutos;
const s = segundos < 10 ? "0" + segundos : segundos;

return `${h}:${m}:${s}`;
}

// Iniciar el cronómetro
function iniciarCronometro() {
if (!enPausa) {
inicioTiempo = Date.now() - tiempoTranscurrido;
}
intervalo = setInterval(() => {
tiempoTranscurrido = Date.now() - inicioTiempo;
timerDisplay.textContent = formatearTiempo(tiempoTranscurrido);
}, 1000);

btnIniciar.disabled = true;
btnPausar.disabled = false;
btnDetener.disabled = false;
btnAgregar.disabled = false;
enPausa = false;
}

// Pausar el cronómetro (por descanso o almuerzo)
function pausarCronometro() {
clearInterval(intervalo);
enPausa = true;
btnIniciar.disabled = false;
btnPausar.disabled = true;
}

// Detener y reiniciar todo
function detenerCronometro() {
clearInterval(intervalo);
tiempoTranscurrido = 0;
timerDisplay.textContent = "00:00:00";
btnIniciar.disabled = false;
btnPausar.disabled = true;
btnDetener.disabled = true;
btnAgregar.disabled = true;
enPausa = false;
tiemposCasos = [];
promedioTexto.textContent = "-- min";
promedioTexto.style.color = "#000";
}

// Agregar un caso y calcular el promedio
function agregarCaso() {
const minutosCaso = tiempoTranscurrido / 60000;
tiemposCasos.push(minutosCaso);

const promedio = tiemposCasos.reduce((a, b) => a + b, 0) / tiemposCasos.length;

actualizarPromedio(promedio);

// Reinicia el cronómetro para el siguiente caso
tiempoTranscurrido = 0;
timerDisplay.textContent = "00:00:00";
inicioTiempo = Date.now();
}

// Actualiza el texto y color del promedio
function actualizarPromedio(promedio) {
    const ideal = parseFloat(inputIdeal.value) || 7; // lee el tiempo ideal desde la casilla
    const diferencia = promedio - ideal;
  
    // Escalamos la diferencia a un rango entre -1 y 1
    const escala = Math.max(-1, Math.min(1, diferencia / ideal));
  
    // Colores base: verde → rojo
    const verde = { r: 40, g: 167, b: 69 };
    const rojo = { r: 220, g: 53, b: 69 };
  
    // Interpolación lineal de color
    const r = Math.round(verde.r + (rojo.r - verde.r) * ((escala + 1) / 2));
    const g = Math.round(verde.g + (rojo.g - verde.g) * ((escala + 1) / 2));
    const b = Math.round(verde.b + (rojo.b - verde.b) * ((escala + 1) / 2));
  
    promedioTexto.textContent = `${promedio.toFixed(2)} min`;
    promedioTexto.style.color = `rgb(${r}, ${g}, ${b})`;
}
  

// Eventos de los botones
btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnDetener.addEventListener("click", detenerCronometro);
btnAgregar.addEventListener("click", agregarCaso);
