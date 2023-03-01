import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartTotal = 0;
  selectedTotal = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cartTotalQuantity.subscribe(
      (data) => (this.cartTotal = data)
    );
    this.cartService.selectedTotalQuantity.subscribe(
      (data) => (this.selectedTotal = data)
    );
  }
}
