import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { WorksheetTaskModel } from '../worksheetTasks/worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { SessionModel } from '../sessions/session.model';


@Table({ tableName: 'answers', timestamps: true })
export class AnswerModel extends Model {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Index({ name: 'session_task_unique', unique: true })
    @ForeignKey(() => SessionModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare sessionId: number;

    @Index({ name: 'session_task_unique', unique: true })
    @ForeignKey(() => WorksheetTaskModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare taskId: number;

    @ForeignKey(() => TaskOptionModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare optionId: number;

    @BelongsTo(() => SessionModel)
    session: SessionModel;

    @BelongsTo(() => WorksheetTaskModel)
    task: WorksheetTaskModel;

    @BelongsTo(() => TaskOptionModel)
    option: TaskOptionModel;
}