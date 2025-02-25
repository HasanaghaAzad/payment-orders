import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  orderNumberError = false;

  constructor() {}

  async onSubmit(form: any) {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      });

      if (!response.ok) {
        throw new Error('Order number must be unique.');
      }

      form.reset();
      this.orderNumberError = false;
    } catch (error) {
      this.orderNumberError = true;
    }
  }
}
