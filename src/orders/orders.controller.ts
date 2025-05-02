import {
  Controller,
  Get,
  Post,
  Inject,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from '../config';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send( 'createOrder', createOrderDto );
  }

  @Get()
  findAll() {
    return this.ordersClient.send( 'findAllOrders', {} );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send( 'findOneOrder', { id } );
  }
}
