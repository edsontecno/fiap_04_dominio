Feature: Testes DDO

  Scenario: Criar um produto
    Given usuario solicita o pedido
    When sistema cria o pedido
    Then retorna o numero do pedido 1
