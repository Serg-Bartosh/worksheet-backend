import { Injectable } from '@nestjs/common';

@Injectable()
export class WorksheetTaskService {
  getHello(): string {
    return 'Hello World!';
  }
}
