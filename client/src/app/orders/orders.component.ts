import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Order {
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

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  countryFilter = '';
  descriptionFilter = '';

  constructor() {}

  async ngOnInit() {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data: Order[] = await response.json();
      this.orders = data;
      this.filteredOrders = data;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter((order) => {
      return (
        (!this.countryFilter || order.country.includes(this.countryFilter)) &&
        (!this.descriptionFilter ||
          order.paymentDescription.includes(this.descriptionFilter))
      );
    });
  }
}
