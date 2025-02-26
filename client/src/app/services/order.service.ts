import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderNumber: string;
  paymentDescription: string;
  streetAddress: string;
  town: string;
  country: string;
  amount: number;
  currency: string;
  paymentDueDate: string;
  uniqueId: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';
  constructor(private http: HttpClient) {}
  getOrders(params?: { [key: string]: any }): Observable<Order[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<Order[]>(this.apiUrl, { params: httpParams });
  }
  getOrderById(uniqueId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${uniqueId}`);
  }
  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
