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
import { Company } from './company.model';

interface MembersCreationAttribute {
  userId: string;
  companyId: string;
  position: string;
}

@Table({ tableName: 'members' })
export class Members extends Model<Members, MembersCreationAttribute> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  companyId: string;

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
}
