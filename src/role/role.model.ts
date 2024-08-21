import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';

import { User } from '../user/models/user.model';
import { UserRoles } from '../user/models/user_roles.model';

interface RoleCreationAttribute {
  value: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreationAttribute> {
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

  @BelongsToMany(() => User, () => UserRoles)
  roles: User[];
}
