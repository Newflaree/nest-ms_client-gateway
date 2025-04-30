import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findProducts() {
    return 'Get All Products'
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
