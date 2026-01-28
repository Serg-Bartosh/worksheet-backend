import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksheetTaskService } from './worksheetTask.service';
import { WorksheetTaskController } from './worksheetTask.controller';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';

@Module({
  imports: [
    SequelizeModule.forFeature([WorksheetTaskModel, TaskOptionModel])
  ],
  providers: [WorksheetTaskService],
  controllers: [WorksheetTaskController],
})
export class WorksheetTaskModule { }