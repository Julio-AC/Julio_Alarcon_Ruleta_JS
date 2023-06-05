class Apuesta {
    constructor() {
        this.numeros = {};
        this.colores = {};
        this.parImpar = {};
        this.mitad = {};
        this.docena = {};
        this.dosAUno = {};
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
        opcion = prompt("--- Menú de opciones ---\nFichas disponibles: " + fichasDisponibles + "\n\n1: Empezar\n2: Apostar por color\n3: Apostar por número\n4: Apostar por mitad\n5: Apostar por doces\n6: Apostar por Dos a Uno\n7: Ver apuestas realizadas\n0: Salir\nIngrese el número de la opción que desea:");
        if (opcion === null) {
            console.log("El usuario ha cerrado el cuadro de diálogo.");
            return;
        }
        switch (opcion) {
            case "0":
                console.log("Operación cancelada.");
                return;
            case "1":
                empezar();
                return;
            case "2":
                apostarPorColor();
                break;
            case "3":
                apostarPorNumero();
                break;
            case "4":
                apostarMitad();
                break;
            case "5":
                apostarPorDoces();
                break;
            case "6":
                apostarPorDosAUno();
                break;
            case "7":
                verApuestas();
                break;
            default:
                console.log("Opción inválida. Por favor, ingrese una opción válida.");
                alert("Opción inválida. Por favor, ingrese una opción válida.");
                break;
        }
    }
}

function empezar() {
    const numeroElegido = Math.floor(Math.random() * 37);
    const datoGanador = numerosRuleta.find((numero) => numero.numero === numeroElegido);
    const bottomRuleta = datoGanador.bottomRuleta;
    const leftRuleta = datoGanador.leftRuleta;
    let mensaje = "El número ganador es " + datoGanador.numero + " de color " + datoGanador.color + "\n";
    let ganancias = 0;
    let perdidas = 0;
    console.log(apuesta);
    for (const apuestaItem in apuesta) {
        console.log(apuestaItem);
        let isGanador = false;
        let multiplicador = 0;
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
            ganancias += apuesta[apuestaItem] * multiplicador;
            mensaje += "\nHa ganado " + apuesta[apuestaItem] * multiplicador + " fichas por apostar a " + obtenerMensajeApostado(apuestaItem);
        } else {
            perdidas += apuesta[apuestaItem];
            mensaje += "\nHa perdido " + apuesta[apuestaItem] + " fichas por apostar a " + obtenerMensajeApostado(apuestaItem);
        }
        delete apuesta[apuestaItem];
    }
    fichasDisponibles += ganancias;
    moverFicha(bottomRuleta, leftRuleta);
    mensaje += "\n\nPerdidas Total: " + perdidas + "\nGanancias Total: " + ganancias + "\nFichas Totales: " + fichasDisponibles;
    console.log(mensaje);
    mostrarMensaje(mensaje);
}

