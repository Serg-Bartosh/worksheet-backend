import { Body, Controller, Get, Param, Headers, Post, BadRequestException, UnauthorizedException, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';
import { SessionGuard } from '../common/guards/sessionGuard';
import { OptionDto } from './dto/optionIdDto';

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
    @Body() optionDto: OptionDto,
    @Req() req: any
  ) {
    const session_id = req.session.id;
    console.log('Session from request:', session_id);
    console.log('Task ID:', taskId, 'Option ID:', optionDto.option_id);
    return await this.worksheetService.checkAndSaveAnswer(taskId, optionDto.option_id, session_id);
  }
}