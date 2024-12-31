import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Category } from '../../../application/category/entites/Category';
import { BusinessRuleException } from '../../../system/filtros/business-rule-exception';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from './Category.entity';
import { CategoryGateway } from './CategoryGateway';

describe('CategoryGateway', () => {
  let gateway: CategoryGateway;
  let repositoryMock: Partial<Repository<CategoryEntity>>;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryGateway,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    gateway = module.get<CategoryGateway>(CategoryGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('save', () => {
    it('should save a category and return it', async () => {
      const category: Category = new Category(
        null,
        'Bebidas',
        'Categoria de bebidas',
        null,
      );
      const categoryEntity = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      (repositoryMock.save as jest.Mock).mockResolvedValue(categoryEntity);

      const result = await gateway.save(category);

      expect(repositoryMock.save).toHaveBeenCalledWith(
        expect.any(CategoryEntity),
      );
      expect(result).toEqual(
        new Category(
          categoryEntity.id,
          categoryEntity.name,
          categoryEntity.description,
          [],
        ),
      );
    });
  });

  describe('get', () => {
    it('should return a category by ID if it exists', async () => {
      const categoryEntity = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [],
      };

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(categoryEntity);

      const result = await gateway.get(1);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['products'],
      });
      expect(result).toEqual(
        new Category(
          categoryEntity.id,
          categoryEntity.name,
          categoryEntity.description,
          [],
        ),
      );
    });

    it('should throw an exception if category is not found', async () => {
      (repositoryMock.findOne as jest.Mock).mockResolvedValue(null);

      await expect(gateway.get(1)).rejects.toThrow(
        new BusinessRuleException('Categoria não localizada'),
      );
    });
  });

  describe('getSigle', () => {
    it('should return a single category by ID', async () => {
      const categoryEntity = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      jest
        .spyOn(gateway, 'getCategoryEntity' as any)
        .mockResolvedValue(categoryEntity);

      const result = await gateway.getSigle(1);

      expect(result).toEqual(
        new Category(
          categoryEntity.id,
          categoryEntity.name,
          categoryEntity.description,
          [],
        ),
      );
    });
  });

  describe('delete', () => {
    it('should delete a category by ID if it exists', async () => {
      const category = new Category(1, 'Bebidas', 'Categoria de bebidas', []);

      jest.spyOn(gateway, 'get').mockResolvedValue(category);
      (repositoryMock.delete as jest.Mock).mockResolvedValue(undefined);

      await gateway.delete(1);

      expect(repositoryMock.delete).toHaveBeenCalledWith(category.id);
    });

    it('should throw an exception if the category does not exist', async () => {
      jest
        .spyOn(gateway, 'get')
        .mockRejectedValue(
          new BusinessRuleException('Categoria não localizada'),
        );

      await expect(gateway.delete(1)).rejects.toThrow(
        new BusinessRuleException('Categoria não localizada'),
      );
    });
  });

  describe('update', () => {
    it('should update a category and return the updated category', async () => {
      const category = new Category(1, 'Bebidas', 'Categoria atualizada', []);
      const categoryEntity = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria atualizada',
      };

      jest
        .spyOn(gateway, 'getCategoryEntity' as any)
        .mockResolvedValue(categoryEntity);
      (repositoryMock.save as jest.Mock).mockResolvedValue(categoryEntity);

      const result = await gateway.update(1, category);

      expect(repositoryMock.save).toHaveBeenCalledWith(categoryEntity);
      expect(result).toEqual(
        new Category(
          categoryEntity.id,
          categoryEntity.name,
          categoryEntity.description,
          [],
        ),
      );
    });

    it('should throw an exception if the category does not exist', async () => {
      jest
        .spyOn(gateway, 'getCategoryEntity' as any)
        .mockRejectedValue(
          new BusinessRuleException('Categoria não localizada'),
        );

      const category = new Category(1, 'Bebidas', 'Categoria atualizada', []);

      await expect(gateway.update(1, category)).rejects.toThrow(
        new BusinessRuleException('Categoria não localizada'),
      );
    });
  });

  describe('convertCreateDtoToEntity', () => {
    it('should convert CreateCategoryDto to Category', () => {
      const dto = { name: 'Bebidas', description: 'Categoria de bebidas' };
      const result = gateway.convertCreateDtoToEntity(dto);

      expect(result).toEqual(
        new Category(null, dto.name, dto.description, null),
      );
    });
  });
});
