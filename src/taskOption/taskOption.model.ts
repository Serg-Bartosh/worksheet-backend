import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { WorksheetTaskModel } from '../worksheetTasks/worksheetTask.model';

@Table({ tableName: 'task_options' })
export class TaskOptionModel extends Model {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare text: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare isCorrect: boolean;

    @ForeignKey(() => WorksheetTaskModel)
    @Column({ type: DataType.INTEGER })
    taskId: number;

    @BelongsTo(() => WorksheetTaskModel)
    task: WorksheetTaskModel;
}