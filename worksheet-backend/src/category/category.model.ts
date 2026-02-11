import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { TaskOptionModel } from '../taskOption/taskOption.model';

@Table({ tableName: 'category' })
export class CategoryModel extends Model<CategoryModel> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare color: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare timestamps: string;

    @HasMany(() => TaskOptionModel)
    declare taskOptions: TaskOptionModel[];

    // TODO: add categoryId (Integer, FK → Category.id, nullable)
}