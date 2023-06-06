const autor = 'Julio';
const version = '1.4';
const numeroMaximo = 36;
const numeroMinimo = 0;
const defaultData = "";
/*JulioAlarcon*/
let fichasDisponibles = 5000;
let apuesta = {};
let historialApuestas = [];
let apuestaMinima = 200;
let cantidad = 0;
let numero = 0;
let color = "";
let doce = "";
let mitad = "";
let dosAUno = "";

const spanApuestaMinima = document.getElementById("apuesta-minima");
spanApuestaMinima.innerText = apuestaMinima;
//const spanFichasDisponibles = document.getElementById("fichas-disponibles");
//spanFichasDisponibles.innerText = fichasDisponibles;
const numerosRuleta = [
    { numero: 0, bottomRuleta: '482px', leftRuleta: '287px', color: "verde", parImpar: "-", docena: "-", mitad: "-", dosAUno: "-" },
    { numero: 1, bottomRuleta: '181px', leftRuleta: '141px', color: "Rojo", parImpar: "Impar", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Primer dos a uno" },
    { numero: 2, bottomRuleta: '384px', leftRuleta: '432px', color: "Negro", parImpar: "Par", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Segundo 2 a 1" },
    { numero: 3, bottomRuleta: '475px', leftRuleta: '223px', color: "Rojo", parImpar: "Impar", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Tercer 2 a 1" },
    { numero: 4, bottomRuleta: '433px', leftRuleta: '396px', color: "Negro", parImpar: "Par", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Primer dos a uno" },
    { numero: 5, bottomRuleta: '125px', leftRuleta: '246px', color: "Rojo", parImpar: "Impar", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Segundo 2 a 1" },
    { numero: 6, bottomRuleta: '267px', leftRuleta: '449px', color: "Negro", parImpar: "Par", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Tercer 2 a 1" },
    { numero: 7, bottomRuleta: '406px', leftRuleta: '126px', color: "Rojo", parImpar: "Impar", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Primer dos a uno" },
    { numero: 8, bottomRuleta: '135px', leftRuleta: '335px', color: "Negro", parImpar: "Par", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Segundo 2 a 1" },
    { numero: 9, bottomRuleta: '291px', leftRuleta: '94px', color: "Rojo", parImpar: "Impar", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Tercer 2 a 1" },
    { numero: 10, bottomRuleta: '123px', leftRuleta: '276px', color: "Negro", parImpar: "Par", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Primer dos a uno" },
    { numero: 11, bottomRuleta: '164px', leftRuleta: '388px', color: "Negro", parImpar: "Impar", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Segundo 2 a 1" },
    { numero: 12, bottomRuleta: '448px', leftRuleta: '168px', color: "Rojo", parImpar: "Par", docena: "Primer 12", mitad: "1 a 18", dosAUno: "Tercer 2 a 1" },
    { numero: 13, bottomRuleta: '210px', leftRuleta: '427px', color: "Negro", parImpar: "Impar", docena: "Segundo 12", mitad: "1 a 18", dosAUno: "Primer dos a uno" },
    { numero: 14, bottomRuleta: '231px', leftRuleta: '107px', color: "Rojo", parImpar: "Par", docena: "Segundo 12", mitad: "1 a 18", dosAUno: "Segundo 2 a 1" },
    { numero: 15, bottomRuleta: '467px', leftRuleta: '346px', color: "Negro", parImpar: "Impar", docena: "Segundo 12", mitad: "1 a 18", dosAUno: "Tercer 2 a 1" },
    { numero: 16, bottomRuleta: '143px', leftRuleta: '188px', color: "Rojo", parImpar: "Par", docena: "Segundo 12", mitad: "1 a 18", dosAUno: "Primer dos a uno" },
    { numero: 17, bottomRuleta: '327px', leftRuleta: '451px', color: "Negro", parImpar: "Impar", docena: "Segundo 12", mitad: "1 a 18", dosAUno: "Segundo 2 a 1" },
    { numero: 18, bottomRuleta: '351px', leftRuleta: '99px', color: "Rojo", parImpar: "Par", docena: "Segundo 12", mitad: "1 a 18", dosAUno: "Tercer 2 a 1" },
    { numero: 19, bottomRuleta: '452px', leftRuleta: '372px', color: "Rojo", parImpar: "Impar", docena: "Segundo 12", mitad: "19 a 36", dosAUno: "Primer dos a uno" },
    { numero: 20, bottomRuleta: '205px', leftRuleta: '122px', color: "Negro", parImpar: "Par", docena: "Segundo 12", mitad: "19 a 36", dosAUno: "Segundo 2 a 1" },
    { numero: 21, bottomRuleta: '410px', leftRuleta: '416px', color: "Rojo", parImpar: "Impar", docena: "Segundo 12", mitad: "19 a 36", dosAUno: "Tercer 2 a 1" },
    { numero: 22, bottomRuleta: '321px', leftRuleta: '94px', color: "Negro", parImpar: "Par", docena: "Segundo 12", mitad: "19 a 36", dosAUno: "Primer dos a uno" },
    { numero: 23, bottomRuleta: '126px', leftRuleta: '306px', color: "Rojo", parImpar: "Impar", docena: "Segundo 12", mitad: "19 a 36", dosAUno: "Segundo 2 a 1" },
    { numero: 24, bottomRuleta: '131px', leftRuleta: '216px', color: "Negro", parImpar: "Par", docena: "Segundo 12", mitad: "19 a 36", dosAUno: "Tercer 2 a 1" },
    { numero: 25, bottomRuleta: '357px', leftRuleta: '444px', color: "Rojo", parImpar: "Impar", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Primer dos a uno" },
    { numero: 26, bottomRuleta: '481px', leftRuleta: '255px', color: "Negro", parImpar: "Par", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Segundo 2 a 1" },
    { numero: 27, bottomRuleta: '238px', leftRuleta: '440px', color: "Rojo", parImpar: "Impar", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Tercer 2 a 1" },
    { numero: 28, bottomRuleta: '429px', leftRuleta: '145px', color: "Negro", parImpar: "Par", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Primer dos a uno" },
    { numero: 29, bottomRuleta: '379px', leftRuleta: '110px', color: "Negro", parImpar: "Impar", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Segundo 2 a 1" },
    { numero: 30, bottomRuleta: '147px', leftRuleta: '363px', color: "Rojo", parImpar: "Par", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Tercer 2 a 1" },
    { numero: 31, bottomRuleta: '260px', leftRuleta: '98px', color: "Negro", parImpar: "Impar", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Primer dos a uno" },
    { numero: 32, bottomRuleta: '477px', leftRuleta: '317px', color: "Rojo", parImpar: "Par", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Segundo 2 a 1" },
    { numero: 33, bottomRuleta: '160px', leftRuleta: '162px', color: "Negro", parImpar: "Impar", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Tercer 2 a 1" },
    { numero: 34, bottomRuleta: '297px', leftRuleta: '452px', color: "Rojo", parImpar: "Par", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Primer dos a uno" },
    { numero: 35, bottomRuleta: '464px', leftRuleta: '195px', color: "Negro", parImpar: "Impar", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Segundo 2 a 1" },
    { numero: 36, bottomRuleta: '186px', leftRuleta: '409px', color: "Rojo", parImpar: "Par", docena: "Tercer 12", mitad: "19 a 36", dosAUno: "Tercer 2 a 1" },
];

