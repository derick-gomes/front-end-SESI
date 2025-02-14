function calculadora(num1, num2, operacao) {
    if (operacao === "+") {
      return num1 + num2;
    } else if (operacao === "-") {
      return num1 - num2;
    } else if (operacao === "*") {
      return num1 * num2;
    } else if (operacao === "/") {
      return num1 / num2;
    } else {
      return "Operação inválida";
    }
  }
  
  console.log(calculadora(10, 5, "+"));
  console.log(calculadora(9, 3, "/"));
  