import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];
  selectedProduct: Product[] = [];
  constructor() {}
}
