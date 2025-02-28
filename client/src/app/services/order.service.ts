import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderFormValues } from '../create-order/create-order.component';

export type Order = CreateOrderFormValues & {
  uniqueId: string;
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';
  constructor(private http: HttpClient) {}

  getOrders(params?: { [key: string]: any }): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { params });
  }
  getOrderById(uniqueId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${uniqueId}`);
  }
  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
