import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { OrderService } from '../services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

type CreateOrderFormValues = {
  orderNumber: string;
  paymentDescription: string;
  streetAddress: string;
  town: string;
  country: string;
  amount: number;
  currency: string;
  paymentDueDate: string;
};

type CreateOrderForm = NgForm & { value: CreateOrderFormValues };

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  orderNumberError = false;
  successMessage: string | null = null;
  constructor(private orderService: OrderService) {}

  async onSubmit(form: CreateOrderForm) {
    if (form.valid) {
      this.orderNumberError = false; // Reset error before submitting

      try {
        await firstValueFrom(this.orderService.createOrder(form.value));
        this.successMessage = 'Order successfully created!';
        form.reset();

      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse) {
          if (error?.error?.field === 'orderNumber') {
            this.orderNumberError = true; // Show error message for orderNumber
          }
        }
      }
    }
  }
  closeSuccessMessage() {
    this.successMessage = null;
  }
}
