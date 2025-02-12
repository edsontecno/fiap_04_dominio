# API Lanchonete 5 amigos

## Integrantes do grupo 22 
- Edson Pereira de Andrade
- Evelly Cristina Cramolish Palombo Santos 
- Gabriel Fernandes Lazari 
- Marcelo Rodrigues
- Wagner Sanches

## Tecnologias
Essa api foi desenvolvivida usando as seguintes tecnologias:
 - Nestjs;
 - TypeORM;
 - Banco de dados Postgres
 - Migrations
 - Docker

## Banco de Dados

Optamos pelo banco de dados Postgres porque:

* **Integridade dos Dados**: Os relacionamentos entre tabelas (como pedidos, clientes e produtos) requerem uma estrutura que garanta integridade referencial. Os bancos de dados relacionais suportam isso de maneira nativa.

* **Consistência e Confiabilidade**: Em sistemas de e-commerce, garantir consistência e confiabilidade dos dados é essencial, pois envolve transações financeiras.

* **Flexibilidade para Consultas**: A linguagem SQL permite consultas complexas e eficientes para gerar relatórios, como vendas por cliente, produtos mais vendidos, etc.

* **Suporte a Transações**: Bancos de dados relacionais suportam transações ACID (Atomicidade, Consistência, Isolamento e Durabilidade), o que é fundamental em sistemas que lidam com pedidos e pagamentos.



 ## Executar com kubernetes

Acesse a pasta k8s

```ssh
 cd k8s
```

 Secrets: As credenciais do banco (usuário e senha) são carregadas a partir de um Secret Kubernetes, que deve ser criado previamente com os comandos:
```ssh
 kubectl create secret generic db-credentials --from-literal=username=root --from-literal=password=root
```

 Criar o PVC do Banco de Dados:
```ssh
  kubectl apply -f pvc-database.yml
```

Criar o Deployment e Service para o Banco de Dados:
```ssh
  kubectl apply -f deployment-database.yml
  kubectl apply -f service-database.yml
```

Criar o Deployment e Service para o App Node.js e aplica o Horizontal Pod Autoscaler (HPA):
```ssh
  kubectl apply -f deployment-app.yml
  kubectl apply -f service-app.yml
  kubectl apply -f hpa.yml
```

Criar o Ingress:
```ssh
  kubectl apply -f ingress-app.yml
```

Verificar os pods rodando: Para verificar se os pods foram criados corretamente e estão rodando, use:
```ssh
kubectl get pods
```

Verificar os services rodando: Para verificar os serviços criados:
```ssh
kubectl get svc
```

Monitora o status do HPA para ver se ele está escalando conforme esperado:
```ssh
kubectl get hpa
```

Formas de acessar pelo kubernet localmente
1) No arquivo /etc/hosts (Linux/macOS) ou C:\Windows\System32\drivers\etc\hosts (Windows), adicione:
```ssh
  127.0.0.1   backend.local
```

2) Usar o kubectl port-forward
```ssh
  kubectl port-forward service/dominio-app-service 3000:3000
```

O serviço dominio-app-service será acessível localmente na porta 3000, que corresponde à porta da aplicação Node.js no container.
```ssh
  http://localhost:3000/api-docs
```  
## Executar o projeto
Para executar o projeto é necessário rodar apenas o comando abaixo:

```
docker-compose up
```

## Swagger

Todos os endpoint estão documentos utilizando o Swagger, o endereço disponível após subir a aplicação é:

```
  http://localhost:3000/api-docs
```  

# Aplicação

Para execução das APIs do projeto seguir a ordem abaixo:

## Gerenciamento de categoria
Todo o gerenciamento de categorias de produtos estão disponíveis nos endpoints [/category](http://localhost:3000/api-docs#/Categoria)

## Gerenciamentos de Produtos
O gerenciamento de produtos estão disponíveis nos endpoints [/prodcut](http://localhost:3000/api-docs#/Produto)


Testes realizados
![teste](images/image.png)