import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, withFetch } from '@angular/common/http';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  orderNumberError = false;

  // constructor(private http: HttpClient) {}

  async onSubmit(form: any) {
    // try {
    //   const response = await firstValueFrom(this.http.post('/api/orders', form.value));
    //   if (!response) {
    //     throw new Error('Order number must be unique.');
    //   }
    //   form.reset();
    //   this.orderNumberError = false;
    // } catch (error) {
    //   this.orderNumberError = true;
    // }
  }
}
