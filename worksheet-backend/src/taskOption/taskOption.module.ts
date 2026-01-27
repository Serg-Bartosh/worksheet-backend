import { Module } from '@nestjs/common';
import { TaskOptionModel } from './taskOption.model';

@Module({
  imports: [TaskOptionModel],
  controllers: [],
  providers: [],
})

export class TaskOptionModule { }
