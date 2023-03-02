import { CartItem } from './cart-item';

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number;
  constructor(private cartItem: CartItem) {
    this.imageUrl = cartItem.product.imageUrl!;
    this.unitPrice = cartItem.product.price!;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.product.id!;
  }
}
