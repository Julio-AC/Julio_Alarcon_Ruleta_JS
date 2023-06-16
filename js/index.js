/*JulioAlarcon*/
function aumentarFichas() {
    fichasDisponibles += 5000;
    apuestaActualizarVisibilidad()
}

function abrirModalRuleta() {
    apuestaActualizarVisibilidad()
    document.getElementById("modalRuleta").style.display = "block";
}

function cerrarModalRuleta() {
    document.getElementById("modalRuleta").style.display = "none";
}

function cerrarInputApuesta() {
    let modalInputApuesta = document.getElementById("modalInputApuesta");
    let inputApuesta = document.getElementById("inputApuesta");
    modalInputApuesta.style.display = "none";
    inputApuesta.value = "";
}

function teclaEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        enviarInputApuesta();
    }
}

function abrirModalFichas() {
    apuestaActualizarVisibilidad();
    let modal = document.getElementById("modalFichas");
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.display = "none";
    }, 1500);
}

function cerrarModalFichas() {
    document.getElementById("modalFichas").style.display = "none";
}

function abrirModalApuesta() {
    const elementApuesta = apuesta;
    const apuestaString = JSON.stringify({ ...elementApuesta }, null, 2);
    const formatoApuesta = apuestaString.replace(/[{},"]/g, '');
    const formatoApuestaSinLineasVacias = formatoApuesta.replace(/^\s*[\r\n]/gm, '');
    const menuMostrarApuesta = document.getElementById("menuMostrarApuesta");
    if (apuestaString === "{}") {
        menuMostrarApuesta.innerText = "No hay apuestas disponibles.";
    } else {
        menuMostrarApuesta.innerText = formatoApuestaSinLineasVacias;
    }
    document.getElementById("modalApuesta").style.display = "block";
}

function cerrarModalApuesta() {
    document.getElementById("modalApuesta").style.display = "none";
}

function abrirInputApuesta(datoKey) {
    let modalInputApuesta = document.getElementById("modalInputApuesta");
    let datoKeyApuesta = document.getElementById("datoKeyApuesta");
    datoKeyApuesta.innerText = datoKey;
    modalInputApuesta.style.display = "block";
    inputApuesta.focus();
}


function abrirModalHistorial() {
    const modalHistorial = document.getElementById('modalHistorial');
    if (!modalHistorial) {
        // El modal no está creado, se crea y se agrega al documento
        const modalHtml = `
            <div id="modalHistorial" class="modalHistorial">
                <div class="modalHistorial-content">
                    <div class="left-section" id="left-section-historial"></div>
                    <div class="right-section" id="right-section-historial">
                        <p>Informacion</p>
                    </div>
                    <button class="cerrarModalHistorial" onclick="cerrarModalHistorial()">X</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        informacionHistorial()
    }
}

function cerrarModalHistorial() {
    const modalHistorial = document.getElementById('modalHistorial');
    if (modalHistorial) {
        modalHistorial.remove();
    }
}

abrirModalRuleta()