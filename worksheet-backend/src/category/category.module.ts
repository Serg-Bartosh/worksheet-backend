
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryService } from './catefory.service';
import { CategoryController } from './category.controller';
import { CategoryModel } from './category.model';
import { SessionsModule } from '../sessions/session.module';

@Module({
  imports: [
    SequelizeModule.forFeature([CategoryModel]),
    SessionsModule,
  ],
  providers: [CategoryService,],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class UserModule { }