let texto = "Aula de JavaScript";

// contagem dos caracteres (lenght)
console.log(texto.length); // 18

console.log(texto.toUpperCase()); // "MAIUSCULA!"
console.log(texto.toLowerCase()); // "minuscula!"

console.log(texto.substring(0, 10));
console.log(texto.slice(-10));

//substituiçao de texto
let novoTexto = texto.replace("Java","type");
console.log(novoTexto);

// trim (tesoura)
let textoCortado = textoEspaco.trim();
console.log(textoEspaco);
console.log(textoCortado);

// split (separaçao)

let linguagens = "JavaScript, Python, PHP,C++, java";
let linguagensArray = linguagens.split(", ");

