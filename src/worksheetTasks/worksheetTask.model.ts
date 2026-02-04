import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { TaskOptionModel } from '../taskOption/taskOption.model';

@Table({ tableName: 'worksheet_tasks', timestamps: true })
export class WorksheetTaskModel extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare instruction: string;

    @HasMany(() => TaskOptionModel)
    options: TaskOptionModel[];
}
