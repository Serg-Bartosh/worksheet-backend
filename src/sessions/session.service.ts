import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { SessionModel } from './session.model';

@Injectable()
export class SessionService {
  private readonly algorithm = 'aes-256-cbc';

  constructor(
    @InjectModel(SessionModel)
    private sessionModel: typeof SessionModel,
    private configService: ConfigService,
  ) { }

  async createSession(userId: number) {
    const rawToken = uuidv4();
    const hashToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const session = await this.sessionModel.create({
      token: hashToken,
      userId: userId,
      expiresAt: expiresAt
    });

    return { token: rawToken };
  }

  async validateAndGetSession(rawToken: string): Promise<SessionModel | null> {
    try {
      const hashToken = crypto.createHash('sha256').update(rawToken).digest('hex');

      const session = await this.sessionModel.findOne({
        where: { token: hashToken },
      });

      if (!session || new Date() > session.expiresAt) {
        if (session) await session.destroy();
        return null;
      }

      return session;
    } catch (e) {
      return null;
    }
  }
}