import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';

import { Resume } from "../resume/models/resume.model"
import {ResumeCategory} from "../resume/models/resume_category.model"
import { Vacancy } from 'src/vacancy/models/vacancy.model';
import { VacancyCategory } from 'src/vacancy/models/vacancy_category.model';

interface CategoryCreationAttribute {
  value: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttribute> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @BelongsToMany(() => Resume, () => ResumeCategory)
  resume: Resume[];

  @BelongsToMany(() => Vacancy, () => VacancyCategory)
  vacancy: Vacancy[];
}
