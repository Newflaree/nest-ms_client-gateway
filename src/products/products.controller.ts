import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import {
  ClientProxy,
  RpcException
} from '@nestjs/microservices';
import { firstValueFrom, catchError } from 'rxjs';
import { PRODUCT_SERVICE } from '../config';
import { PaginationDto } from '../common';
import {
  CreateProductDto,
  UpdateProductDto
} from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct( @Body() createProductDto: CreateProductDto ) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto)
      .pipe(
        catchError( err => { throw new RpcException( err ) } )
      );
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
    @Param( 'id', ParseIntPipe ) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsClient.send({ cmd: 'update_product' }, {
      id,
      ...updateProductDto
    }).pipe(
      catchError( err => { throw new RpcException( err ) } )
    );
  }

  @Delete(':id')
  deleteProductById( @Param( 'id' ) id: string ) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id })
      .pipe(
        catchError( err => { throw new RpcException( err ) } )
      );
  }
}
