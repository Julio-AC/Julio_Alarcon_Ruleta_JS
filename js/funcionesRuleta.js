/*JulioAlarcon*/
class Apuesta {
    constructor() {
        this.numeroGanador = 0;
        this.apuestaGanancia = 0;
        this.apuestaPerdida = 0;
        this.fichaAntes = 0;
        this.fichaActual = 0;
        this.numeros = {};
        this.colores = {};
        this.parImpar = {};
        this.mitad = {};
        this.docena = {};
        this.dosAUno = {};
    }
    agregarNumeroGanador(numero) {
        this.numeroGanador = numero;
    }
    agregarApuestaGanancia(numero) {
        this.apuestaGanancia = numero;
    }
    agregarApuestaPerdida(numero) {
        this.apuestaPerdida = numero;
    }
    agregarFichaAntes(numero) {
        this.fichaAntes = numero;
    }
    agregarFichaActual(numero) {
        this.fichaActual = numero;
    }
    agregarNumero(numero, valorApuesta) {
        this.numeros[numero] = valorApuesta;
    }
    agregarColor(color, valorApuesta) {
        this.colores[color] = valorApuesta;
    }
    establecerParImpar(parImpar, valorApuesta) {
        this.parImpar[parImpar] = valorApuesta;
    }
    establecerMitad(mitad, valorApuesta) {
        this.mitad[mitad] = valorApuesta;
    }
    establecerDocena(docena, valorApuesta) {
        this.docena[docena] = valorApuesta;
    }
    establecerDosAUno(dosAUno, valorApuesta) {
        this.dosAUno[dosAUno] = valorApuesta;
    }
}

function enviarInputApuesta(datoKey) {
    let inputApuesta = document.getElementById("inputApuesta");
    let mensajeError = document.querySelector(".mensajeError");
    let cantidad = parseInt(inputApuesta.value);
    let verificarMinimo = apuestaMinima;
    const idDato = tipoApuesta.find(tipoApuesta => tipoApuesta.pk === datoKey);
    if (idDato || (!isNaN(datoKey) && datoKey >= 0 && datoKey <= 36)) {
        if (datoKey in apuesta) {
            verificarMinimo = 1;
        }
        if (cantidad >= verificarMinimo && cantidad <= fichasDisponibles) {
            if (mensajeError) {
                mensajeError.parentNode.removeChild(mensajeError);
            }
            Swal.fire({
                title: 'CONFIRMAR APUESTA',
                showDenyButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                denyButtonColor: '#ff0095',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    apuestaCantidad(datoKey, cantidad)
                }
            });
            cerrarInputApuesta()

        } else {
            if (!mensajeError) {
                mensajeError = document.createElement("div");
                mensajeError.innerText = "La apuesta debe ser mayor o igual a " + verificarMinimo + " y menor o igual a " + fichasDisponibles + ".";
                mensajeError.classList.add("mensajeError");
                inputApuesta.parentNode.insertBefore(mensajeError, inputApuesta.nextSibling);
            }
        }
    } else {
        if (mensajeError) {
            mensajeError.parentNode.removeChild(mensajeError);
        }
        mensajeError = document.createElement("div");
        mensajeError.innerText = "No esta apostando por un dato valido.";
        mensajeError.classList.add("mensajeError");
        inputApuesta.parentNode.insertBefore(mensajeError, inputApuesta.nextSibling);
    }
}

function apuestaCantidad(datoKey, cantidad) {
    let apuestaDatos = "";
    const idDato = tipoApuesta.find(tipoApuesta => tipoApuesta.pk === datoKey);
    if (idDato || (!isNaN(datoKey) && datoKey >= 0 && datoKey <= 36)) {
        fichasDisponibles -= cantidad;
        if (datoKey in apuesta) {
            apuesta[datoKey] += cantidad;
        } else {
            apuesta[datoKey] = cantidad;
        }
        apuestaDatos = document.getElementById(datoKey);
        apuestaDatos.innerText = apuesta[datoKey];
        apuestaActualizarVisibilidad()
        Swal.fire({
            title: 'APUESTA REALIZADA',
            toast: true,
            timer: 1000,
            icon: 'success',
            showConfirmButton: false,
        });
    }
}

function apuestaRandom() {
    let opcionApuesta = [];
    for (let i = 0; i < numerosRuleta.length; i++) {
        numero = numerosRuleta[i].pk;
        opcionApuesta.push(numero);
    }
    for (let j = 0; j < tipoApuesta.length; j++) {
        pk = tipoApuesta[j].pk;
        opcionApuesta.push(pk);
    }
    largoOpcionApuesta = opcionApuesta.length;
    randomOpcionApuesta = Math.floor(Math.random() * largoOpcionApuesta);
    abrirInputApuesta(opcionApuesta[randomOpcionApuesta]);
}

