import { Body, Controller, Get, Param, Headers, Post, BadRequestException } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';

@Controller('worksheet-tasks')
export class WorksheetTaskController {
  constructor(private readonly worksheetService: WorksheetTaskService) { }

  @Get('/tasks')
  async getTasks() {
    const tasks = await this.worksheetService.findAllTasks();
    return tasks;
  }

  @Post('/task/answer/:task_id')
  async saveAnswer(
    @Param('task_id') taskId: number,
    @Body('option_id') optionId: number,
    @Headers('session-token') sessionToken: string,
  ) {
    if (!sessionToken) {
      throw new BadRequestException('Session token is required');
    }

    return await this.worksheetService.checkAndSaveAnswer(
      taskId,
      optionId,
      sessionToken
    );
  }
}