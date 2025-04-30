import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Param,
  Post
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from '../config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findProducts() {
    return this.productsClient.send({ cmd: 'find_all' }, {});
  }

  @Get(':id')
  findOne( @Param( 'id' ) id: string ) {
    return 'Get product with id ' + id;
  }

  @Patch(':id')
  updateProductById(
    @Param( 'id' ) id: string,
    @Body() body: any
  ) {
    return 'Update product with id ' + id;
  }

  @Delete(':id')
  deleteProductById( @Param( 'id' ) id: string ) {
    return 'Delete product with id ' + id;
  }
}
