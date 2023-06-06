class Apuesta {
    constructor() {
        this.numeroGanador = 0;
        this.apuestaGanancia = 0;
        this.apuestaPerdida = 0;
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

function mostrarMenu() {
    while (true) {
        opcion = prompt("--- Menú de opciones ---\nFichas disponibles: " + fichasDisponibles + "\n\n1: Empezar\n2: Apostar por color\n3: Apostar por Par o Impar\n4: Apostar por número\n5: Apostar por mitad\n6: Apostar por doces\n7: Apostar por Dos a Uno\n8: Ver apuestas realizadas\n0: Salir\nIngrese el número de la opción que desea:");
        if (opcion === null) {
            console.log("El usuario ha cerrado el cuadro de diálogo.");
            return;
        }
        switch (opcion) {
            case "0":
                console.log("Operación cancelada.");
                return;
            case "1":
                girarRuleta();
                return;
            case "2":
                apostarPorColor(defaultData);
                break;
            case "3":
                apostarPorParImpar(defaultData);
                break;
            case "4":
                apostarPorNumero(defaultData);
                break;
            case "5":
                apostarMitad(defaultData);
                break;
            case "6":
                apostarPorDoces(defaultData);
                break;
            case "7":
                apostarPorDosAUno(defaultData);
                break;
            case "8":
                verApuestas();
                break;
            default:
                console.log("Opción inválida. Por favor, ingrese una opción válida.");
                alert("Opción inválida. Por favor, ingrese una opción válida.");
                break;
        }
    }
}

function girarRuleta() {
    let objApuesta = new Apuesta();
    const numeroElegido = Math.floor(Math.random() * 37);
    const datoGanador = numerosRuleta.find((numero) => numero.numero === numeroElegido);
    const bottomRuleta = datoGanador.bottomRuleta;
    const leftRuleta = datoGanador.leftRuleta;
    let mensaje = "El número ganador es " + datoGanador.numero + " de color " + datoGanador.color + "\n";
    let sumaFichas = 0;
    let ganancias = 0;
    let perdidas = 0;
    objApuesta.agregarNumeroGanador(numeroElegido);
    console.log(apuesta);
    for (const apuestaItem in apuesta) {
        console.log(apuestaItem);
        let isGanador = false;
        let multiplicador = 0;

        if (apuestaItem === "Rojo" || apuestaItem === "Negro") {
            objApuesta.agregarColor(apuestaItem, apuesta[apuestaItem]);
        } else if (apuestaItem === "Par" || apuestaItem === "Impar") {
            objApuesta.establecerParImpar(apuestaItem, apuesta[apuestaItem]);
        } else if (apuestaItem === "1 a 18" || apuestaItem === "19 a 36") {
            objApuesta.establecerMitad(apuestaItem, apuesta[apuestaItem]);
        } else if (apuestaItem === "Primer 12" || apuestaItem === "Segundo 12" || apuestaItem === "Tercer 12") {
            objApuesta.establecerDocena(apuestaItem, apuesta[apuestaItem]);
        } else if (apuestaItem === "Primer 2 a 1" || apuestaItem === "Segundo 2 a 1" || apuestaItem === "Tercer 2 a 1") {
            objApuesta.establecerDosAUno(apuestaItem, apuesta[apuestaItem]);
        } else if (!isNaN(apuestaItem)) {
            objApuesta.agregarNumero(apuestaItem, apuesta[apuestaItem]);
        }

        if (apuestaItem === datoGanador.mitad || apuestaItem === datoGanador.color || apuestaItem === datoGanador.parImpar) {
            multiplicador = 2;
            isGanador = true;
        } else if (apuestaItem === datoGanador.docena || apuestaItem === datoGanador.dosAUno) {
            multiplicador = 3;
            isGanador = true;
        } else if (!isNaN(apuestaItem)) {
            if (parseInt(apuestaItem) === numeroElegido) {
                multiplicador = 35;
                isGanador = true;
            }
        }

        if (isGanador) {
            sumaFichas += apuesta[apuestaItem] * multiplicador;
            ganancias += apuesta[apuestaItem] * multiplicador - apuesta[apuestaItem];
            let mensajeGanar = apuesta[apuestaItem] * multiplicador - apuesta[apuestaItem];
            mensaje += "\nHa ganado " + mensajeGanar + " fichas por apostar a " + obtenerMensajeApostado(apuestaItem);
        } else {
            perdidas += apuesta[apuestaItem];
            mensaje += "\nHa perdido " + apuesta[apuestaItem] + " fichas por apostar a " + obtenerMensajeApostado(apuestaItem);
        }
        delete apuesta[apuestaItem];
    }
    objApuesta.agregarApuestaGanancia(ganancias);
    objApuesta.agregarApuestaPerdida(perdidas);
    historialApuestas.push(objApuesta);
    fichasDisponibles += sumaFichas;
    moverFicha(bottomRuleta, leftRuleta);
    mensaje += "\n\nPerdidas Total: " + perdidas + "\nGanancias Total: " + ganancias + "\nFichas Totales: " + fichasDisponibles;
    console.log(mensaje);
    mostrarMensaje(mensaje);
    console.log(historialApuestas);
}

function obtenerMensajeApostado(apuestaItem) {
    if (apuestaItem === "1 a 18") {
        return "la mitad 1-18";
    } else if (apuestaItem === "19 a 36") {
        return "la mitad 19-36";
    } else if (apuestaItem === "Rojo") {
        return "el color Rojo";
    } else if (apuestaItem === "Negro") {
        return "el color Negro";
    } else if (apuestaItem === "Par") {
        return "los números pares";
    } else if (apuestaItem === "Impar") {
        return "los números impares";
    } else if (apuestaItem === "Primer 12") {
        return "el Primer 12";
    } else if (apuestaItem === "Segundo 12") {
        return "el Segundo 12";
    } else if (apuestaItem === "Tercer 12") {
        return "el Tercer 12";
    } else if (apuestaItem === "Primer 2 a 1") {
        return "el Primer 2 a 1";
    } else if (apuestaItem === "Segundo 2 a 1") {
        return "el Segundo 2 a 1";
    } else if (apuestaItem === "Tercer 2 a 1") {
        return "el Tercer 2 a 1";
    } else if (!isNaN(apuestaItem)) {
        return "el número " + apuestaItem;
    }
}

function moverFicha(bottomRuleta, leftRuleta) {
    const ficha = document.getElementById('ficha');
    console.log(bottomRuleta);
    console.log(leftRuleta);
    ficha.style.bottom = bottomRuleta;
    ficha.style.left = leftRuleta;
}

function mostrarMensaje(mensaje) {
    const mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = mensaje;
}

function verApuestas() {
    let mensaje = "Apuestas actuales:\n\n";
    for (const [key, value] of Object.entries(apuesta)) {
        mensaje += key + ": " + value + " fichas.\n";
    }
    console.log(mensaje);
    alert(mensaje);
}

function apostarPorColor(color) {
    let opcionValida = false;
    let flag = 1;
    if (color === "") {
        flag = 0;
    }
    while (!opcionValida) {
        if (flag === 0) {
            color = prompt("Ingrese el color por el que desea apostar:\n1: para Rojo\n2: para Negro\n0: para volver al menú");
        }
        if (color === "1" || color === "2") {
            let colorKey = color === "1" ? "Rojo" : "Negro";
            let cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el color " + colorKey + ":\nFichas disponibles: " + fichasDisponibles + ":"));
            if (isNaN(cantidad) || cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                return;
            } else {
                fichasDisponibles -= cantidad;
                if (colorKey in apuesta) {
                    apuesta[colorKey] += cantidad;
                } else {
                    apuesta[colorKey] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por el color " + colorKey + ".");
                alert("Ha apostado " + cantidad + " fichas por el color " + colorKey + ".");
                opcionValida = true;
            }
        } else if (color === "0" || color === "" || color == null) {
            console.log("Ha decidido volver al menú.");
            alert("Ha decidido volver al menú.");
            return;
        } else {
            console.log("Opción inválida. Por favor, ingrese una opción válida.");
            alert("Opción inválida. Por favor, ingrese una opción válida.");
        }
    }
}

function apostarPorParImpar(parImpar){
    let opcionValida = false;
    let flag = 1;
    if (parImpar === "") {
        flag = 0;
    }
    while (!opcionValida) {
        if (flag === 0) {
            parImpar = prompt("Ingrese el número correspondiente que desea apostar:\n\n1: Par\n2: Impar\n0: para volver al menú");
        }
        if (parImpar === "1" || parImpar === "2") {
            let parImparKey = (parImpar === "1" ? "Par" : "Impar");
            console.log("Apostando por el " + parImparKey + ".");
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el " + parImparKey + ". Fichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad)) {
                console.log("Ha decidido volver al menú.");
                return;
            } else if (cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
            } else {
                fichasDisponibles -= cantidad;
                if (parImparKey in apuesta) {
                    apuesta[parImparKey] += cantidad;
                } else {
                    apuesta[parImparKey] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por el " + parImparKey);
                alert("Ha apostado " + cantidad + " fichas por el " + parImparKey);
                opcionValida = true;
            }
        } else if (parImpar === "0" || parImpar === "") {
            console.log("Ha decidido volver al menú.");
            alert("Ha decidido volver al menú.");
            return;
        } else {
            console.log("Opción inválida. Debe ingresar 1 o 2.");
            alert("Opción inválida. Debe ingresar 1 o 2.");
        }
    }
}

function apostarPorNumero(numero) {
    let opcionValida = false;
    let flag = 1;
    if (numero === "") {
        flag = 0;
    }
    while (!opcionValida) {
        if (flag === 0) {
            numero = parseInt(prompt("Ingrese el número por el que desea apostar:\nNúmero válido entre 0 y 36\nX: para volver al menú"));
        }
        if (isNaN(cantidad)) {
            console.log("Ha decidido volver al menú.");
            return;
        } else if (numero === "x" || numero < numeroMinimo || numero > numeroMaximo) {
            console.log("Número inválido. Debe ingresar un número válido entre 0 y 36.");
            alert("Número inválido. Debe ingresar un número válido entre 0 y 36.");
            return;
        } else {
            console.log("Apostando por el número: " + numero);
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el número:\nFichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad)) {
                console.log("Ha decidido volver al menú.");
                return;
            } else if (cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
            } else {
                fichasDisponibles -= cantidad;
                if (numero in apuesta) {
                    apuesta[numero] += cantidad;
                } else {
                    apuesta[numero] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por el número " + numero + ".");
                alert("Ha apostado " + cantidad + " fichas por el número " + numero + ".");
                opcionValida = true;
            }
        }
    }
}

function apostarPorDoces(doce) {
    let opcionValida = false;
    let flag = 1;
    if (doce === "") {
        flag = 0;
    }
    while (!opcionValida) {
        if (flag === 0) {
            doce = prompt("Ingrese el doce por el que desea apostar:\n\n1: Primeros 12\n2: Segundos 12\n3: Terceros 12\n0: para volver al menú");
        }
        if (doce === "1" || doce === "2" || doce === "3") {
            let doceKey = (doce === "1" ? "Primer 12" : (doce === "2" ? "Segundo 12" : "Tercer 12"));
            console.log("Apostando por el " + doceKey + ".");
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el " + doceKey + ":\nFichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad)) {
                console.log("Ha decidido volver al menú.");
                return;
            } else if (cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
            } else {
                fichasDisponibles -= cantidad;
                if (doceKey in apuesta) {
                    apuesta[doceKey] += cantidad;
                } else {
                    apuesta[doceKey] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por el " + doceKey + ".");
                alert("Ha apostado " + cantidad + " fichas por el " + doceKey + ".");
                opcionValida = true;
            }
        } else if (doce === "0" || doce === "") {
            console.log("Ha decidido volver al menú.");
            alert("Ha decidido volver al menú.");
            return;
        } else {
            console.log("Opción inválida. Por favor, ingrese una opción válida.");
            alert("Opción inválida. Por favor, ingrese una opción válida.");
        }
    }
}

