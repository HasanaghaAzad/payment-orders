import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';

export const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'create-order', component: CreateOrderComponent }
];
