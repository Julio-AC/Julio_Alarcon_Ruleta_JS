function start() {
    mostrarMenu();
}
/*JulioAlarcon*/
function dineroBanco() {
    fichasDisponibles += 5000;
    console.log("Has comprado 5000 fichas.\nFichas disponibles:" + fichasDisponibles);
    alert("Has comprado 5000 fichas.\nFichas disponibles:" + fichasDisponibles);
}

function openModal() {
    document.getElementById("modalRuleta").style.display = "block";
}

function closeModal() {
    document.getElementById("modalRuleta").style.display = "none";
}

function apuestaVisible() {
    const apuestaElements = document.getElementsByClassName("apuesta");
    for (const element of apuestaElements) {
        if (element.innerText === "0") {
            element.style.opacity = "0";
        } else {
            element.style.opacity = "1";
        }
    }
}

openModal()