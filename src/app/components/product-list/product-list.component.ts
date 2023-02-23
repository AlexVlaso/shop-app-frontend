import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  size = 9;
  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  currentCategory = '';
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.getListOfProduct();
    });
  }
  getListOfProduct() {
    const keyword = this.router.snapshot.paramMap.get('keyword');
    if (keyword) {
      this.getProductByKeyword(keyword);
    } else {
      this.getProductByCategory();
    }
    window.scrollTo(0, 0);
  }
  getProductByKeyword(keyword: string) {
    this.productService
      .getProductsByKeyword(keyword, this.size, this.currentPage - 1)
      .subscribe(this.processData());
  }
  getProductByCategory() {
    const isCategoryMode: boolean =
      this.router.snapshot.paramMap.has('category');
    if (isCategoryMode) {
      const category = this.router.snapshot.paramMap.get('category')!;
      if (this.currentCategory !== category) {
        this.currentCategory = category;
        this.currentPage = 1;
      }
      this.productService
        .getProductsByCategory(category, this.size, this.currentPage - 1)
        .subscribe(this.processData());
    } else {
      this.getAllProducts();
    }
  }
  getAllProducts() {
    this.productService
      .getAllProducts(this.size, this.currentPage - 1)
      .subscribe(this.processData());
  }
  processData() {
    return (data: any) => {
      this.productList = data._embedded.products;
      this.size = data.page.size;
      this.currentPage = data.page.number + 1;
      this.totalPages = data.page.totalPages;
      this.totalElements = data.page.totalElements;
    };
  }
  addProductToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addProductToCart(cartItem);
  }
}
