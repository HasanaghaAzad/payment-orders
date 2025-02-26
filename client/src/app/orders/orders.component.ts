import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Order, OrderService } from '../services/order.service';



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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders({ country: 'Estonia' }).subscribe((data) => {
      this.orders = data;
      this.filteredOrders = data;
    });
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
