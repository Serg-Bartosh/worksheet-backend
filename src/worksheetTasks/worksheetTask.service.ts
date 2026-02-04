import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { AnswerModel } from '../answers/answers.model';

@Injectable()
export class WorksheetTaskService {
  constructor(
    @InjectModel(WorksheetTaskModel) private taskModel: typeof WorksheetTaskModel,
    @InjectModel(TaskOptionModel) private optionModel: typeof TaskOptionModel,
    @InjectModel(AnswerModel) private answerModel: typeof AnswerModel,
  ) { }

  async findAllTasks() {
    return this.taskModel.findAll({
      include: [{
        model: TaskOptionModel.scope('withoutAnswer'),
      }],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async checkAndSaveAnswer(taskId: number, optionId: number, sessionId: number) {
    const option = await this.optionModel.findOne({
      where: { id: optionId, taskId: taskId }
    });

    if (!option) {
      throw new BadRequestException('Invalid task or option ID');
    }

    await this.answerModel.upsert({
      sessionId: sessionId,
      taskId: taskId,
      optionId: optionId
    });

    return {
      isCorrect: option.isCorrect,
      result: option.isCorrect ? 'good' : 'wrong',
      message: option.isCorrect ? 'Correct answer!' : 'Wrong answer, try again.'
    };
  }
}
