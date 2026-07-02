const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

const ancho = canvas.width;
const alto = canvas.height;

let pelota = {
    x: ancho / 2,
    y: alto / 2,
    radio: 10,
    dx: 5,
    dy: 5
};

let jugador1 = {
    x: 20,
    y: 180,
    ancho: 15,
    alto: 100
};

let jugador2 = {
    x: ancho - 35,
    y: 180,
    ancho: 15,
    alto: 100
};

let teclas = {};

document.addEventListener("keydown", (e) => {
    teclas[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    teclas[e.key] = false;
});

function dibujarRaquetas() {
    ctx.fillStyle = "white";

    ctx.fillRect(
        jugador1.x,
        jugador1.y,
        jugador1.ancho,
        jugador1.alto
    );

    ctx.fillRect(
        jugador2.x,
        jugador2.y,
        jugador2.ancho,
        jugador2.alto
    );
}

function dibujarPelota() {
    ctx.beginPath();

    ctx.arc(
        pelota.x,
        pelota.y,
        pelota.radio,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "white";
    ctx.fill();
}

function dibujarRed() {

    ctx.setLineDash([10, 10]);

    ctx.beginPath();

    ctx.moveTo(ancho / 2, 0);

    ctx.lineTo(ancho / 2, alto);

    ctx.strokeStyle = "white";

    ctx.lineWidth = 4;

    ctx.stroke();

    ctx.setLineDash([]);
}

function mover() {

    if (teclas["w"] && jugador1.y > 0)
        jugador1.y -= 7;

    if (teclas["s"] && jugador1.y < alto - jugador1.alto)
        jugador1.y += 7;

    if (teclas["ArrowUp"] && jugador2.y > 0)
        jugador2.y -= 7;

    if (teclas["ArrowDown"] && jugador2.y < alto - jugador2.alto)
        jugador2.y += 7;

    pelota.x += pelota.dx;
    pelota.y += pelota.dy;

    if (
        pelota.y - pelota.radio <= 0 ||
        pelota.y + pelota.radio >= alto
    ) {
        pelota.dy *= -1;
    }

    if (
        pelota.x - pelota.radio <= jugador1.x + jugador1.ancho &&
        pelota.y >= jugador1.y &&
        pelota.y <= jugador1.y + jugador1.alto
    ) {
        pelota.dx *= -1;
    }

    if (
        pelota.x + pelota.radio >= jugador2.x &&
        pelota.y >= jugador2.y &&
        pelota.y <= jugador2.y + jugador2.alto
    ) {
        pelota.dx *= -1;
    }

    if (
        pelota.x < 0 ||
        pelota.x > ancho
    ) {
        pelota.x = ancho / 2;
        pelota.y = alto / 2;

        pelota.dx *= -1;
    }
}

function actualizar() {

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );

    dibujarRed();
    dibujarRaquetas();
    dibujarPelota();

    mover();

    requestAnimationFrame(actualizar);
}

actualizar();