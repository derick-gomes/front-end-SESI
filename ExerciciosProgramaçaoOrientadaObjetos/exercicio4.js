class Funcionario {
    // Construtor para inicializar os atributos
    constructor(nome, salario, cargo) {
      this.nome = nome;
      this.salario = salario;
      this.cargo = cargo;
    }
  
    // Método para aumentar o salário com base no percentual
    aumentarSalario(percentual) {
      const aumento = (this.salario * percentual) / 100;
      this.salario += aumento;
    }
  
    // Método para exibir as informações do funcionário
    exibirInfo() {
      console.log(`Nome: ${this.nome}`);
      console.log(`Salário: R$ ${this.salario.toFixed(2)}`);
      console.log(`Cargo: ${this.cargo}`);
    }
  }
  
  // Exemplo de uso:
  
  // Criando um funcionário
  const funcionario1 = new Funcionario('João Silva', 3000, 'Analista');
  
  // Exibindo informações do funcionário
  funcionario1.exibirInfo();
  
  // Aumentando o salário em 10%
  funcionario1.aumentarSalario(10);
  
  // Exibindo informações após aumento
  console.log('Após aumento de 10%:');
  funcionario1.exibirInfo();
  