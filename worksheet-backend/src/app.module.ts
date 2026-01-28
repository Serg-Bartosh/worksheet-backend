import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksheetTaskModule } from './worksheetTasks/worksheetTask.module';
import { TaskOptionModule } from './taskOption/taskOption.module';
import { ConfigService } from '@nestjs/config';
import { AnswerModel } from './answers/answers.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('MYSQL_HOST', '127.0.0.1'),
        port: configService.get<number>('MYSQL_PORT', 3306),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: 'worksheet-backend',
        autoLoadModels: true,
        synchronize: true,
      }),
    }),

    WorksheetTaskModule,
    TaskOptionModule,
    AnswerModel,
  ],
})
export class AppModule { }