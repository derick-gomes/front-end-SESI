// parte 1 - Exibir no console

let titulo = document.getElementById("titulo");
let paragrafo = document.querySelector(".paragrafo");

console.log(titulo);
console.log(paragrafo);

//parte 2 - modificar elemento

function mudartexto() {
    titulo.innerText = "novo titulo";
    paragrafo.innerText = "novo Paragrafo";
}

//parte 3 - modificar e estilo

function mudarfundo() {
    let body = document.querySelector("body");
    body.style.backgroundColor = "blue";
}

// parte 4 - Adicionar um classe de elementos

function adicionarClasse() {
    titulo.classList.add("descricao");
    document.querySelector(".descricao").style.color = "red"
}