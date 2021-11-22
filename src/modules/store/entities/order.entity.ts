import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  number: string;

  @Column('datetime')
  date: Date;

  @Column({ length: 11 })
  customer: string;

  @OneToMany(() => OrderItem, (oi) => oi.order)
  items: OrderItem[];
}
