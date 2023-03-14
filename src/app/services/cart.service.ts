import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  selectedList: CartItem[] = [];
  storage: Storage = sessionStorage;
  cartTotalPrice = new BehaviorSubject<number>(0);
  cartTotalQuantity = new BehaviorSubject<number>(0);
  selectedTotalQuantity = new BehaviorSubject<number>(0);
  selectedTotalPrice = new BehaviorSubject<number>(0);
  constructor() {
    this.handleDataFromStorage();
  }

  addProductToCart(cartItem: CartItem) {
    this.addProductToList(cartItem, this.cart);
  }
  addProductToSelected(cartItem: CartItem) {
    this.addProductToList(cartItem, this.selectedList);
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
    this.computeTotals(list);
  }
  removeProductFromCart(cartItem: CartItem) {
    this.removeProductFromList(cartItem, this.cart);
  }
  removeProductFromSelected(cartItem: CartItem) {
    this.removeProductFromList(cartItem, this.selectedList);
  }
  private removeProductFromList(cartItem: CartItem, list: CartItem[]) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem, list);
    }
    this.computeTotals(list);
  }
  remove(cartItem: CartItem, list: CartItem[]) {
    const index = list.indexOf(cartItem);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this.computeTotals(list);
  }
  computeTotals(list: CartItem[]) {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (let cartItem of list) {
      totalPriceValue += cartItem.product.price! * cartItem.quantity;
      totalQuantityValue += cartItem.quantity;
    }
    if (list === this.cart) {
      this.cartTotalPrice.next(totalPriceValue);
      this.cartTotalQuantity.next(totalQuantityValue);
      this.persistCartData();
    }
    if (list === this.selectedList) {
      this.selectedTotalQuantity.next(totalQuantityValue);
      this.selectedTotalPrice.next(totalPriceValue);
      this.persistSelectedListData();
    }
  }
  persistCartData() {
    this.storage.setItem('cartItems', JSON.stringify(this.cart));
  }
  persistSelectedListData() {
    this.storage.setItem('selectedList', JSON.stringify(this.selectedList));
  }
  handleDataFromStorage() {
    const cartData = this.storage.getItem('cartItems');
    const selectedlistData = this.storage.getItem('selectedList');
    if (cartData) {
      this.cart = JSON.parse(cartData);
      this.computeTotals(this.cart);
    }
    if (selectedlistData) {
      this.selectedList = JSON.parse(selectedlistData);
      this.computeTotals(this.selectedList);
    }
  }
}
