import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Cart, CartItem, Product } from 'src/cart/models';

dotenv.config();

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    synchronize: true,
    database: process.env.DB,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    entities: [Cart, CartItem, Product],
    port: parseInt(process.env.DB_PORT, 10) || 5432
};