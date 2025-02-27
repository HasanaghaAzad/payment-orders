import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, withFetch } from '@angular/common/http';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  orderNumberError = false;
  successMessage = '';
  constructor(
    private orderService: OrderService
  ) {}

  async onSubmit(form: any) {
    if (form.valid) {
      console.log('onSubmit', form.value);
      try {
        // Use firstValueFrom to convert observable to a promise
        const createdOrder = await firstValueFrom(
          this.orderService.createOrder(form.value)
        );
        this.successMessage = 'Order successfully created!';
        form.reset();

        setTimeout(() => {
          this.successMessage = ''; // Hide after 3 seconds
        }, 5000);
      } catch (error) {
        console.error('Error creating order:', error);
        // Handle error (e.g., show an error message to the user)
      }
    } else {
      console.error('Form is invalid!');
    }
  }
}
