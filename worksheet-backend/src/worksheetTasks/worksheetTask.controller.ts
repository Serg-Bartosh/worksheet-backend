import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';

@Controller('worksheet-tasks')
export class WorksheetTaskController {
  constructor(private readonly worksheetService: WorksheetTaskService) { }

  @Get('/tasks')
  async getTasks() {
    const tasks = await this.worksheetService.findAllTasks();
    return tasks;
  }

  @Post('/task/unswer/:task_id')
  async getTasksUnswer(@Param('task_id') task_id: number,
    @Body('answer_id') answer_id: number) {
    const tasks = await this.worksheetService.checkAndSaveAnswer(task_id, answer_id);
    return tasks;
  }
}