function girarRuleta() {
    const storageKeys = Object.keys(localStorage);
    const numeroElegido = Math.floor(Math.random() * 37);
    const datoGanador = numerosRuleta.find((pk) => pk.pk === numeroElegido);
    const bottomRuleta = datoGanador.bottomRuleta, leftRuleta = datoGanador.leftRuleta;
    const historialKey = 'historial-' + storageKeys.filter(clave => textHistorial.test(clave)).length;
    let mensaje = `El número ganador es ${datoGanador.pk} de color ${datoGanador.color}\n`;
    let objApuesta = new Apuesta();
    let sumaFichas = 0, ganancias = 0, perdidas = 0;
    let fichasAntes = fichasDisponibles;
    for (const apuestaItem in apuesta) {
        const tipoApuestaEncontrada = tipoApuesta.find(tipoApuesta => tipoApuesta.pk === apuestaItem);
        let isGanador = false, multiplicador = 0;
        fichasAntes += apuesta[apuestaItem];
        if (tipoApuestaEncontrada) {
            mensajeApuesta = tipoApuestaEncontrada.mensaje;
            objApuesta[tipoApuestaEncontrada.funcionClass](apuestaItem, apuesta[apuestaItem]);
        } else if (!isNaN(apuestaItem)) {
            mensajeApuesta = "el número " + apuestaItem;
            objApuesta.agregarNumero(apuestaItem, apuesta[apuestaItem]);
        }
        if (apuestaItem === datoGanador.mitad || apuestaItem === datoGanador.color || apuestaItem === datoGanador.parImpar) {
            multiplicador = 2;
            isGanador = true;
        } else if (apuestaItem === datoGanador.docena || apuestaItem === datoGanador.dosAUno) {
            multiplicador = 3;
            isGanador = true;
        } else if (!isNaN(apuestaItem) && parseInt(apuestaItem) === numeroElegido) {
            multiplicador = 35;
            isGanador = true;
        }
        if (isGanador) {
            const fichasApostadas = apuesta[apuestaItem];
            const fichasGanadas = fichasApostadas * multiplicador - fichasApostadas;
            sumaFichas += fichasApostadas * multiplicador;
            ganancias += fichasGanadas;
            mensaje += `\nHa ganado ${fichasGanadas} fichas por apostar a ${mensajeApuesta}`;
        } else {
            const fichasPerdidas = apuesta[apuestaItem];
            perdidas += fichasPerdidas;
            mensaje += `\nHa perdido ${fichasPerdidas} fichas por apostar a ${mensajeApuesta}`;
        }
        delete apuesta[apuestaItem];
    }
    objApuesta.agregarFichaAntes(fichasAntes), objApuesta.agregarNumeroGanador(numeroElegido);
    objApuesta.agregarApuestaGanancia(ganancias), objApuesta.agregarApuestaPerdida(perdidas);
    fichasDisponibles += sumaFichas;
    objApuesta.agregarFichaActual(fichasDisponibles);
    localStorage.setItem(historialKey, JSON.stringify(objApuesta));
    moverFicha(bottomRuleta, leftRuleta);
    apuestaBorrar();
    mensaje += `\nPerdidas Total: ${perdidas}\nGanancias Total: ${ganancias}\nFichas Totales: ${fichasDisponibles}`;
    Swal.fire({
        title: mensaje,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        denyButtonColor: '#ff0095',
        denyButtonText: 'Cancelar',
    })
}

function moverFicha(bottomRuleta, leftRuleta) {
    const ficha = document.getElementById('ficha');
    ficha.style.bottom = bottomRuleta;
    ficha.style.left = leftRuleta;
}

function apuestaBorrar() {
    for (cantidadFichas in apuesta) {
        fichasDisponibles += apuesta[cantidadFichas];
    }
    apuesta = {};
    let apuestaClass = document.getElementsByClassName("apuesta");
    for (let i = 0; i < apuestaClass.length; i++) {
        apuestaClass[i].innerText = "0";
    }
    apuestaActualizarVisibilidad()
}

function apuestaActualizarVisibilidad() {
    const apuestaElements = document.getElementsByClassName("apuesta");
    const mostrarFichas = document.getElementsByName("mostrarFichas");
    for (const elementFichas of mostrarFichas) {
        elementFichas.innerText = fichasDisponibles;
    }
    for (const element of apuestaElements) {
        if (element.innerText === "0") {
            element.style.opacity = "0";
        } else {
            element.style.opacity = "1";
        }
    }
}

function informacionHistorial() {
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');
    let objHistorial = Object.keys(localStorage).filter(key => key.startsWith('historial-')).sort((a, b) => {
        const numA = parseInt(a.split('-')[1]);
        const numB = parseInt(b.split('-')[1]);
        return numA - numB;
    });
    for (const keyHistorial of objHistorial) {
        let botonHistorial = document.createElement('button');
        botonHistorial.textContent = "Apuesta " + keyHistorial.split('-')[1];
        botonHistorial.classList.add('botonHistorial');
        botonHistorial.addEventListener('click', () => {
            const valor = JSON.parse(localStorage.getItem(keyHistorial));
            let mensaje = "";
            for (const clave in valor) {
                if (valor.hasOwnProperty(clave) && valor[clave] !== null) {
                    if (typeof valor[clave] === 'object') {
                        for (const subClave in valor[clave]) {
                            if (valor[clave].hasOwnProperty(subClave)) {
                                mensaje += `${subClave}: ${valor[clave][subClave]}\n`;
                            }
                        }
                    } else {
                        mensaje += `${clave}: ${valor[clave]}\n`;
                    }
                }
            }
            rightSection.innerText = mensaje;
        });
        leftSection.appendChild(botonHistorial);
    }
}



