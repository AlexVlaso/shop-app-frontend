import { Product } from './product';

export class CartItem {
  quantity = 1;
  product: Product;
  constructor(product: Product) {
    this.product = product;
  }
}
