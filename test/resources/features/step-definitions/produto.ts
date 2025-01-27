import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { CreateProductDto } from "src/adapters/product/dto/create-product.dto";

class MockProductController {
  async create(dto: CreateProductDto): Promise<number> {
    return 1;
  }
}

let controller: MockProductController;
let response: any;

Given("usuario solicita o pedido", async () => {
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

When("sistema cria o pedido", () => {
  if (!response) {
    throw new Error("O pedido não foi criado corretamente");
  }
});

Then("retorna o numero do pedido {int}", (expectedNumber: number) => {
  assert.equal(response, expectedNumber);
});
