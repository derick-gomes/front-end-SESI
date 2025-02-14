let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
let palpite = prompt("Tente adivinhar o número entre 1 e 10:");

if (parseInt(palpite) === numeroAleatorio) {
  console.log("Você acertou!");
} else {
  console.log(`Você errou! O número era ${numeroAleatorio}`);
}
