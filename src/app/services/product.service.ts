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

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.basicUrl}/${id}`);
  }
  getAllProducts(count: number, page: number): Observable<ProductListResponse> {
    return this.httpClient.get<ProductListResponse>(
      `${this.basicUrl}?size=${count}&page=${page}`
    );
  }
  getProductsByCategory(
    category: string,
    count: number,
    page: number
  ): Observable<ProductListResponse> {
    const searchingUrl = `${this.basicUrl}/search/findByCategoryName?category=${category}&size=${count}&page=${page}`;
    return this.httpClient.get<ProductListResponse>(searchingUrl);
  }
  getProductsByKeyword(
    keyword: string,
    count: number,
    page: number
  ): Observable<ProductListResponse> {
    const searchingUrl = `${this.basicUrl}/search/findByNameContaining?name=${keyword}&size=${count}&page=${page}`;
    return this.httpClient.get<ProductListResponse>(searchingUrl);
  }
}
interface ProductListResponse {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
