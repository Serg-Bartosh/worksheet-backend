import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksheetTaskService } from './worksheetTask.service';
import { WorksheetTaskController } from './worksheetTask.controller';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { AnswerModel } from '../answers/answers.model';
import { SessionModel } from '../sessions/session.model';
import { SessionGuard } from '../common/guards/sessionGuard';
import { SessionsModule } from '../sessions/session.module';

@Module({
  imports: [
    SequelizeModule.forFeature([WorksheetTaskModel, TaskOptionModel, AnswerModel, SessionModel]), SessionsModule
  ],
  providers: [WorksheetTaskService, SessionGuard],
  controllers: [WorksheetTaskController],
})
export class WorksheetTaskModule { }