import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
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
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
    console.log(this.product);
  }
}
