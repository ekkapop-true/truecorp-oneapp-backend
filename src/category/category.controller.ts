import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  CategoryService,
  ICategoryHeaders,
  ICategoryParams,
} from './category.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Post('mddCategory')
  @HttpCode(HttpStatus.OK)
  mddCategory(
    @Query() params: ICategoryParams,
    @Headers() headers: ICategoryHeaders,
  ) {
    return this.categoryService.mddCategory({
      useMock: false,
      params,
      headersRequestApi: headers,
    });
  }
}
