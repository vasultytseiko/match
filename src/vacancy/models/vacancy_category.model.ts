import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
  } from 'sequelize-typescript';
  
  import { Vacancy } from './vacancy.model';
  import { Category } from 'src/category/category.model';
  
  interface VacancyCategoryCreationAttribute {
    vacancyId: string;
    categoryId: string
  }
  
  @Table({ tableName: 'vacancy_category' })
  export class VacancyCategory extends Model<VacancyCategory, VacancyCategoryCreationAttribute> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      unique: true,
      primaryKey: true,
    })
    id: string;
  
    @ForeignKey(() => Vacancy)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    vacancyId: string;

    @ForeignKey(() => Category)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    categoryId: string;
  
    @BelongsTo(() => Vacancy)
    resume: Vacancy;
  }
  