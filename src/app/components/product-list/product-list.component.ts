import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getListOfProduct();
  }
  getListOfProduct() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data._embedded.products;
      console.log(this.productList);
    });
  }
}
