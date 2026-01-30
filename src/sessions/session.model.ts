import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { AnswerModel } from '../answers/answers.model';
import { UserModel } from '../user/user.model';

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
    declare token: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare expiresAt: Date;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @BelongsTo(() => UserModel)
    declare user: UserModel;

    @HasMany(() => AnswerModel)
    declare answers: AnswerModel[];
}