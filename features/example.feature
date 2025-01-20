Feature: Testar Cucumber com TypeScript
  Scenario: Validar mensagem de boas-vindas
    Given o usuário acessa o sistema
    When o sistema retorna a mensagem de boas-vindas
    Then a mensagem exibida é "Bem-vindo!"
