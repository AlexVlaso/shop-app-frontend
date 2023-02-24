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
    this.selectedProducts = this.cartService.selectedProducts;
  }
  info() {
    console.log(this.selectedProducts);
  }
}
