// --- VARIABLES GLOBALES ---
let inicioTiempo = 0;
let tiempoTranscurrido = 0;
let intervalo = null;
let corriendo = false;
let tiemposCasos = [];

// --- REFERENCIAS A ELEMENTOS ---
const timerDisplay = document.getElementById("timer-display");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnDetener = document.getElementById("btn-detener");
const btnAgregar = document.getElementById("btn-agregar");
const promedioTexto = document.getElementById("promedio-tiempo");
const inputIdeal = document.getElementById("tiempo-ideal");

// --- FORMATEAR TIEMPO ---
function formatearTiempo(ms) {
  const totalSegundos = Math.floor(ms / 1000);
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}

// --- INICIAR CRONÓMETRO ---
function iniciarCronometro() {
  if (!corriendo) {
    inicioTiempo = Date.now() - tiempoTranscurrido;
    intervalo = setInterval(() => {
      tiempoTranscurrido = Date.now() - inicioTiempo;
      timerDisplay.textContent = formatearTiempo(tiempoTranscurrido);
    }, 1000);
    corriendo = true;

    btnIniciar.disabled = true;
    btnPausar.disabled = false;
    btnDetener.disabled = false;
    btnAgregar.disabled = false;
  }
}

// --- PAUSAR CRONÓMETRO ---
function pausarCronometro() {
  if (corriendo) {
    clearInterval(intervalo);
    corriendo = false;

    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnAgregar.disabled = true; // 🔒 no se puede agregar mientras está pausado
  }
}

// --- DETENER CRONÓMETRO ---
function detenerCronometro() {
  clearInterval(intervalo);
  tiempoTranscurrido = 0;
  corriendo = false;

  timerDisplay.textContent = "00:00:00";
  btnIniciar.disabled = false;
  btnPausar.disabled = true;
  btnDetener.disabled = true;
  btnAgregar.disabled = true;

  tiemposCasos = [];
  promedioTexto.textContent = "-- min";
  promedioTexto.style.color = "#333";
}

// --- AGREGAR CASO ---
function agregarCaso() {
  // 🔒 Evita agregar si el cronómetro está detenido
  if (!corriendo || tiempoTranscurrido === 0) {
    alert("Primero inicia el cronómetro para registrar un caso.");
    return;
  }

  const minutosCaso = tiempoTranscurrido / 60000;
  tiemposCasos.push(minutosCaso);

  const promedio =
    tiemposCasos.reduce((a, b) => a + b, 0) / tiemposCasos.length;
  promedioTexto.textContent = `${promedio.toFixed(2)} min`;

  // Reiniciar el cronómetro para el siguiente caso
  clearInterval(intervalo);
  tiempoTranscurrido = 0;
  corriendo = false;
  timerDisplay.textContent = "00:00:00";

  btnIniciar.disabled = false;
  btnPausar.disabled = true;
  btnAgregar.disabled = true; // se bloquea hasta que se vuelva a iniciar
}

// --- EVENTOS ---
btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnDetener.addEventListener("click", detenerCronometro);
btnAgregar.addEventListener("click", agregarCaso);
