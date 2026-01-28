import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @Get('get_token')
  async generateToken() {
    const session = await this.sessionService.createSession();

    return {
      token: session.token,
    };
  }
}