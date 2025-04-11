class ContaBancaria {
    // Construtor que inicializa o titular e o saldo
    constructor(titular, saldoInicial = 0) {
      this.titular = titular;
      this.saldo = saldoInicial;
    }
  
    // Método para depositar valor na conta
    depositar(valor) {
      if (valor > 0) {
        this.saldo += valor;
        console.log(`Depósito de R$${valor} realizado com sucesso!`);
      } else {
        console.log("Valor de depósito inválido.");
      }
    }
  
    // Método para sacar valor da conta
    sacar(valor) {
      if (valor > 0 && this.saldo >= valor) {
        this.saldo -= valor;
        console.log(`Saque de R$${valor} realizado com sucesso!`);
      } else if (valor <= 0) {
        console.log("Valor de saque inválido.");
      } else {
        console.log("Saldo insuficiente para realizar o saque.");
      }
    }
  
    // Método para exibir o saldo atual
    exibirSaldo() {
      console.log(`Saldo atual da conta de ${this.titular}: R$${this.saldo}`);
    }
  }
  
  // Exemplo de uso
  let conta = new ContaBancaria("João", 1000);  // Criando uma conta com saldo inicial de R$1000
  conta.exibirSaldo();  // Exibe o saldo atual
  conta.depositar(500);  // Deposita R$500
  conta.sacar(300);  // Realiza um saque de R$300
  conta.exibirSaldo();  // Exibe o saldo atualizado
  