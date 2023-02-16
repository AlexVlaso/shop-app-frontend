import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private basicUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) {}
  getAllProducts() {
    return this.httpClient.get<ProductList>(this.basicUrl);
  }
}
interface ProductList {
  _embedded: {
    products: Product[];
  };
}
