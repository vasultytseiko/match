import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

import { Company } from 'src/company/models/company.model';
import { UserRoles } from './user_roles.model';
import { Role } from '../../role/role.model';
import { Resume } from 'src/resume/models/resume.model';
import { Vacancy } from 'src/vacancy/models/vacancy.model';
import { Response } from 'src/vacancy/models/response.model';
import { Members } from '../../company/models/members.model';

interface UserCreationAttribute {
  email: string;
  password: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  image: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttribute> {
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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  birthday: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @HasMany(() => Company)
  company: Company[];

  @HasMany(() => Resume)
  resume: Resume[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Vacancy, () => Response)
  vacancies: Vacancy[];

  @BelongsToMany(() => Company, () => Members)
  companies: Company[];

}
