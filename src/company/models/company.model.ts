import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';

import { User } from '../../user/models/user.model';
import { Vacancy } from 'src/vacancy/models/vacancy.model';
import { Resume } from 'src/resume/models/resume.model';
import { Offer } from 'src/company/models/offer.model';
import {Members} from "./members.model"
import { CreateMembersDto } from '../dto/MembersDto/create-members.dto';

interface CompanyCreationAttribute {
  companyName: string;
  description: string;
  image: string;
  userId: string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyCreationAttribute> {
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
  companyName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Vacancy)
  vacancy: Vacancy[];

  @BelongsToMany(() => Resume, () => Offer)
  resume: Resume[];

  @BelongsToMany(() => User, () => Members)
  users: User[];
}
