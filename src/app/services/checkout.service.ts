import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../model/payment-info';
import { Purchase } from '../model/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  basicUrl = environment.shopApiUrl + '/checkout/purchase';
  paymentUrl = environment.shopApiUrl + '/checkout/payment-intent';
  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.basicUrl, purchase);
  }
  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentUrl, paymentInfo);
  }
}
