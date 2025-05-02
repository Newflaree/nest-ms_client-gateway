import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport
} from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { envs, ORDER_SERVICE } from '../config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMSHost,
          port: envs.ordersMSPort
        }
      }
    ])
  ]
})
export class OrdersModule {}
