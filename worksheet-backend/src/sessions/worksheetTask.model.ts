import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { AnswerModel } from '../answers/answers.model';

@Table({ tableName: 'sessions', timestamps: true })
export class SessionModel extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    token: string;

    @HasMany(() => AnswerModel)
    answers: AnswerModel[];
}