var ola = "Olá mundo JS";
console.log(ola);

function log(valor) {
    console.log(valor);
}

//Tipos de variáveis 

var valor = 10;
log(typeof valor); //number

var palavra ="Lucas";
log(typeof palavra); //string

var isOk = true;
log(typeof isOk); //boolean

var meuObj = {}; //Object
var meuArray = []; //Array
var nulo = null; //null
var variavelFlamengo; //Undefind

//Escopo de Variável 
function compararEscopo () {
    if(true){
        var varDentro = "Var dentro do bloco";
        let letDentro = "Let dentro do bloco";
        const constDentro = "Const dentro do bloco";

        log (varDentro);
        log(letDentro);
        log(constDentro);
    }
    log(varDentro);
}
compararEscopo();

//Operações Simples

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2); //6
log(n1 * n2); //5
log(n1 / n2); //0.2

log(n1 == n2); //false
log(n2 == valorNumericoStr); //true
log(n1 === valorNumericoStr); //false

log((n2 > n1 || n2 > n1) && 1 > 2); //false

//Manipulando Arrays

let frutas = ["Maça", "Banana", "Laranja"];

log(frutas.length); //3
log(frutas[0]);

log(frutas);

frutas.pop(); //Remove o último

log(frutas);

frutas.push("Manga"); //Adiciona um Elemento

log(frutas);

//Estruturas condicionais
const idade = 18;
if(idade >= 18){
    log("Sou Adulto");
} else if(idade >= 2){
    log("Sou criança");
} else {
    log("Sou bebê")
}

const instituicao = "CEUB"

switch(instituicao) {
    case "CEUB":
        log("Faculdade");
        break;
        case "CIL":
            log("Escola de Línguas")
            break;
            case "CEM10":
                log("Escola");
                break;
}

for (let loop = 0; loop <= 5; loop++) {
    log(`Meu valor no loop: ${loop}`);
}

let valorWhile = 0;
while(valorWhile < 5) {
    log(`Meu valor do While: ${valorWhile}`)
    valorWhile++;
}


//Funções Assícronas permitem executar operações 
//sem bloquear a execução do código

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Dados Recebidos");  
        }, 4*1000);
    });
}
async function executarBusca() {
    log("Buscando......");
    let resultado = await buscarDados();
    log(resultado)
}

executarBusca();

const meuMetodo = function exemploMetodo() {
    log("Executei por método normal");
};

log(meuMetodo);

const objTeste = {
    oi() {
        log("oi");
    },
    tchau() {
        log("tchau")
    },
};

objTeste.oi();
objTeste.tchau();

function toggleImagem() {
    let img = document.getElementById("minhaImagem");
    img.style.display = img.style.display === "none" ? "block" : "none";
}