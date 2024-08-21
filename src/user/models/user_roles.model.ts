import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { User } from './user.model';
import { Role } from '../../role/role.model';

interface UserRolesCreationAttribute {
  userId;
  roleId;
}

@Table({ tableName: 'user_roles' })
export class UserRoles extends Model<UserRoles, UserRolesCreationAttribute> {
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
    allowNull: true,
  })
  userId: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  roleId: string;
}
