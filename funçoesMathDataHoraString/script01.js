//Funçoes data e hora
let agora = new Date(); // instanciando
console.log(agora); // Retorna a data e hora atual
console.log(agora.toDateString()); // Retorna a data no formato abreviado (ex: "Wed Feb 07 2025")
console.log(agora.toLocaleDateString()); // Retorna a data formatada conforme o local (ex: "07/02/2025" no Brasil)
console.log(agora.toLocaleTimeString()); // Retorna apenas a hora formatada
console.log(agora.getFullYear()); // Retorna o ano (ex: 2025)
console.log(agora.getMonth()); // Retorna o mês (0 = Janeiro, 1 = Fevereiro, etc.)
console.log(agora.getDate()); // Retorna o dia do mês
console.log(agora.getDay()); // Retorna o dia da semana (0 = Domingo, 1 = Segunda, etc.)

agora.setFullYear(2030);
console.log(agora.getFullYear()); // Agora retorna 2030

agora.setMonth(11); // Define o mês para Dezembro (0 = Janeiro)
console.log(agora.getMonth()); // Retorna 11

agora.setDate(25); // Define o dia do mês para 25
console.log(agora.getDate()); // Retorna 25

let data1 = new Date("2025-02-07");
let data2 = new Date("2025-12-25");
let diferenca = data2 - data1; // Retorna a diferença em milissegundos

let dias = diferenca / (1000 * 60 * 60 * 24); // Converte para dias
console.log(`Diferença entre as datas: ${dias} dias`);

