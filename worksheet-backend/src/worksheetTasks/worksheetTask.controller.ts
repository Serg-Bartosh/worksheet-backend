import { Controller, Get } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';

@Controller('worksheet-tasks')
export class WorksheetTaskController {
  constructor(private readonly worksheetService: WorksheetTaskService) { }

  @Get('tasks')
  async getTasks() {
    const tasks = await this.worksheetService.findAllTasks();
    return tasks;
  }
}