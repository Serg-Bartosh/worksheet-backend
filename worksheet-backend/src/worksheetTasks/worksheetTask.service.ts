import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { AnswerModel } from '../answers/answers.model';
import { SessionModel } from '../sessions/session.model';

@Injectable()
export class WorksheetTaskService {
  constructor(
    @InjectModel(WorksheetTaskModel) private taskModel: typeof WorksheetTaskModel,
    @InjectModel(TaskOptionModel) private optionModel: typeof TaskOptionModel,
    @InjectModel(AnswerModel) private answerModel: typeof AnswerModel,
    @InjectModel(SessionModel) private sessionModel: typeof SessionModel,
  ) { }

  async findAllTasks() {
    return this.taskModel.findAll({
      include: [TaskOptionModel],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async checkAndSaveAnswer(taskId: number, optionId: number, token: string) {
    const session = await this.sessionModel.findOne({ where: { token } });

    if (!session) {
      throw new UnauthorizedException('Session not found or expired');
    }

    if (taskId <= 0 || optionId <= 0) {
      throw new BadRequestException('IDs must be positive integers');
    }

    const option = await this.optionModel.findOne({
      where: { id: optionId, taskId: taskId }
    });

    if (!option) {
      throw new BadRequestException('Invalid task or option ID');
    }

    await this.answerModel.upsert({
      sessionId: session.id,
      taskId: taskId,
      optionId: optionId
    });

    return {
      success: option.getDataValue('isCorrect'),
      message: option.getDataValue('isCorrect') ? 'Correct answer!' : 'Wrong answer, try again.'
    };
  }
}
