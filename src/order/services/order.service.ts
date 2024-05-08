import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findById(orderId: string): Promise<Order | undefined> {
    return this.orderRepository.findOne({ where: { id: orderId } });
  }

  async create(data: any): Promise<Order[]> {
    const newOrder = this.orderRepository.create({
      ...data,
      status: 'inProgress',
    });
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  async update(orderId: string, data: any): Promise<Order> {
    let order = await this.findById(orderId);
    if (!order) {
      throw new Error('Order does not exist.');
    }

    order = { ...order, ...data };
    await this.orderRepository.save(order);
    return order;
  }
}
