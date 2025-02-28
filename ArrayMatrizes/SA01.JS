// SITUAÇAO DE APRENDIZAGEM 01 - Array
const prompt = require("prompt-sync")();// entrada de dados

// array notas
let notas = []; // array de notas

function InserirNotas(){
    let notas = prompt("Digite nota: ");
    notas.Push(notas);

}

function calcularMedia(){
    let media = notas.reduce((soma,notas)=> soma) => soma+Nota,0/notas.length
    console.log("A Media e"media)
}

function menu(){
    let continuar = true;
    while (continuar) {
        console.log("calculadora media |");
        console.log("|1 . inserir nota  |");
        console.log("|2 . calcular media   |");
        console.log("|3 . sair   |");
        console.log("=====================");
        let operecao =  prompt ("Escolha a Opçao Desejada: ");
        switch (operecao) {
            case "i":
                InserirNotas();
                break;
                case "2"
                calcularMedia();
                break;
                case "3";
                continuar = false;
                console.log("saindo...")
        
            default:
                break;
        }
    }

}