function apostarMitad(mitad) {
    let opcionValida = false;
    let flag = 1;
    if (mitad === "") {
        flag = 0;
    }
    while (!opcionValida) {
        if (flag === 0) {
            mitad = prompt("Ingrese el número correspondiente a la mitad de la tabla en la que desea apostar:\n\n1: para la mitad 1 a 18\n2: para la mitad 19 a 36\n0: para volver al menú");
        }
        if (mitad === "1" || mitad === "2") {
            let mitadKey = (mitad === "1" ? "1 a 18" : "19 a 36");
            console.log("Apostando por la mitad " + mitadKey + ".");
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por la mitad " + mitadKey + ". Fichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad)) {
                console.log("Ha decidido volver al menú.");
                return;
            } else if (cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
            } else {
                fichasDisponibles -= cantidad;
                if (mitadKey in apuesta) {
                    apuesta[mitadKey] += cantidad;
                } else {
                    apuesta[mitadKey] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por la mitad " + mitadKey);
                alert("Ha apostado " + cantidad + " fichas por la mitad " + mitadKey);
                opcionValida = true;
            }
        } else if (mitad === "0" || mitad === "") {
            console.log("Ha decidido volver al menú.");
            alert("Ha decidido volver al menú.");
            return;
        } else {
            console.log("Opción inválida. Debe ingresar 1 o 2.");
            alert("Opción inválida. Debe ingresar 1 o 2.");
        }
    }
}

