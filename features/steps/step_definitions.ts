import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";

let mensagem: string;

Given("o usuário acessa o sistema", () => {
  mensagem = "";
});

When("o sistema retorna a mensagem de boas-vindas", () => {
  mensagem = "Bem-vindo!";
});

Then('a mensagem exibida é {string}', (expectedMessage: string) => {
  assert.equal(mensagem, expectedMessage);
});
