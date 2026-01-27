import { Sequelize } from 'sequelize-typescript';
import { WorksheetTaskModel } from './worksheetTasks/worksheetTask.model';
// import { TaskOption } from './task-option.model';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.HOST || '127.0.0.1',
                port: Number(process.env.PORT) || 3306,
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: 'worksheet_backend',
            });

            sequelize.addModels([WorksheetTaskModel]);

            await sequelize.sync();
            return sequelize;
        },
    },
];