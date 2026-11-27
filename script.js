// =================================
// FECHA EN QUE COMENZÓ LA RELACIÓN
// Cambia esta fecha por la real.
// Formato: año-mes-día
// =================================

const fechaInicio = new Date(2023, 11, 16, 0, 0, 0);

// Abrir la sorpresa
const botonSorpresa = document.getElementById("abrirSorpresa");
const portada = document.getElementById("inicio");
const contenido = document.getElementById("contenido");

botonSorpresa.addEventListener("click", () => {
    portada.style.transition = "opacity 1s ease";
    portada.style.opacity = "0";

    setTimeout(() => {
        portada.style.display = "none";
        contenido.classList.remove("oculto");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1000);
});

// Contador de tiempo juntos
function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (diferencia < 0) return;

    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(segundosTotales / 86400);
    const horas = Math.floor((segundosTotales % 86400) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);

// Abrir y cerrar carta
const botonCarta = document.getElementById("abrirCarta");
const mensajeCarta = document.getElementById("mensajeCarta");

botonCarta.addEventListener("click", () => {
    mensajeCarta.classList.toggle("oculto");

    if (mensajeCarta.classList.contains("oculto")) {
        botonCarta.textContent = "Abrir mi carta";
    } else {
        botonCarta.textContent = "Cerrar mi carta ❤️";
    }
});

// Estrellitas decorativas en la portada
const estrellas = document.querySelector(".estrellas");

for (let i = 0; i < 45; i++) {
    const estrella = document.createElement("span");

    estrella.style.position = "absolute";
    estrella.style.width = Math.random() * 3 + 1 + "px";
    estrella.style.height = estrella.style.width;
    estrella.style.background = "#ffffff";
    estrella.style.borderRadius = "50%";
    estrella.style.left = Math.random() * 100 + "%";
    estrella.style.top = Math.random() * 100 + "%";
    estrella.style.opacity = Math.random() * 0.6 + 0.2;
    estrella.style.animation = `brillo ${Math.random() * 3 + 2}s infinite alternate`;

    estrellas.appendChild(estrella);
}

// Animación de brillo
const animacionBrillo = document.createElement("style");

animacionBrillo.textContent = `
@keyframes brillo {
    from { opacity: 0.2; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1.4); }
}
`;

document.head.appendChild(animacionBrillo)

// ===================================
// REPRODUCTOR: MI FIRU, MI HOGAR ❤️
// ===================================

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const iconoMusica = document.getElementById("iconoMusica");
const textoMusica = document.getElementById("textoMusica");
const progreso = document.getElementById("progreso");
const tiempoActual = document.getElementById("tiempoActual");
const duracion = document.getElementById("duracion");
const disco = document.querySelector(".disco");

// Convertir segundos a minutos:segundos
function formatoTiempo(segundos) {
    if (!Number.isFinite(segundos)) return "0:00";

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${minutos}:${segundosRestantes
        .toString()
        .padStart(2, "0")}`;
}

// Botón de reproducir y pausar
botonMusica.addEventListener("click", async () => {
    if (musica.paused) {
        try {
            await musica.play();
        } catch (error) {
            console.error("Error al reproducir:", error);
        }
    } else {
        musica.pause();
    }
});

// Cuando comienza la reproducción
musica.addEventListener("play", () => {
    iconoMusica.textContent = "❚❚";
    textoMusica.textContent = "Pausar nuestra canción";
    disco.classList.add("reproduciendo");
});

// Cuando se pausa
musica.addEventListener("pause", () => {
    iconoMusica.textContent = "▶";
    textoMusica.textContent = "Escuchar nuestra canción";
    disco.classList.remove("reproduciendo");
});

// Actualizar duración cuando se carga
musica.addEventListener("loadedmetadata", () => {
    duracion.textContent = formatoTiempo(musica.duration);
});

// Actualizar barra de progreso
musica.addEventListener("timeupdate", () => {
    if (!musica.duration) return;

    const porcentaje =
        (musica.currentTime / musica.duration) * 100;

    progreso.value = porcentaje;
    tiempoActual.textContent = formatoTiempo(musica.currentTime);
});

// Adelantar o retroceder
progreso.addEventListener("input", () => {
    if (!musica.duration) return;

    musica.currentTime =
        (progreso.value / 100) * musica.duration;
});

// Cuando termina, reiniciar visualmente
musica.addEventListener("ended", () => {
    progreso.value = 0;
    tiempoActual.textContent = "0:00";
});