function obtenerMensajeApostado(apuestaItem) {
    if (apuestaItem === "1 a 18") {
        return "la mitad 1-18";
    } else if (apuestaItem === "19 a 36") {
        return "la mitad 19-36";
    } else if (apuestaItem === "rojo") {
        return "el color rojo";
    } else if (apuestaItem === "negro") {
        return "el color negro";
    } else if (apuestaItem === "par") {
        return "los números pares";
    } else if (apuestaItem === "impar") {
        return "los números impares";
    } else if (apuestaItem === "primer12") {
        return "el primer 12";
    } else if (apuestaItem === "segundo12") {
        return "el segundo 12";
    } else if (apuestaItem === "tercer12") {
        return "el tercer 12";
    } else if (apuestaItem === "dosAUno1") {
        return "el primer 2 a 1";
    } else if (apuestaItem === "dosAUno2") {
        return "el segundo 2 a 1";
    } else if (apuestaItem === "dosAUno3") {
        return "el tercer 2 a 1";
    } else if (!isNaN(apuestaItem)){
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

function apostarPorColor() {
    let opcionValida = false;
    while (!opcionValida) {
        const color = prompt("Ingrese el color por el que desea apostar:\n1: para rojo\n2: para negro\n0: para volver al menú");
        if (color === "1" || color === "2") {
            let colorKey = color === "1" ? "rojo" : "negro";
            let cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el color " + colorKey + ":\nFichas disponibles: " + fichasDisponibles + ":"));
            if (isNaN(cantidad) || cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
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

function apostarPorNumero() {
    let opcionValida = false;
    while (!opcionValida) {
        numero = parseInt(prompt("Ingrese el número por el que desea apostar:\nNúmero válido entre 0 y 36\nX: para volver al menú"));
        if (numero === "x" || isNaN(numero) || numero < numeroMinimo || numero > numeroMaximo) {
            console.log("Número inválido. Debe ingresar un número válido entre 0 y 36.");
            alert("Número inválido. Debe ingresar un número válido entre 0 y 36.");
            return;
        } else {
            console.log("Apostando por el número: " + numero);
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el número:\nFichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad) || cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                return;
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

function apostarPorDoces() {
    let opcionValida = false;
    while (!opcionValida) {
        doce = prompt("Ingrese el doce por el que desea apostar:\n\n1: Primeros 12\n2: Segundos 12\n3: Terceros 12\n0: para volver al menú");
        if (doce === "1" || doce === "2" || doce === "3") {
            let doceKey = (doce === "1" ? "primer12" : (doce === "2" ? "segundo12" : "tercer12"));
            console.log("Apostando por el " + doceKey + " 12.");
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el " + (doce === "1" ? "Primer" : (doce === "2" ? "Segundo" : "Tercer")) + " 12:\nFichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad) || cantidad < apuestaMinima || cantidad > fichasDisponibles) {
                console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
                alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
            } else {
                fichasDisponibles -= cantidad;
                if (doceKey in apuesta) {
                    apuesta[doceKey] += cantidad;
                } else {
                    apuesta[doceKey] = cantidad;
                }
                console.log("Ha apostado " + cantidad + " fichas por el " + doceKey + " 12.");
                alert("Ha apostado " + cantidad + " fichas por el " + doceKey + " 12.");
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

function apostarMitad() {
    let opcionValida = false;
    while (!opcionValida) {
        mitad = prompt("Ingrese el número correspondiente a la mitad de la tabla en la que desea apostar:\n\n1: para la mitad 1 a 18\n2: para la mitad 19 a 36\n0: para volver al menú");
        if (mitad === "1" || mitad === "2") {
            let mitadKey = (mitad === "1" ? "1 a 18" : "19 a 36");
            console.log("Apostando por la mitad " + mitadKey + ".");
            cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por la mitad " + mitadKey + ". Fichas disponibles: " + fichasDisponibles));
            if (isNaN(cantidad) || cantidad < apuestaMinima || cantidad > fichasDisponibles) {
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

function apostarPorDosAUno() {
    let opcionValida = false;
    while (!opcionValida) {
      dosAUno = prompt("Ingrese la opción por la que desea apostar:\n\n1: Dos a uno 1°\n2: Dos a uno 2°\n3: Dos a uno 3°\n0: Volver al menú");
      if (dosAUno === "1" || dosAUno === "2" || dosAUno === "3") {
        const dosAUnoKey = "dosAUno" + dosAUno;
        console.log("Apostando por el Dos a uno " + dosAUno + ".");
        cantidad = parseInt(prompt("Ingrese la cantidad que desea apostar por el Dos a uno " + dosAUno + ":\nFichas disponibles: " + fichasDisponibles));
        if (isNaN(cantidad) || cantidad < apuestaMinima || cantidad > fichasDisponibles) {
          console.log("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
          alert("Cantidad inválida. Debe ingresar un número entre " + apuestaMinima + " y " + fichasDisponibles + ".");
        } else {
          fichasDisponibles -= cantidad;
          if (dosAUnoKey in apuesta) {
            apuesta[dosAUnoKey] += cantidad;
          } else {
            apuesta[dosAUnoKey] = cantidad;
          }
          console.log("Ha apostado " + cantidad + " fichas por el Dos a uno " + dosAUno + ".");
          alert("Ha apostado " + cantidad + " fichas por el Dos a uno " + dosAUno + ".");
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
  