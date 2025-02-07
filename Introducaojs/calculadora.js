// criar uma calculadora simples em Javascript


var numero1, numero2, resultado;
var operacao;
var continuar = true;

// funçoes de opereçao

function soma(a,b) {
    return a+b;
}
function subtracao(a, b){
    return a - b;
}
function multiplicacao(a, b) {
    return a * b;
}
function divisao(a,b) {
    return a / b;
}

while (continuar) {
    console.log("calculadora Simples");
    console.log("1. Soma");
    console.log("2. subtraçao")
    console.log("3. Multiplicaçao");
    console.log("4. divisao");
    console.log("5. sair");
    operacao = number (prompt("informe a Operacao Desejada:"));
    // pedir os números
    numero1 = prompt("informe o 1º nº");
    numero2 = prompt("informe 0 2º nº");
    // codicao de escolha 
    switch (operacao) {
        case 1:
            resultado = soma(numero1, numero2);
            console.log("O resultado e "+ resultado);
            break;
    
        default:
            break;
    }




}