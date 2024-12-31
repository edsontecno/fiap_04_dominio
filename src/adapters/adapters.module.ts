import { Module } from '@nestjs/common';
import { CategoryModule } from '../drivers/category/category.module';
import { ProductModule } from '../drivers/product/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
})
export class AdaptersModule {}
