import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-selected-products',
  templateUrl: './selected-products.component.html',
  styleUrls: ['./selected-products.component.css'],
})
export class SelectedProductsComponent implements OnInit {
  selectedProducts: CartItem[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.selectedProducts = this.cartService.selectedList;
  }
  onRemove(cartItem: CartItem) {
    this.cartService.remove(cartItem, this.selectedProducts);
  }
  onInrementQuantity(cartItem: CartItem) {
    this.cartService.addProductToSelected(cartItem);
  }
  onDecrementQuantity(cartItem: CartItem) {
    this.cartService.removeProductFromSelected(cartItem);
  }
  onAddToCart(cartItem: CartItem) {
    this.cartService.addProductToCart(cartItem);
    this.cartService.remove(cartItem, this.selectedProducts);
  }
}
