import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
  onIncrementQuantity(cartItem: CartItem) {
    this.cartService.addProductToCart(cartItem);
  }
  onDecrementQuantity(cartItem: CartItem) {
    this.cartService.removeProductFromCart(cartItem);
  }
  onRemove(cartItem: CartItem) {
    this.cartService.remove(cartItem, this.cart);
    this.cartService.computeTotals();
  }
  onBuyNow() {
    this.router.navigateByUrl('/checkout');
  }
}
