let idade = prompt("Digite sua idade:");

if (idade < 16) {
  console.log("Não pode votar.");
} else if (idade >= 16 && idade <= 17) {
  console.log("Voto opcional.");
} else {
  console.log("Voto obrigatório e pode tirar CNH.");
}
