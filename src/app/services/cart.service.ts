import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  selectedProducts: CartItem[] = [];
  totalPrice = new BehaviorSubject<number>(0);
  totalQuantity = new BehaviorSubject<number>(0);
  constructor() {}

  addProductToCart(cartItem: CartItem) {
    this.addProductToList(cartItem, this.cart);
  }
  addProductToSelected(cartItem: CartItem) {
    this.addProductToList(cartItem, this.selectedProducts);
  }
  private addProductToList(curCartItem: CartItem, list: CartItem[]) {
    const existingCartItem = list.find(
      (tempCartItem) => tempCartItem.product.id === curCartItem.product.id
    );
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      list.push(curCartItem);
    }
    this.computeTotals();
  }
  removeProductFromCart(cartItem: CartItem) {
    this.removeProductFromList(cartItem, this.cart);
  }
  removeProductFromSelected(cartItem: CartItem) {
    this.removeProductFromList(cartItem, this.selectedProducts);
  }
  private removeProductFromList(cartItem: CartItem, list: CartItem[]) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem, list);
    }
  }
  remove(cartItem: CartItem, list: CartItem[]) {
    const index = list.indexOf(cartItem);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this.computeTotals();
  }
  computeTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (let cartItem of this.cart) {
      totalPriceValue += cartItem.product.price! * cartItem.quantity;
      totalQuantityValue += cartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
