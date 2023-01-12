import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(config: ConfigService, private productService: ProductService) {}

  @Get('getProducts')
  findAll() {
    return this.productService.findAll();
  }

  @Get('product/:id')
  async getProductById(@Param('id') productId: string) {
    const getProductById = await this.productService.getProductUserById(
      productId,
    );

    if (!getProductById) {
      return new NotFoundException(`userId ${productId} not found product`);
    }
    return getProductById;
  }

  @Post('add')
  // @Redirect(config.get('ENDPOINT_URL'), 200)
  createBookmark(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }
}
