// funcoes matematicas (math)

Math.sqrt // math.pow

// Raiz quadrada de 25
console.log(Math.sqrt (25)); //5

//potencia de nº
console.log(Math.pow(3,2)); // 3º = 9
console.log(Math.pow(4,3)); // 4º = 64
console.log(Math.pow(27,1/3)); // 27^(1/3)=3 - raiz cubica

// arredondamento usando math(round, floor, ceil)
// round - numero mais proximo
console.log(Math.round(4.3)); //4
console.log(Math.round(4.7)); //5
console.log(Math.ceil(4.1)); // Retorna 5 
console.log(Math.floor(4.9)); // Retorna 4 

// math. ramdom - numeros aleatorios
console.log(Math.floor(Math.random())); 0->1
//0 - > 99
console.log(Math.floor(Math.random()*100));
// 1 -> 100 
console.log(Math.floor(Math.random() *100));

//30 -> 40
console.log(Math.abs(-10)); // Retorna 10 (valor absoluto)
console.log(Math.min(5, 2, 9, 3)); // Retorna 2 (o menor valor da lista)
console.log(Math.max(5, 2, 9, 3)); // Retorna 9 (o maior valor da lista)
