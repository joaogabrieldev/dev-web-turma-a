var ola = "Olá mundo JS";

console.log(ola);

function log(valor) {
  console.log(`${valor}: ${typeof valor} `);
}

var valor = 10;
log(valor);

var palavra = "Fernando";
log(palavra);

var isOk = true;
log(isOk);

var meuObj = {};
var meuArray = [];
var nulo = null;
var variavelFlamengo;

function compararEscopo() {
  if (true) {
    var varDentro = "Var dentro do bloco";
    var letDentro = "Let dentro do bloco";
    const constDentro = "Const dentro do bloco";

    log(varDentro);
    log(letDentro);
    log(constDentro);
  }

  log(varDentro);
}

compararEscopo();

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2);
log(n1 * n2);
log(n1 / n2);
log(n2 == valorNumericoStr);
log(n2 === valorNumericoStr);

log((n2 > n1 || n2 > n1) && 1 > 2);

let frutas = ["Maçã", "Banana", "Laranja"];
log(frutas.length);
log(frutas[2]);
log(frutas);

frutas.pop();
log(frutas);

frutas.push("Manga");
log(frutas);

const idade = 18;
if (idade >= 18) {
  log("Sou Adulto");
} else if (idade >= 2) {
  log("Sou criança");
} else {
  log("Sou bebê");
}

const instituicao = "CEUB";

switch (instituicao) {
  case "CEUB":
  case "Católica":
    log(`Faculdade: ${instituicao}`);
    break;
  case "CIL":
    log(`Escola de Linguas: ${instituicao}`);
    break;
  case "CEM10":
    log(`Escola: ${instituicao}`);
    break;
}

for (let i = 0; i < frutas.length; i++) {
  console.log(`Fruta: ${frutas[i]}`);
}

let valorWhile = 0;

while (valor < 5) {
  console.log(`Valor no While: ${valorWhile}`);
  valorWhile++;
}

async function buscarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Dados Recebidos");
    }, 4000);
  });
}

async function executarBusca() {
  log("Buscando....");
  let resultado = await buscarDados();
  log(resultado);
}

executarBusca();

const meuMetodo = function exemploMetodo() {
  log("Executei por metodo normal");
};

log(meuMetodo);

const objetoTeste = {
  oi() {
    log("Oi!");
  },
  tchau() {
    log("Tchau");
  },
};

objetoTeste.oi();
objetoTeste.tchau();

