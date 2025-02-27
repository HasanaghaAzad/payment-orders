import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(order: Order): Promise<Order> {
    const existsWithSameOrderNumber = await this.orderRepository.findOne({
      where: { orderNumber: order.orderNumber },
    });

    if (existsWithSameOrderNumber) {
      throw new HttpException(
        { message: 'Order number must be unique.', field: 'orderNumber' },
        HttpStatus.BAD_REQUEST,
      );
    }

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
    const prioritizedCountry = 'Estonia';
    return this.orderRepository
      .createQueryBuilder('order')
      .orderBy(
        // Custom sorting to prioritize the specified country
        'CASE WHEN order.country = :prioritizedCountry THEN 1 ELSE 2 END',
        'ASC', // First, show prioritized country orders
      )
      .addOrderBy('order.paymentDueDate', 'ASC')
      .setParameters({ prioritizedCountry })
      .getMany();
  }

  async findOne(uniqueId: string): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { uniqueId } });
  }
}
