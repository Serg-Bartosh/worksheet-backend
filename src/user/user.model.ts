import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { SessionModel } from '../sessions/session.model';

interface UserCreationAttrs {
    login: string;
    passwordHash: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare login: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare passwordHash: string;

    @HasMany(() => SessionModel)
    declare sessions: SessionModel[];
}