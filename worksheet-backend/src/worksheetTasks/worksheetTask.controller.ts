import { Controller, Get } from '@nestjs/common';
import { WorksheetTaskService } from './worksheetTask.service';

@Controller()
export class WorksheetTaskController {
  constructor(private readonly appService: WorksheetTaskService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
