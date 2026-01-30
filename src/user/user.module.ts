
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { SessionsModule } from '../sessions/session.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    SessionsModule,
  ],
  providers: [UserService,],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }