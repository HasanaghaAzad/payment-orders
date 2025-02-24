import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() order: Order): Promise<Order> {
    return this.orderService.create(order);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':uniqueId')
  async findOne(@Param('id') uniqueId: string): Promise<Order | null> {
    return this.orderService.findOne(uniqueId);
  }
}