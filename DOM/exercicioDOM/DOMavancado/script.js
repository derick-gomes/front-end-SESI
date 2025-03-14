function duplicarCard(){
    let card = document.getElementById("card");
    let novoCard = card.cloneNode(true);
    document.body.appendChild(novoCard)
}

let dark = false;

Document.getElementById("darkMode").addEventListener(
    "click",mudarEstiloFundo
)

function mudarEstiloFundo(){
    let btn = document.getElementById("darkMode");
    if(dark === false){
        document.body.classList.add("darkMode");
        dark = true;
    }else(
        document.body.classList.remove("darkMode");
        dark = false; 
    );
};

// captura Eventos do teclado   
<input type="text" id="busca" placeholder="Digite para buscar...">
<ul id="sugestoes"></ul>

<script>
let sugestoes = ["JavaScript", "Java", "Python", "C++", "PHP", "Ruby"];

document.getElementById("busca").addEventListener("keyup", function() {
    let termo = this.value.toLowerCase();
    let lista = document.getElementById("sugestoes");
    lista.innerHTML = "";

    sugestoes.forEach(sugestao => {
        if (sugestao.toLowerCase().includes(termo)) {
            let item = document.createElement("li");
            item.innerText = sugestao;
            lista.appendChild(item);
        }
    });
});


<form id="formCadastro">
    <input type="text" id="nome" placeholder="Nome">
    <input type="email" id="email" placeholder="E-mail">
    <button type="submit">Enviar</button>
</form>
<p id="mensagem"></p>



<script>
document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem");

    if (nome === "" || email === "") {
        mensagem.innerText = "Todos os campos são obrigatórios!";
        mensagem.style.color = "red";
    } else {
        mensagem.innerText = "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";
    }
});
