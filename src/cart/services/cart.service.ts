import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Cart, CartItem, CartStatuses, Product } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cart_repository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly product_repository: Repository<Product>,
    @InjectRepository(CartItem)
    private readonly cartItem_repository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cart_repository.findOne({ where: { user_id: userId }, relations: ['item', 'item.product'] });
  }
  async createByUserId(userId: string): Promise<Cart> {
    const cart = new Cart();

    cart.id =  v4();
    cart.items = [];
    cart.user_id = userId;
    cart.created_at = new Date();
    cart.updated_at = new Date();
    cart.status = CartStatuses.OPEN;

    return this.cart_repository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const cart = await this.findByUserId(userId);

    if (!cart) return await this.createByUserId(userId);

    return cart;
  }

  async updateByUserId(userId: string): Promise<Cart> {
    const cart = await this.findByUserId(userId);

    if ( cart ) {
      for (const cartItem of cart.items) {
        const item = new CartItem();
        const product = await this.product_repository.findOne({ where: { id: cartItem.product_id }});


        item.cart_id = cart.id;
        item.product = product;
        item.count = cartItem.count;

        await this.cartItem_repository.save(item);
      }
    }
  
    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);

    if (cart) {
      await this.cartItem_repository.remove(cart.items);
      await this.cart_repository.remove(cart);
    }
  }
}
