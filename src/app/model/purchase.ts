import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './orderItem';

export class Purchase {
  constructor(
    public address: Address,
    public customer: Customer,
    public order: Order,
    public orderItems: OrderItem[]
  ) {}
}
