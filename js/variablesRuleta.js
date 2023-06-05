const autor = 'Julio';
const version = '1.4';
const numeroMaximo = 36;
const numeroMinimo = 0;
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
    { numero: 1, bottomRuleta: '181px', leftRuleta: '141px', color: "rojo", parImpar: "impar", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno1" },
    { numero: 2, bottomRuleta: '384px', leftRuleta: '432px', color: "negro", parImpar: "par", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno2" },
    { numero: 3, bottomRuleta: '475px', leftRuleta: '223px', color: "rojo", parImpar: "impar", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno3" },
    { numero: 4, bottomRuleta: '433px', leftRuleta: '396px', color: "negro", parImpar: "par", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno1" },
    { numero: 5, bottomRuleta: '125px', leftRuleta: '246px', color: "rojo", parImpar: "impar", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno2" },
    { numero: 6, bottomRuleta: '267px', leftRuleta: '449px', color: "negro", parImpar: "par", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno3" },
    { numero: 7, bottomRuleta: '406px', leftRuleta: '126px', color: "rojo", parImpar: "impar", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno1" },
    { numero: 8, bottomRuleta: '135px', leftRuleta: '335px', color: "negro", parImpar: "par", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno2" },
    { numero: 9, bottomRuleta: '291px', leftRuleta: '94px', color: "rojo", parImpar: "impar", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno3" },
    { numero: 10, bottomRuleta: '123px', leftRuleta: '276px', color: "negro", parImpar: "par", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno1" },
    { numero: 11, bottomRuleta: '164px', leftRuleta: '388px', color: "negro", parImpar: "impar", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno2" },
    { numero: 12, bottomRuleta: '448px', leftRuleta: '168px', color: "rojo", parImpar: "par", docena: "primer12", mitad: "1 a 18", dosAUno: "dosAUno3" },
    { numero: 13, bottomRuleta: '210px', leftRuleta: '427px', color: "negro", parImpar: "impar", docena: "segundo12", mitad: "1 a 18", dosAUno: "dosAUno1" },
    { numero: 14, bottomRuleta: '231px', leftRuleta: '107px', color: "rojo", parImpar: "par", docena: "segundo12", mitad: "1 a 18", dosAUno: "dosAUno2" },
    { numero: 15, bottomRuleta: '467px', leftRuleta: '346px', color: "negro", parImpar: "impar", docena: "segundo12", mitad: "1 a 18", dosAUno: "dosAUno3" },
    { numero: 16, bottomRuleta: '143px', leftRuleta: '188px', color: "rojo", parImpar: "par", docena: "segundo12", mitad: "1 a 18", dosAUno: "dosAUno1" },
    { numero: 17, bottomRuleta: '327px', leftRuleta: '451px', color: "negro", parImpar: "impar", docena: "segundo12", mitad: "1 a 18", dosAUno: "dosAUno2" },
    { numero: 18, bottomRuleta: '351px', leftRuleta: '99px', color: "rojo", parImpar: "par", docena: "segundo12", mitad: "1 a 18", dosAUno: "dosAUno3" },
    { numero: 19, bottomRuleta: '452px', leftRuleta: '372px', color: "rojo", parImpar: "impar", docena: "segundo12", mitad: "19 a 36", dosAUno: "dosAUno1" },
    { numero: 20, bottomRuleta: '205px', leftRuleta: '122px', color: "negro", parImpar: "par", docena: "segundo12", mitad: "19 a 36", dosAUno: "dosAUno2" },
    { numero: 21, bottomRuleta: '410px', leftRuleta: '416px', color: "rojo", parImpar: "impar", docena: "segundo12", mitad: "19 a 36", dosAUno: "dosAUno3" },
    { numero: 22, bottomRuleta: '321px', leftRuleta: '94px', color: "negro", parImpar: "par", docena: "segundo12", mitad: "19 a 36", dosAUno: "dosAUno1" },
    { numero: 23, bottomRuleta: '126px', leftRuleta: '306px', color: "rojo", parImpar: "impar", docena: "segundo12", mitad: "19 a 36", dosAUno: "dosAUno2" },
    { numero: 24, bottomRuleta: '131px', leftRuleta: '216px', color: "negro", parImpar: "par", docena: "segundo12", mitad: "19 a 36", dosAUno: "dosAUno3" },
    { numero: 25, bottomRuleta: '357px', leftRuleta: '444px', color: "rojo", parImpar: "impar", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno1" },
    { numero: 26, bottomRuleta: '481px', leftRuleta: '255px', color: "negro", parImpar: "par", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno2" },
    { numero: 27, bottomRuleta: '238px', leftRuleta: '440px', color: "rojo", parImpar: "impar", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno3" },
    { numero: 28, bottomRuleta: '429px', leftRuleta: '145px', color: "negro", parImpar: "par", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno1" },
    { numero: 29, bottomRuleta: '379px', leftRuleta: '110px', color: "negro", parImpar: "impar", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno2" },
    { numero: 30, bottomRuleta: '147px', leftRuleta: '363px', color: "rojo", parImpar: "par", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno3" },
    { numero: 31, bottomRuleta: '260px', leftRuleta: '98px', color: "negro", parImpar: "impar", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno1" },
    { numero: 32, bottomRuleta: '477px', leftRuleta: '317px', color: "rojo", parImpar: "par", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno2" },
    { numero: 33, bottomRuleta: '160px', leftRuleta: '162px', color: "negro", parImpar: "impar", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno3" },
    { numero: 34, bottomRuleta: '297px', leftRuleta: '452px', color: "rojo", parImpar: "par", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno1" },
    { numero: 35, bottomRuleta: '464px', leftRuleta: '195px', color: "negro", parImpar: "impar", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno2" },
    { numero: 36, bottomRuleta: '186px', leftRuleta: '409px', color: "rojo", parImpar: "par", docena: "tercer12", mitad: "19 a 36", dosAUno: "dosAUno3" },
];

