import { Body, Controller, Get, Param, Headers, Post, BadRequestException, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
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
    @Param('task_id', ParseIntPipe) taskId: number,
    @Body('option_id', ParseIntPipe) optionId: number,
    @Headers('authorization') authHeader: string
  ) {
    //TODO: gurd
    // validate token 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Please provide a Bearer token in Authorization header');
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token is empty');
    }
    // final check and save answer
    //TODO: DTO
    if (taskId <= 0 || optionId <= 0) {
      throw new BadRequestException('IDs must be positive integers');
    }
    // final check and save answer
    return await this.worksheetService.checkAndSaveAnswer(taskId, optionId, token);
  }
}