import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionGuard } from '../common/guards/sessionGuard';
import { SessionUser } from '../common/decorators/session-user.decorator';
import { SessionModel } from './session.model';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @UseGuards(SessionGuard)
  @Get('/get_token')
  async createSession(@SessionUser() session: SessionModel) {
    const newSession = await this.sessionService.createSession(session.userId);

    return {
      token: newSession.token,
    };
  }
}