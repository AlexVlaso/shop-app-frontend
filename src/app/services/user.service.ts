import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistoryItem } from '../model/order-history-item';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ordersUrl = 'http://localhost:8080/api/orders';
  constructor(private httpClient: HttpClient) {}
  getListOfOrders(email: string) {
    return this.httpClient.get<OrdersResponse>(
      `${this.ordersUrl}/search/findByCustomerEmail?email=${email}`
    );
  }
}

interface OrdersResponse {
  embedded: {
    orders: OrderHistoryItem[];
  };
}
