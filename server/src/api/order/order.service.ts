import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(order: Order): Promise<Order> {
    order.uniqueId = await this.generateUniqueId();
    return this.orderRepository.save(order);
  }

  async generateUniqueId(): Promise<string> {
    const generateId = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTWXYZ123456789'; // without confusing character
      return Array.from(
        { length: 8 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join('');
    };

    const uniqueId: string = generateId();
    const exists = await this.findOne(uniqueId);

    if (exists) return this.generateUniqueId();
    return uniqueId;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(uniqueId: string): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { uniqueId } });
  }
}
