/*JulioAlarcon*/
function aumentarFichas() {
    fichasDisponibles += 5000;
    apuestaActualizarVisibilidad()
}

function teclaEnterInputApuesta(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let buttonInputApuesta = document.getElementById("enviarInputApuesta");
        buttonInputApuesta.click();
    }
}

function actualizarFichasDisponibles() {
    const keys = Object.keys(localStorage);
    const historialKeys = keys.filter(key => key.startsWith("historial-"));
    let maxNumber = 0;
    for (let key of historialKeys) {
        const number = parseInt(key.replace("historial-", ""));
        if (number >= maxNumber) {
            maxNumber = number;
        }
    }
    const historialKey = `historial-${maxNumber}`;
    const historialValue = localStorage.getItem(historialKey);
    if (historialValue) {
        const historialData = JSON.parse(historialValue);
        fichasDisponibles = historialData.fichaActual;
    }
}

function obtenerNumerosRuleta() {
    return fetch("media/json/numerosRuleta.json")
        .then(response => response.json())
        .then(data => {
            numerosRuleta = data;
        })
        .catch(error => {
            console.error("Error al cargar el archivo numerosRuleta.json:", error);
        });
}

function obtenerTipoApuesta() {
    return fetch("media/json/tipoApuestaRuleta.json")
        .then(response => response.json())
        .then(data => {
            tipoApuesta = data;
        })
        .catch(error => {
            console.error("Error al cargar el archivo tipoApuestaRuleta.json:", error);
        });
}

async function jsonRuleta() {
    try {
        await Promise.all([obtenerNumerosRuleta(), obtenerTipoApuesta()]);
    } catch (error) {
        console.error("Error al obtener los datos de la ruleta:", error);
    }
}

function replaceTablaRuleta() {
    const datosNumerosApuesta = [...numerosRuleta, ...tipoApuesta];
    let replaceFichasApuesta = "";
    let replaceTablaApuesta = "";
    for (let datoNA of datosNumerosApuesta) {
        replaceFichasApuesta = replaceFichasApuesta + `<div class="apuesta" id="${datoNA["pk"]}" style="${datoNA["styleFicha"]}">0</div>`;
        replaceTablaApuesta = replaceTablaApuesta + `<button class="${datoNA["classTabla"]}" id="${datoNA["idTabla"]}" style="${datoNA["styleTabla"]}" onclick="abrirInputApuesta('${datoNA["pk"]}')">${datoNA["nombre"]}</button>`;
    }
    replaceHtmlModalRuleta = replaceHtmlModalRuleta.replace("ReplaceApuestas", replaceFichasApuesta);
    replaceHtmlModalRuleta = replaceHtmlModalRuleta.replace("ReplaceTabla", replaceTablaApuesta);
    document.body.insertAdjacentHTML("beforeend", replaceHtmlModalRuleta);
}

async function crearTablaRuleta() {
    await jsonRuleta();
    actualizarFichasDisponibles();
    replaceTablaRuleta();
    apuestaActualizarVisibilidad();
}

