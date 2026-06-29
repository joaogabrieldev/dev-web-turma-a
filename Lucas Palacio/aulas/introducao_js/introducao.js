var ola = "Ola Mundo JS";

console.log(ola);

function log(valor){
    console.log(valor);
}

//Tipos de variáveis

var valor= 10;
log(typeof valor);//number

var palavra = "Fernando";
log(typeof palavra); //string

var is0k=true;
log(typeof is0k);//boolean

var meuObj = {};//Object
var meuArray = [];//Array
var nulo = null;//null
var variavelFlamengo;//Undefind

//escopo de variável
function compararEscopo() {
    if(true){
        var varDentro = "Var dentro do bloco";
        let letdentro = "let dentro do bloco";
        const constdentro = "const dentro do bloco";

        log(varDentro);
        log(letdentro);
        log(constdentro);
    }
    log(varDentro);
    
}
compararEscopo();

//operações Simples
const n1=1;
const n2= 5;
const valorNumercoStr="5";
log(n1+n2);//6
log(n1*n2)//5
log(n1/n2)//0.2

log(n1 == n2);//false
log(n2 == valorNumercoStr); //true
log (n2 === valorNumercoStr);//false

log((n2 > n1 || n2 >1) && 1>2);//false

//Manipuland arrays
let frutas = ["Maça","Banana","laranja"];
log(frutas.length);//3
log(frutas[0]);

log(frutas);

frutas.pop()// remove o último

log(frutas);

frutas.push("Manga");//adiciona um elemeto

log(frutas);

//Estruturas condicionais
const idade =18;
if (idade >= 18) {
    log("sou Adulto");
}else if (idade >=2) {
    log("Sou Criança");
} else{
    log("Sou bebê");
}

const instituicao = "CEUB ";

switch(instituicao){
    case "CEUB":
        log("Faculdade");
        break;
    case "CIL":
        log("Escola de línguas");
        break;
    case "CEM10":
        log("Escola");
        break;
}

for (let loop = 0; loop < 5; loop++){
    log (`Meu valor no loop:${loop}`);
}

let valorwhile =0;
while (valorwhile <5) {
    log(`Meu valor no while ${valorwhile}`);
    valorwhile++;
}


//função assíncronas permitem executar operações 
//se bloquear a execução do código

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve("Dados recebidos");
    }, 4 *1000);
  });
}

async function ExecutarBusca() {
    log("Buscando....");
    let resultado = await buscarDados();
    log(resultado);
}
ExecutarBusca();

const meuMetodo = function exemploMetodo(){
    log("Executei por metodo normal");
};

log(meuMetodo);

const objTeste = {
    oi(){
        log("oi");
    },
    tchau(){
        log("tchau");
    }
}
objTeste.oi();
objTeste.tchau();