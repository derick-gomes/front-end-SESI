// tipo de Dados

var nome = "derick"; //tipo texto (String)
let idade = "25"; // tipo inteiro (number)
var nota = 9.5; // tipo decimal (number)
var data ; // tipo indefinido (undefined)
var aprovado = true; // tipo boleana(boolean)
var diploma = null; // tipo nula (null)

// variaveis e constantes (var, let, const)
var notal = 5; // declarae
nota1 = 7; // redeclarar

let nota2 = 8; // declarar
nota2 = 9; //redefinido
// let nota2 = 10; erro - redeclarar

const media = 7.5
media = 8; // erro - redefinir
const Media = 8; // erro - redeclarar

// operadores Aritimeticos
let a = 10;
let b = 3;
console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.33
console.log(a % b); // 

// Operadores Relacionais (boolean)
console.log(5<10);// true
console.log("10"====10); // true
console;log("10"===10); // false

// operadores Logicos (E, ou, Nao)
var notaA = 5;
var ntaB = 7;

console.log(notaA >= 7 || notaB >=7); //true
console.log(notaA >= 7 && notaB >=7); //false
console.log(!true);  //false

// condicionais (if/else, swicht(case))

var idade = 25;

if (idade >=18) {
    console.log("maior idade");
    else {
    console.log("menor idade");
    }
}

 var mes = 2;

switch (mes) {
    case 1:
        console.log("janeiro")
        break;
    case 2:
        console.log("fevereiro")
        break;
    default:
        console.log("outro mes")
        break;    

}

//loops (for/while/ dowhile)

for (let i = 0; i < 5; i++) {
    console.log("iteraçao: "+i); // 0, 1, 2, 3, 3
}

var condition = true 
var numero = 3
var contador = 0;
while (conditiom) {
    let sorteio =0 Math,ramdom(5)
    contador++
    if (numero == sorteio)
        console.log("acertou Com "+contador +"tentativas");
    
}




