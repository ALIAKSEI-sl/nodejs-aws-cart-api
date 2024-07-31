import { Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
 } from 'typeorm';

export enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS'
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column('decimal', {precision: 10, scale: 2})
  price: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[]
}

@Entity({ name: 'cart_item' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  cart_id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column('int')
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  user_id: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN
  })
  status: CartStatuses;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
