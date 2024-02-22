import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Post('mddCategory')
  @HttpCode(HttpStatus.OK)
  mddCategory() {
    return this.categoryService.mddCategory();
  }
}
