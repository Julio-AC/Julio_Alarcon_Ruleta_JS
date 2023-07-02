const autor = "Julio";
const version = "2.2";
const numeroMaximo = 36;
const numeroMinimo = 0;
const defaultData = "";
const textHistorial = /^historial/;
const spanApuestaMinima = document.getElementById("apuesta-minima");
/*JulioAlarcon*/
let fichasDisponibles = 5000;
let apuesta = {};
let apuestaMinima = 200;
let cantidad = 0;
let numero = 0;
let color = "";
let doce = "";
let mitad = "";
let dosAUno = "";
let numerosRuleta;
let tipoApuesta;
let datosNumerosApuesta;
/*JulioAlarcon*/
spanApuestaMinima.innerText = apuestaMinima;
/*JulioAlarcon*/
const htmlModalRuleta = `
    <div id="modalRuleta" class="modalRuleta">
        <div class="modalRuleta-content">
            <div class="boxRuleta">
                <div id="mesa" class="scrollable">
                    <div class="container">
                        <img id="ruleta" src="media/casino.png" alt="Imagen del casino">
                        <div id="ficha" style="bottom: 150px; left: 580px;"></div>
                        <div id="fichasApuestas" style="height: 0px;">ReplaceApuestas</div>
                        <div id="tablaApuesta" style="height: 0px;">ReplaceTabla</div>
                        <div id="botones" style="height: 0px;">
                            <button class="buttonApuestaStart" style="bottom: 232px; left: 227px;" onclick="girarRuleta()">GIRAR</button>
                        </div>
                    </div>
                    <img class="buttonIcon" src="media/navBotonesRuleta.png" alt="Imagen Botones">
                    <div class="buttonContainer" style="height: 0px;">
                        <button class="buttonMenu" name="mostrarFichas" style="bottom: 124px; left: 96px;" onclick="abrirModalFichas()">Fichas</button>
                        <button class="buttonMenu" style="bottom: 213px; left: 256px;" onclick="abrirModalApuesta()">Apuesta</button>
                        <button class="buttonMenu" style="bottom: 303px; left: 416px;" onclick="abrirModalHistorial()">Historial</button>
                        <button class="buttonMenu" style="bottom: 393px; left: 576px;" onclick="apuestaRandom()">Apuesta Random</button>
                        <button class="buttonMenu" style="bottom: 483px; left: 736px;" onclick="aumentarFichas()">+5000</button>
                        <button class="buttonMenu" style="bottom: 573px; left: 896px;" onclick="apuestaBorrar()">Borrar Apuesta</button>
                        <button class="buttonMenu" style="bottom: 663px; left: 1056px;" onclick="">Reglas</button>
                        <button class="buttonMenu" style="bottom: 753px; left: 1216px;" onclick="cerrarModalRuleta()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
let replaceHtmlModalRuleta = htmlModalRuleta;

