import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../../../adapters/product/gateway/Product.entity';
import { Product } from '../../../application/product/entities/Product';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductGateway } from './ProductGateway';

describe('ProductGateway', () => {
  let gateway: ProductGateway;
  let repositoryMock: Partial<Repository<ProductEntity>>;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductGateway,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    gateway = module.get<ProductGateway>(ProductGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('save', () => {
    it('should save a product and return it', async () => {
      const product = new Product(
        null,
        'Coca-Cola',
        'Refrigerante',
        5.99,
        'image_url',
        1,
      );
      const savedEntity = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante',
        price: 5.99,
        image: 'image_url',
        category: 1,
      };

      (repositoryMock.save as jest.Mock).mockResolvedValue(savedEntity);

      const result = await gateway.save(product);

      expect(repositoryMock.save).toHaveBeenCalledWith(
        expect.any(ProductEntity),
      );
      expect(result).toEqual(
        new Product(1, 'Coca-Cola', 'Refrigerante', 5.99, 'image_url', 1),
      );
    });
  });

  describe('get', () => {
    it('should return a product by ID', async () => {
      const productEntity = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante',
        price: 5.99,
        image: 'image_url',
        category: 1,
      };

      (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(productEntity);

      const result = await gateway.get(1);

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(
        new Product(1, 'Coca-Cola', 'Refrigerante', 5.99, 'image_url', 1),
      );
    });

    it('should return null if the product is not found', async () => {
      (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);

      const result = await gateway.get(1);

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a product by ID', async () => {
      const productEntity = { id: 1 };

      jest.spyOn(gateway, 'getEntity' as any).mockResolvedValue(productEntity);
      (repositoryMock.delete as jest.Mock).mockResolvedValue(undefined);

      await gateway.delete(1);

      expect(repositoryMock.delete).toHaveBeenCalledWith(1);
    });

    // it('should throw an error if product is linked to another entity', async () => {
    //   const productEntity = { id: 1 };

    //   jest.spyOn(gateway, 'getEntity' as any).mockResolvedValue(productEntity);
    //   (repositoryMock.delete as jest.Mock).mockRejectedValue(
    //     new QueryFailedError('query', [], 'violates foreign key constraint'),
    //   );

    //   await expect(gateway.delete(1)).rejects.toThrowError('PRODUTO_VINCULADO');
    // });
  });

  describe('update', () => {
    it('should update a product and return the updated entity', async () => {
      const product = new Product(
        1,
        'Coca-Cola Zero',
        'Refrigerante Diet',
        6.99,
        'image_url',
        1,
      );
      const productEntity = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante',
        price: 5.99,
        image: 'image_url',
        category: 1,
      };

      jest.spyOn(gateway, 'getEntity' as any).mockResolvedValue(productEntity);
      (repositoryMock.save as jest.Mock).mockResolvedValue(productEntity);

      const result = await gateway.update(1, product);

      expect(repositoryMock.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Coca-Cola Zero' }),
      );
      expect(result).toEqual(
        new Product(
          1,
          'Coca-Cola Zero',
          'Refrigerante Diet',
          6.99,
          'image_url',
          1,
        ),
      );
    });
  });

  describe('findAllByCategory', () => {
    it('should return all products in a category', async () => {
      const productEntities = [
        {
          id: 1,
          name: 'Coca-Cola',
          description: 'Refrigerante',
          price: 5.99,
          image: 'image_url',
          category: 1,
        },
        {
          id: 2,
          name: 'Fanta',
          description: 'Refrigerante de laranja',
          price: 4.99,
          image: 'image_url',
          category: 1,
        },
      ];

      (repositoryMock.find as jest.Mock).mockResolvedValue(productEntities);

      const result = await gateway.findAllByCategory(1);

      expect(repositoryMock.find).toHaveBeenCalledWith({
        where: { category: { id: 1 } },
      });
      expect(result).toEqual([
        new Product(1, 'Coca-Cola', 'Refrigerante', 5.99, 'image_url', 1),
        new Product(
          2,
          'Fanta',
          'Refrigerante de laranja',
          4.99,
          'image_url',
          1,
        ),
      ]);
    });
  });

  describe('convertDtoToEntity', () => {
    it('should convert CreateProductDto to Product', () => {
      const dto = new CreateProductDto();
      dto.name = 'Coca-Cola';
      dto.description = 'Refrigerante';
      dto.price = 5.99;
      dto.image = 'image_url';
      dto.category = 1;

      const result = gateway.convertDtoToEntity(dto);

      expect(result).toEqual(
        new Product(null, 'Coca-Cola', 'Refrigerante', 5.99, 'image_url', 1),
      );
    });
  });
});
