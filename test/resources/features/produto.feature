Feature: Testar Cucumber com TypeScript
  Scenario: validar mensagem de boas-vindas
    Given o usuário acessa o sistema
    When o sistema retorna a mensagem de boas-vindas
    Then a mensagem exibida é "Bem-vindo!"

  Scenario: criar um pedido
    Given cliente solicita o pedido
    When o sistema gera o pedido
    Then e retorna o numero do pedido "1"
