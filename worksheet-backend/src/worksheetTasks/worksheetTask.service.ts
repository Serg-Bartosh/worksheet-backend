import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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


  async checkAndSaveAnswer(taskId: number, optionId: number, sessionToken: string) {
    const session = await this.sessionModel.findOne({ where: { token: sessionToken } });
    if (!session) {
      throw new UnauthorizedException('Invalid session token');
    }

    const option = await this.optionModel.findOne({
      where: { id: optionId, taskId: taskId }
    });

    if (!option) {
      throw new NotFoundException('Option not found for this task');
    }

    await this.answerModel.upsert({
      sessionId: session.id,
      taskId: taskId,
      optionId: optionId
    });

    return {
      success: option.isCorrect,
      message: option.isCorrect ? 'Correct!' : 'Wrong, try again.'
    };
  }
}
