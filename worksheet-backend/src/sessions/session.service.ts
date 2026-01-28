import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SessionModel } from './session.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionModel)
    private sessionModel: typeof SessionModel,
  ) { }

  async createSession() {
    const token = uuidv4();
    const session = await this.sessionModel.create({ token });
    return { token: session.token };
  }
}