function apostarPorDosAUno(dosAUno) {
    let opcionValida = false;
    let flag = 1;
    if (dosAUno === "") {
        flag = 0;
    }
    while (!opcionValida) {
        if (flag === 0) {
            dosAUno = prompt("Ingrese la opción por la que desea apostar:\n\n1: Primer 2 a 1\n2: Segundo 2 a 1\n3: Tercer 2 a 1\n0: Volver al menú");
        }
        if (dosAUno === "1" || dosAUno === "2" || dosAUno === "3") {
            let dosAUnoKey = (dosAUno === "1" ? "Primer 2 a 1" : (dosAUno === "2" ? "Segundo 2 a 1" : "Tercer 2 a 1"));
            console.log("Apostando por el " + dosAUnoKey + ".");
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el " + dosAUnoKey + ":\nFichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad)) {
                console.log("Ha decidido volver al menú.");
                return;
            } else if (cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
            } else {
                fichasDisponibles -= cantidad;
                if (dosAUnoKey in apuesta) {
                    apuesta[dosAUnoKey] += cantidad;
                } else {
                    apuesta[dosAUnoKey] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por el " + dosAUnoKey + ".");
                alert("Ha apostado " + cantidad + " fichas por el " + dosAUnoKey + ".");
                opcionValida = true;
            }
        } else if (dosAUno === "0" || dosAUno === "") {
            console.log("Ha decidido volver al menú.");
            alert("Ha decidido volver al menú.");
            return;
        } else {
            console.log("Opción inválida. Por favor, ingrese una opción válida.");
            alert("Opción inválida. Por favor, ingrese una opción válida.");
        }
    }
}
