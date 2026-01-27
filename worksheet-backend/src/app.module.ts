import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';
import { WorksheetTaskModule } from './worksheetTasks/worksheetTask.module';
import { TaskOptionModule } from './taskOption/taskOption.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WorksheetTaskModule,
    TaskOptionModule
  ],
  controllers: [],
  providers: [...databaseProviders],
})
export class appModule { }
