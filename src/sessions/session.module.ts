
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SessionModel } from './session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SessionModel])
  ],
  providers: [SessionService],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionsModule { }