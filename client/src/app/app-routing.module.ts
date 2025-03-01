import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },  // Empty path is default route
  { path: 'create-order', component: CreateOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ensure forRoot is used
  exports: [RouterModule]
})
export class AppRoutingModule {}
