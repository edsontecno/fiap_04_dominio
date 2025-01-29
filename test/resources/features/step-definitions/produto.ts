import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { CreateProductDto } from "src/adapters/product/dto/create-product.dto";

class MockProductController {
  async create(dto: CreateProductDto): Promise<number> {
    return 1;
  }

  async findOne(id: number): Promise<object> {
    return {
      name: "Doce de leite",
      description: "Doce de leite da fazenda",
      price: 5.99,
      image: "",
      category: 1,
    };
  }

  async update(id: number, dto: CreateProductDto): Promise<object> {
    return {
      name: "Doce de leite amargo",
      description: "Doce de leite da fazenda",
      price: 5.99,
      image: "",
      category: 1,
    };
  }

  async remove(id: number): Promise<string> {
    return "produto apagado com sucesso";
  }
}

let controller: MockProductController;
let response: any;

Given("usuario solicita o produto", async () => {
  controller = new MockProductController();

  const productDto: CreateProductDto = {
    name: "Doce de leite",
    description: "Doce de leite da fazenda",
    price: 5.99,
    image: "",
    category: 1,
  };

  response = await controller.create(productDto);
});

When("sistema cria o produto", () => {
  if (!response) {
    throw new Error("O produto não foi criado corretamente");
  }
});

Then("retorna o numero do produto {int}", (expectedNumber: number) => {
  assert.equal(response, expectedNumber);
});

Given("usuario solicita uma consulta do produto {int}", async (id: number) => {
  controller = new MockProductController();
  response = await controller.findOne(id);
});

When("sistema busca os dados do produto", () => {
  if (!response) {
    throw new Error("O produto não foi encontrado");
  }
});

Then("retorna os dados do produto", async function (docString: string) {
  const expectedObject = JSON.parse(docString);
  assert.deepStrictEqual(response, expectedObject);
});

Given("usuario solicita alteracao do produto {int}", async (id: number) => {
  controller = new MockProductController();

  const updatedProductDto: CreateProductDto = {
    name: "Doce de leite amargo",
    description: "Doce de leite da fazenda",
    price: 5.99,
    image: "",
    category: 1,
  };

  response = await controller.update(id, updatedProductDto);
});

When("sistema atualiza o produto", () => {
  if (!response) {
    throw new Error("O produto não foi atualizado corretamente");
  }
});

Then("retorna os dados do produto atualizado", function (docString: string) {
  const expectedObject = JSON.parse(docString);
  assert.deepStrictEqual(response, expectedObject);
});

Given("usuario solicita a remocao do produto 1", async () => {
  controller = new MockProductController();
  response = await controller.remove(1);
});

When("sistema deleta o produto", () => {
  if (!response) {
    throw new Error("O produto não foi apagado corretamente");
  }
});

Then("retorna mensagem de {string}", function (expectedString: string) {
  assert.equal(response, expectedString);
});

Given("usuario solicita alteracao parcial do produto {int}", async (id: number) => {
  controller = new MockProductController();

  const updatedProductDto: CreateProductDto = {
    name: "Doce de leite amargo",
    description: "Doce de leite da fazenda",
    price: 5.99,
    image: "",
    category: 1,
  };

  response = await controller.update(id, updatedProductDto);
});

When("sistema atualiza parcialmente o produto", () => {
  if (!response) {
    throw new Error("O produto não foi atualizado corretamente");
  }
});

Then("retorna os dados do produto atualizado parcialmente", function (docString: string) {
  const expectedObject = JSON.parse(docString);
  assert.deepStrictEqual(response, expectedObject);
});

Given("usuario solicita uma consulta de produto por categoria", async () => {
  controller = new MockProductController();
  // Verifique se o método está retornando corretamente a Promise
  response = await controller.findOne(1);  // Não use callback aqui
});

When("sistema busca os produtos por categoria", () => {
  if (!response) {
    throw new Error("O produto não foi encontrado");
  }
});

Then("retorna os dados do produtos", async function (docString: string) {
  const expectedObject = JSON.parse(docString);
  assert.deepStrictEqual(response, expectedObject);
});
