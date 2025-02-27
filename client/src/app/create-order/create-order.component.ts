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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  orderNumberError = false;
  successMessage = '';
  constructor(private orderService: OrderService) {}

  async onSubmit(form: any) {
    if (form.valid) {
      this.orderNumberError = false; // Reset error before submitting

      try {
        const createdOrder = await firstValueFrom(
          this.orderService.createOrder(form.value)
        );
        this.successMessage = 'Order successfully created!';
        form.reset();

        setTimeout(() => {
          this.successMessage = ''; // Hide after 3 seconds
        }, 5000);
      } catch (error: unknown) {
        console.error('Error creating order:', error);

        // Type check before accessing properties
        if (error instanceof HttpErrorResponse) {
          if (error?.error?.field === 'orderNumber') {
            this.orderNumberError = true; // Show error message for orderNumber
          }
        } else {
          // Handle other kinds of errors (e.g., network error)
          console.error('Unexpected error:', error);
        }
      }
    } else {
      console.error('Form is invalid!');
    }
  }
}
