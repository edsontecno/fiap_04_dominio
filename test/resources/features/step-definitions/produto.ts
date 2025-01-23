import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { ProductAdapterController } from "../../../../src/adapters/product/controller/ProductAdapterController";
let mensagem: string;
let numero: string;

Given("o usuário acessa o sistema",  () => {
  mensagem = "";
});
When("o sistema retorna a mensagem de boas-vindas", () => {
  mensagem = "Bem-vindo!";
});
Then('a mensagem exibida é {string}', (expectedMessage: string) => {
  assert.equal(mensagem, expectedMessage);
});


Given("cliente solicita o pedido", () => {
  numero = "1";
});
When("o sistema gera o pedido", () => {
});
Then('e retorna o numero do pedido {string}', (expectedNumber: string) => {
  assert.equal(numero, expectedNumber); 
});