import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product = new Product();
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }
  addProductToCart() {
    const cartItem = new CartItem(this.product);
    this.cartService.addProductToCart(cartItem);
  }
  addProductToSelected() {
    const cartItem = new CartItem(this.product);
    this.cartService.addProductToSelected(cartItem);
    console.log(this.cartService.selectedProducts);
  }
}
