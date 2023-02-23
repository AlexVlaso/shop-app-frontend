import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  selectedProduct: CartItem[] = [];
  constructor() {}

  addProductToCart(product: Product) {
    this.addProductToList(product, this.cart);
  }
  addProductToSelected(product: Product) {
    this.addProductToList(product, this.selectedProduct);
  }
  private addProductToList(product: Product, list: CartItem[]) {
    const curCartItem = new CartItem(product);
    const existingCartItem = list.find(
      (tempCartItem) => tempCartItem.product.id === curCartItem.product.id
    );
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      list.push(curCartItem);
    }
  }
}
