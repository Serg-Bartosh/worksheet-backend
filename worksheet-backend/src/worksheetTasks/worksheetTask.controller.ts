import { Body, Controller, Get, Param, Post, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';
import { SessionGuard } from '../common/guards/sessionGuard';
import { OptionDto } from './dto/optionIdDto';

@Controller('worksheet-tasks')
export class WorksheetTaskController {
  constructor(private readonly worksheetService: WorksheetTaskService) { }

  @Get('/tasks')
  @UseGuards(SessionGuard)
  async getTasks() {
    const tasks = await this.worksheetService.findAllTasks();
    return tasks;
  }

  @Post('answer/:task_id')
  @UseGuards(SessionGuard)
  async saveAnswer(
    @Param('task_id', ParseIntPipe) taskId: number,
    @Body() optionDto: OptionDto,
    @Req() req: any
  ) {
    const session_id = req.session.id;
    return await this.worksheetService.checkAndSaveAnswer(taskId, optionDto.option_id, session_id);
  }
}