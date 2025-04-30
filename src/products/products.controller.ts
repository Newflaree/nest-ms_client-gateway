import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Param,
  Post,
  Query
} from '@nestjs/common';
import {
  ClientProxy,
  RpcException
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from '../config';
import { PaginationDto } from '../common';

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
  findProducts( @Query() paginationDto: PaginationDto ) {
    return this.productsClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  async findOne( @Param( 'id' ) id: string ) {
    /*
     return this.productsClient.send({ cmd: 'find_one' }, { id })
      .pipe(
        catchError( err => { throw new RpcException( err ) })
      )
     * */
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one' }, { id })
      );

      return product;

    } catch ( error ) {
      throw new RpcException( error );
    }
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
