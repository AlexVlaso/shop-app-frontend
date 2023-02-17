import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.getListOfProduct();
    });
  }
  getListOfProduct() {
    const isCategoryMode: boolean =
      this.router.snapshot.paramMap.has('category');
    if (isCategoryMode) {
      const category = this.router.snapshot.paramMap.get('category')!;
      this.getProductByCategory(category);
    } else {
      this.getAllProducts();
    }
  }
  getProductByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe((data) => {
      this.productList = data._embedded.products;
    });
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data._embedded.products;
    });
  }
}
