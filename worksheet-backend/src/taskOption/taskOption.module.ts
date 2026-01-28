import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskOptionModel } from './taskOption.model';

@Module({

  imports: [SequelizeModule.forFeature([TaskOptionModel])],
  controllers: [],
  providers: [],
  exports: [SequelizeModule],
})

export class TaskOptionModule { }