// lista de Tarefas (toDoList)

// dispara o evento
document.getElementById("btnAdiconar"),addEventListener("click",criarTarefa);

function criarTarefa(){
    let input = document.getElementById("tarefa");
    let texto = criarTarefa.value.trim();//remove os espaços antes e depois do texto //verificar se a tarefa nao esta vazia 
    if(texto===""){
        return;
    }
    let li = document.createdElement("li");
    li = texto+ '<button onclick="removerTarefa(this)">remover</button';
    //adiconar o li -> ul
    
}