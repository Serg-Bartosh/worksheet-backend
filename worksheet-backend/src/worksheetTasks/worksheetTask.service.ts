import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { AnswerModel } from '../answers/answers.model';

@Injectable()
export class WorksheetTaskService {
  constructor(
    @InjectModel(WorksheetTaskModel) private taskModel: typeof WorksheetTaskModel,
    @InjectModel(TaskOptionModel) private optionModel: typeof TaskOptionModel,
    @InjectModel(AnswerModel) private answerModel: typeof AnswerModel, // Добавь это!
  ) { }

  async findAllTasks() {
    return this.taskModel.findAll({
      include: [TaskOptionModel],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }


  async checkAndSaveAnswer(taskId: number, optionId: number) {
    const option = await this.optionModel.findOne({
      where: {
        id: optionId,
        taskId: taskId
      }
    });

    if (!option) {
      throw new NotFoundException('Option or Task not found');
    }
    return {
      success: option.isCorrect,
      message: option.isCorrect ? 'Correct answer!' : 'Wrong answer, try again.'
    };
  }
}
