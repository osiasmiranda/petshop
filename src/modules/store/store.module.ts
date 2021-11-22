import { OrderService } from './services/order.service';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Product } from 'src/modules/store/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, OrderService],
  controllers: [ProductController]
})
export class StoreModule {}
