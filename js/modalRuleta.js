/*JulioAlarcon*/
function abrirModalFichas() {
    apuestaActualizarVisibilidad();
    let modal = document.getElementById("modalFichas");
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.display = "none";
    }, 1500);
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

function abrirInputApuesta(datoKey) {
    const modalInputApuesta = document.getElementById('modalInputApuesta');
    if (!modalInputApuesta) {
        const htmlInputApuesta = `
            <div id="modalInputApuesta" class="modalInputApuesta">
                <div class="modalInputApuesta-content">
                    <div class="modalInputApuesta-header">
                        <div class="modalInputApuesta-titulo" id="datoKeyApuesta">Apuesta: ${datoKey}</div>
                    </div>
                    <input id="inputApuesta" type="number" min="0" max="1000" placeholder="Cantidad" onkeypress="teclaEnterInputApuesta(event)">
                    <div class="modalInputApuesta-footer">
                        <button id="enviarInputApuesta" class="enviarInputApuesta" onclick="enviarInputApuesta('${datoKey}')">Apostar</button>
                        <button id="cerrarInputApuesta" class="cerrarInputApuesta" onclick="cerrarInputApuesta()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', htmlInputApuesta);
    }
    let inputApuesta = document.getElementById("inputApuesta");
    inputApuesta.focus();
}

function abrirModalHistorial() {
    const modalHistorial = document.getElementById('modalHistorial');
    if (!modalHistorial) {
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

function abrirModalReglas() {
    const modalReglas = document.getElementById('modalReglas');
    if (!modalReglas) {
        const modalHtml = `
            <div id="modalReglas" class="modalReglas" onclick="cerrarModalReglas()">
                <div class="modalFichas-content">
                    <div class="modalFichas-header">
                        <div class="menuMostrarTitulo">Reglas</div>
                    </div>
                    <div class="modalFichas-body">
                        <ul>
                            <li>Derechos Reservados.</li>
                            <li>No vender.</li>
                            <li>Esto es un simulador no pasar por verdadero.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
}

function cerrarModalRuleta() {
    const modalRuleta = document.getElementById('modalRuleta');
    if (modalRuleta) {
        modalRuleta.remove();
    }
    apuestaBorrar()
}

function cerrarModalFichas() {
    document.getElementById("modalFichas").style.display = "none";
}

function cerrarModalApuesta() {
    document.getElementById("modalApuesta").style.display = "none";
}

function cerrarInputApuesta() {
    const modalInputApuesta = document.getElementById('modalInputApuesta');
    if (modalInputApuesta) {
        modalInputApuesta.remove();
    }
}

function cerrarModalHistorial() {
    const modalHistorial = document.getElementById('modalHistorial');
    if (modalHistorial) {
        modalHistorial.remove();
    }
}

function cerrarModalReglas() {
    const modalReglas = document.getElementById('modalReglas');
    if (modalReglas) {
        modalReglas.remove();
    }
}