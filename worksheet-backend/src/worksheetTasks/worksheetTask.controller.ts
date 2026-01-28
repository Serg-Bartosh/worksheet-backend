import { Body, Controller, Get, Param, Headers, Post, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';

@Controller('worksheet-tasks')
export class WorksheetTaskController {
  constructor(private readonly worksheetService: WorksheetTaskService) { }

  @Get('/tasks')
  async getTasks() {
    const tasks = await this.worksheetService.findAllTasks();
    return tasks;
  }

  @Post('answer/:task_id')
  async saveAnswer(
    @Param('task_id') taskId: number,
    @Body('option_id') optionId: number,
    @Headers('authorization') authHeader: string
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Please provide a Bearer token in Authorization header');
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token is empty');
    }

    return await this.worksheetService.checkAndSaveAnswer(taskId, optionId, token);
  }
}