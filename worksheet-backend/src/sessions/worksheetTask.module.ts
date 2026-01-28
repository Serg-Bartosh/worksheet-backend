
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionService } from './worksheetTask.service';
import { SessionController } from './worksheetTask.controller';
import { SessionModel } from './worksheetTask.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SessionModel])
  ],
  providers: [SessionService],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionsModule { }