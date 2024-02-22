import { Injectable } from '@nestjs/common';

import * as mddCategory from './data/mddCategory.json';

@Injectable()
export class CategoryService {
  async mddCategory(): Promise<any> {
    return mddCategory;
  }
}
