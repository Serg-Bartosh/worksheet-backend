import { Test, TestingModule } from '@nestjs/testing';
import { WorksheetTaskController } from './worksheetTasks/worksheetTask.controller';
import { WorksheetTaskService } from './worksheetTasks/worksheetTask.service';

describe('AppController', () => {
  let appController: WorksheetTaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorksheetTaskController],
      providers: [WorksheetTaskService],
    }).compile();

    appController = app.get<WorksheetTaskController>(WorksheetTaskController);
  });

});
