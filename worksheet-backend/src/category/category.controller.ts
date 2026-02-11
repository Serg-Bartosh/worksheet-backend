import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/createCategoryDto";
import { CategoryService } from "./catefory.service";

@Controller('admin')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('/categories')
  async all_category() {
    return this.categoryService.all_categories();
  }

  //TODO: Додав у коментарі, тому що гітхаб не дозволяє пушити код з помилками.
  // async category_create(@Body() dto: CreateCategoryDto) {
  //   return await this.categoryService.create_category(dto);
  // }

  @Put('/:categoryId')
  async category_updateById(@Body() dto: CreateCategoryDto, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.update_category(categoryId, dto);
  }

  @Delete('/delete/:categoryId')
  async delete_categoryById(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.delete_category(categoryId);
  }

  // @Pa('/login')
  // async category_create(@Body() dto: CreateCategoryDto) {
  //   return await this.categoryService.login(dto);
  // }
  @Post('/categori_create')
  async category_create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create_category(dto);
  }

  @Post('/:categoryId')
  async category_update(@Body() dto: CreateCategoryDto, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.update_category(categoryId, dto);
  }

  @Post('/login')
  async category_create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.login(dto);
  }

  @Post('/login')
  async category_create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.login(dto);
  }
}