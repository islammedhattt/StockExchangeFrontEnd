import { Injectable, inject } from '@angular/core';
import { Stock } from '../../stocks/models/stock.model';
import { BehaviorSubject } from 'rxjs';
import { IOrder, OrderResponse } from './../models/order.model';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { ApiUrls } from './../../../urls'
import { AuthenticationService } from './../../../features/login/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderStock$: BehaviorSubject<Stock | null> =
    new BehaviorSubject<Stock | null>(null);

  httpClient = inject(HttpClient);

  constructor( private authService: AuthenticationService) {}

  setOrderStock(stock: Stock | null) {
    this.orderStock$.next(stock);
  }

  getOrderStock() {
    return this.orderStock$.asObservable();
  }

  order$: BehaviorSubject<IOrder | null> = new BehaviorSubject<IOrder | null>(
    null
  );

  setOrder(order: IOrder | null) {
    this.order$.next(order);
  }

  getOrder() {
    return this.order$.asObservable();
  }

  getAllOrder() {
    const token = this.authService.getToken();
    debugger

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.post<OrderResponse[]>(
        ApiUrls.OrderList,
        {}, { headers: headers }
      );
    }
    else
    {
      return this.httpClient.get<OrderResponse[]>(ApiUrls.OrderList, {});
    }
  }

  createNewOrder(order: IOrder) {
    const token = this.authService.getToken();
    debugger

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return this.httpClient.post<OrderResponse>(
      ApiUrls.CreateOrder,
      order, { headers: headers }
    );
    }
    else
    {
      return this.httpClient.post<OrderResponse>(
        ApiUrls.CreateOrder,
        order
      );
      console.error('User is not logged in.');
    }
  }
}
