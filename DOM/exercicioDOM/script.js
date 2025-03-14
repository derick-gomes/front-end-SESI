// Exemplo de uso de DOM
//header => DOM
let header = document.createElement("div");
document.body.appendChild(header);
header.style.backgroundColor = "black";
header.style.height = "8vh"
let menu = document.createElement("div");
header.appendChild(menu);
header.classList.add("header");
menu.classList.add("menu");
let menuItens = ["Inicio","produtos", "contato"];
menuItens.forEach(element => {
    let item = document.createElement("a");
    item.innerText = element;
    menu.appendChild(item);
});
menu.style.display = "flex";
menu.style.justifyContent = "space-around";
menu.style.alignItems = "center"
menu.style.color = "white"
menu.style.height = "100%"
