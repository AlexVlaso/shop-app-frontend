import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderHistoryItem } from '../model/order-history-item';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ordersUrl = environment.shopApiUrl + '/orders';
  constructor(private httpClient: HttpClient) {}
  getListOfOrders(email: string) {
    return this.httpClient.get<OrdersResponse>(
      `${this.ordersUrl}/search/findByCustomerEmail?email=${email}`
    );
  }
}

interface OrdersResponse {
  _embedded: {
    orders: OrderHistoryItem[];
  };
}
