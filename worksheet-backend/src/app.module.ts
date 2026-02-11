import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksheetTaskModule } from './worksheetTasks/worksheetTask.module';
import { TaskOptionModule } from './taskOption/taskOption.module';
import { ConfigService } from '@nestjs/config';
import { AnswerModule } from './answers/answers.module';
import { SessionsModule } from './sessions/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env' // Uncomment and specify if you want to use a custom .env file
    }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('MYSQL_HOST', '127.0.0.1'),
        port: configService.get<number>('MYSQL_PORT', 3306),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE', 'worksheet-backend'),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),

    WorksheetTaskModule,
    TaskOptionModule,
    AnswerModule,
    SessionsModule,
    UserModule,
  ],
})
export class AppModule { }