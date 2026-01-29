import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksheetTaskService } from './worksheetTask.service';
import { WorksheetTaskController } from './worksheetTask.controller';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { AnswerModel } from '../answers/answers.model';
import { SessionModel } from '../sessions/session.model';
import { SessionGuard } from '../common/guards/sessionGuard';

@Module({
  imports: [
    SequelizeModule.forFeature([WorksheetTaskModel, TaskOptionModel, AnswerModel, SessionModel])
  ],
  providers: [WorksheetTaskService, SessionGuard],
  controllers: [WorksheetTaskController],
})
export class WorksheetTaskModule { }