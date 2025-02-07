// 1 Criar um Contador;

for(let i = 1; i<100; i ++) {
    console.log(i);

}

// verificar se um numero e par ou impar
var prompt = require("prompt-sync")();
var numero;
numero = prompt("Digite um numero:");
if (numero%2==0) {
    console.log("par");
 } else {
        console.log("impar");
    }
