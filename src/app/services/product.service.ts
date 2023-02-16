import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private basicUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<ProductListResponse> {
    return this.httpClient.get<ProductListResponse>(this.basicUrl);
  }
}
interface ProductListResponse {
  _embedded: {
    products: Product[];
  };
}
