import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';

import { User } from '../../user/models/user.model';
import { Experience } from './experience.model';
import { Language } from './language.model';
import { Category } from 'src/category/category.model';
import { ResumeCategory } from './resume_category.model';
import { VacancyCategory } from 'src/vacancy/models/vacancy_category.model';
import { Company } from 'src/company/models/company.model';
import { Offer } from '../../company/models/offer.model';

interface ResumeCreationAttribute {
  userId: string;
  position: string;
  description: string;
  skills: string;
  city: string;
  salary: number;
  typeWork: 'Remote' | 'NotRemote';
}

@Table({ tableName: 'resume' })
export class Resume extends Model<Resume, ResumeCreationAttribute> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  skills: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  salary: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  typeWork: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Experience)
  experience: Experience[];

  @HasMany(() => Language)
  language: Language[];

  @BelongsToMany(() => Category, () => ResumeCategory)
  categories: Category[];

  @BelongsToMany(() => Company, () => Offer)
  companies: Company[];
}
