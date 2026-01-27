import { Module } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';
import { WorksheetTaskController } from './worksheetTask.controller';
import { WorksheetTaskModel } from './worksheetTask.model';

@Module({
  imports: [WorksheetTaskModel],
  controllers: [WorksheetTaskController],
  providers: [WorksheetTaskService,],
})
export class WorksheetTaskModule { }
