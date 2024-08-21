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
import { Company } from 'src/company/models/company.model';
import { Response } from './response.model';
import { User } from 'src/user/models/user.model';
import { Category } from 'src/category/category.model';
import { VacancyCategory } from './vacancy_category.model';

interface VacancyCreationAttribute {
  companyId: string;
  position: string;
  description: string;
  city: string;
  typeWork: 'Remote' | 'NotRemote';
  employment: 'PartTime' | 'FullTime';
  salary: number;
  experience: string;
}

@Table({ tableName: 'vacancy' })
export class Vacancy extends Model<Vacancy, VacancyCreationAttribute> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  companyId: string;

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
  employment: string;

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  experience: string;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => User, () => Response)
  user: User[];

  @BelongsToMany(() => Category, () => VacancyCategory)
  categories: Category[];
}
