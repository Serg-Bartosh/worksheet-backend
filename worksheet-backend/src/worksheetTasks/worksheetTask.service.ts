import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';

@Injectable()
export class WorksheetTaskService {
  constructor(
    @InjectModel(WorksheetTaskModel)
    private taskModel: typeof WorksheetTaskModel,
  ) { }

  async findAllTasks() {
    return this.taskModel.findAll({
      include: [TaskOptionModel],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }
}
