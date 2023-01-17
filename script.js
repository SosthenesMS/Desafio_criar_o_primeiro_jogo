//Variaveis globais (Escopo global)
var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
var xEvento, yEvento, raio=10;
var xAleatorio, yAleatorio, score=0;
var dificuldade = [1600, 900, 700, 600]; //nivel de repetição do setInterval
var facil, medio, dificil, god; //utilizadas para cancelar o setInterval
var select = document.getElementById('escolher');
var button = document.getElementById('selecionar');

//Iniciando o contorno do canvas
pincel.fillStyle = "white";
pincel.fillRect(0, 0, 800, 500);
pincel.fill();
pincel.fillStroke = "lightgrey";
pincel.strokeRect(0, 0, 800, 500);
pincel.fill();

function mostraScore(score){
    pincel.font = "20px serif";
    pincel.fillStyle = "black";
    pincel.fillText("Score: " + score, 700, 30);
}

function desenhaCirculo(x, y, raio, cor){
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

//Funcao utilizada pra desenhar as bordas do canvas
function desenhaRetangulo(x, y, larg, alt, cor){
    pincel.fillStyle = cor;
    pincel.fillRect (x, y, larg, alt);
}

//Funcao com os alvos já definidos + desenho da borda
function desenhaAlvos(x, y){
    desenhaCirculo(x, y, 30, 'red');
    desenhaCirculo(x, y, 20, 'white');
    desenhaCirculo(x, y, 10, 'red');

    desenhaRetangulo (0, 0, 800, 05, "lightgrey"); // barra de cima
    desenhaRetangulo(0, 0, 05, 500, "lightgrey"); // barra da esqueda
    desenhaRetangulo(795, 0, 05, 500, "lightgrey"); // barra direita
    desenhaRetangulo(0, 495, 800, 05, "lightgrey"); // barra de baixo
}

//Funcao para alterar a posicao dos alvos na tela aleatoriamente
function sorteiaPosicao(maximo){
    return Math.floor(Math.random() * maximo);
}

function atualizaTela(){
    limpaTela();
    xAleatorio = sorteiaPosicao(750);
    yAleatorio = sorteiaPosicao(450);

    desenhaAlvos(xAleatorio, yAleatorio);
    mostraScore(score);
}

function limpaTela(){
    pincel.clearRect(1, 1, 798, 498);
}

function congratualtions(){
    // pincel.fillStyle = "lightgreen";
    // pincel.fillRect(0, 0, 800, 500);
    // pincel.fill();
    pincel.font = "20px serif";
    pincel.fillStyle = "green";
    pincel.fillText("Good!", 700, 50);

}

//Funcao para resertar o nível de dificuldade
const resetaDificuldade = (dif1, dif2, dif3) => {
    clearInterval(dif1);
    clearInterval(dif2);
    clearInterval(dif3);
}

function dispara(evento){

    xEvento = evento.pageX - tela.offsetLeft;
    yEvento = evento.pageY - tela.offsetTop;

    if((xEvento > xAleatorio - raio)
    && (xEvento < xAleatorio + raio)
    && (yEvento > yAleatorio - raio)
    && (yEvento < yAleatorio + raio)){

        desenhaCirculo(xEvento, yEvento, 4, 'green');
        congratualtions();
        score++;
    }
}

tela.onclick = dispara;

//Implementar o nível de dificultade
button.addEventListener('click', (evento) => {
    switch (select.value) {
        case 'facil':
            resetaDificuldade(medio, dificil, god);
            facil = setInterval(atualizaTela, dificuldade[0]);
            break;
        case 'medio':
            resetaDificuldade(facil, dificil, god);
            medio = setInterval(atualizaTela, dificuldade[1]);
            break;
        case 'dificil':
            resetaDificuldade(facil, medio, god);
            dificil = setInterval(atualizaTela, dificuldade[2]);
            break;
        case 'god':
            resetaDificuldade(facil, medio, dificil);
            god = setInterval(atualizaTela, dificuldade[3]);
            break;
        default:
            break;
    }
});
