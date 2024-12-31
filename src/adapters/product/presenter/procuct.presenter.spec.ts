import { Product } from '../../../application/product/entities/Product';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProdutctPresenter } from './ProductPresenter';

describe('ProdutctPresenter', () => {
  let presenter: ProdutctPresenter;

  beforeEach(() => {
    presenter = new ProdutctPresenter();
  });

  describe('convertEntityToResponseDto', () => {
    it('should convert a Product entity to CreateProductDto', () => {
      const productEntity: Product = new Product(
        1,
        'Coca-Cola',
        'Refrigerante de cola',
        5.99,
        'image_url',
        1,
      );

      const result = presenter.convertEntityToResponseDto(productEntity);

      expect(result).toBeInstanceOf(CreateProductDto);
      expect(result.name).toBe(productEntity.name);
      expect(result.description).toBe(productEntity.description);
      expect(result.image).toBe(productEntity.image);
      expect(result.price).toBe(productEntity.price);
      expect(result.category).toBe(productEntity.category);
    });
  });

  describe('returnIdOfEntity', () => {
    it('should return the ID of a Product entity', () => {
      const productEntity: Product = new Product(
        1,
        'Coca-Cola',
        'Refrigerante de cola',
        5.99,
        'image_url',
        1,
      );

      const result = presenter.returnIdOfEntity(productEntity);

      expect(result).toBe(productEntity.id);
    });

    it('should return undefined if the Product entity has no ID', () => {
      const productEntity: Product = new Product(
        null,
        'Coca-Cola',
        'Refrigerante de cola',
        5.99,
        'image_url',
        1,
      );

      const result = presenter.returnIdOfEntity(productEntity);

      expect(result).toBeNull();
    });
  });
});
