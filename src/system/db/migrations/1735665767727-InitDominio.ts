import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDominio1735665767727 implements MigrationInterface {
  name = 'InitDominio1735665767727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" character varying(500) NOT NULL, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" character varying(500) NOT NULL, "preco" numeric(10,2) NOT NULL, "imagem" text, "categoriaId" integer, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD CONSTRAINT "FK_8a509e69a8c1575d0247844daec" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `INSERT INTO categorias(nome, descricao) VALUES('Lanche', 'Categoria de lanches');`,
    );

    await queryRunner.query(
      `INSERT INTO categorias(nome, descricao) VALUES('Acompanhamento', 'Categoria de acompanhamento');`,
    );

    await queryRunner.query(
      `INSERT INTO categorias(nome, descricao) VALUES('Bebidas', 'Categoria de bebidas');`,
    );

    await queryRunner.query(
      `INSERT INTO categorias(nome, descricao) VALUES('Sobremesa', 'Categoria de sobremesa');`,
    );

    await queryRunner.query(
      `INSERT INTO produtos(nome, descricao, preco, "categoriaId") VALUES('Hamburguer', 'Hambuguer com dois humburguer, alface e tomate', 10.99, 1);`,
    );

    await queryRunner.query(
      `INSERT INTO produtos(nome, descricao, preco, "categoriaId") VALUES('Batata frita', 'Batata frita em palito', 5.99, 2);`,
    );

    await queryRunner.query(
      `INSERT INTO produtos(nome, descricao, preco, "categoriaId") VALUES('Coca-cola', 'Refrigerante coca-cola', 8.99, 3);`,
    );

    await queryRunner.query(
      `INSERT INTO produtos(nome, descricao, preco, "categoriaId") VALUES('Doce de leite', 'Doce de leite vegano', 3.99, 4);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" DROP CONSTRAINT "FK_8a509e69a8c1575d0247844daec"`,
    );
    await queryRunner.query(`DROP TABLE "produtos"`);
    await queryRunner.query(`DROP TABLE "categorias"`);
  }
}
