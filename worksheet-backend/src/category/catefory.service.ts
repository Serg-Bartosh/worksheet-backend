import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { SessionService } from '../sessions/session.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private categoryModel: typeof CategoryModel,
  ) { }

  async all_categories() {
    const tasks = await this.categoryModel.findAll();
    return tasks;
  }

  // async create_category(dto: CreateCategoryDto) {
  //   try {
  //     const category = await this.categoryModel.create({
  //       name: dto.name,
  //       color: dto.color,
  //     });
  //     return category;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new BadRequestException('Error creating category: ' + error.message);
  //     }
  //   }
  // }
  async create_category(dto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create({
        name: dto.name,
        color: dto.color,
      });
      return category;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException('Error creating category: ' + error.message);
      }
    }
  }

  async update_category(categoryId: number, dto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.findByPk(categoryId);
      if (!category) {
        throw new BadRequestException('Category not found');
      }
      category.name = dto.name;
      category.color = dto.color;
      await category.save();
      return category;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException('Error updating category: ' + error.message);
      }
    }
  }

  async delete_category(categoryId: number) {
    try {
      const category = await this.categoryModel.findByPk(categoryId);
      if (!category) {
        throw new BadRequestException('Category not found');
      }
      await category.destroy();
      return { message: 'Category deleted successfully' };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException('Error deleting category: ' + error.message);
      }
    }
  }
}