import { CartItem } from '../../cart/models';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  cart_id: string;

  @Column('numeric')
  total: number;

  @Column('text')
  comments: string;

  @Column('jsonb')
  delivery: {
    type: string;
    address: any;
  };

  @Column('jsonb')
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
    default: 'OPEN',
  })
  status: string;

  @ManyToMany(() => CartItem)
  @JoinTable()
  items: CartItem[];
}