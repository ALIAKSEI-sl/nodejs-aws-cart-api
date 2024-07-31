import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { config } from 'typeOrm.config';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { Cart, CartItem } from './cart';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({ isGlobal:true }),
    TypeOrmModule.forFeature([Cart, CartItem]),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
