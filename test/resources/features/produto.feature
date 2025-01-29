Feature: Testes BDD

  Scenario: Criar um produto
    Given usuario solicita o produto
    When sistema cria o produto
    Then retorna o numero do produto 1

  Scenario: Consultar um produto
    Given usuario solicita uma consulta do produto 1
    When sistema busca os dados do produto
    Then retorna os dados do produto
    """
      {
        "name": "Doce de leite",
        "description": "Doce de leite da fazenda",
        "price": 5.99,
        "image": "",
        "category": 1
      }
    """

  Scenario: Altera um produto
    Given usuario solicita alteracao do produto 1
    When sistema atualiza o produto
    Then retorna os dados do produto atualizado
    """
      {
        "name": "Doce de leite amargo",
        "description": "Doce de leite da fazenda",
        "price": 5.99,
        "image": "",
        "category": 1
      }
    """

  Scenario: deleta um produto
    Given usuario solicita a remocao do produto 1
    When sistema deleta o produto
    Then retorna mensagem de "produto apagado com sucesso"

  Scenario: Consultar produto por categoria
    Given usuario solicita uma consulta de produto por categoria
    When sistema busca os produtos por categoria
    Then retorna os dados do produtos
    """
      {
        "name": "Doce de leite",
        "description": "Doce de leite da fazenda",
        "price": 5.99,
        "image": "",
        "category": 1
      }
    """
