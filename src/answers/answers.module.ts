import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnswerModel } from './answers.model';

@Module({

    imports: [SequelizeModule.forFeature([AnswerModel])],
    controllers: [],
    providers: [],
    exports: [SequelizeModule],
})

export class AnswerModule { }