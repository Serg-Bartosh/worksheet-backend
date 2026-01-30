import { Body, Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/createSessionDto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  //It's looks like Post method, but in pdf u wanted Get
  @Get('/get_token')
  async createSession(@Body() dto: CreateSessionDto) {
    const session = await this.sessionService.createSession(dto.userId);

    return {
      token: session.token,
    };
  }
}