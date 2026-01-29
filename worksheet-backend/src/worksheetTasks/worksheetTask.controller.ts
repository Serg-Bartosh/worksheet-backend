import { Body, Controller, Get, Param, Headers, Post, BadRequestException, UnauthorizedException, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';
import { SessionGuard } from '../common/guards/sessionGuard';

@Controller('worksheet-tasks')
export class WorksheetTaskController {
  constructor(private readonly worksheetService: WorksheetTaskService) { }

  @Get('/tasks')
  async getTasks() {
    const tasks = await this.worksheetService.findAllTasks();
    return tasks;
  }

  @Post('answer/:task_id')
  @UseGuards(SessionGuard)
  async saveAnswer(
    @Param('task_id', ParseIntPipe) taskId: number,
    @Body('option_id', ParseIntPipe) optionId: number,
    @Req() req: any
  ) {

    // Валидация логики (DTO-style) остается здесь
    if (taskId <= 0 || optionId <= 0) {
      throw new BadRequestException('IDs must be positive integers');
    }

    const token = req.session.token;

    return await this.worksheetService.checkAndSaveAnswer(taskId, optionId, token);
  }
}