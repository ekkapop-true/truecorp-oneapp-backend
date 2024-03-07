import { Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CategoryService, ICategoryHeaders } from './category.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Post('mddCategory')
  @HttpCode(HttpStatus.OK)
  mddCategory(@Query() params: ICategoryHeaders) {
    return this.categoryService.mddCategory({ useMock: false, params });
  }
}
