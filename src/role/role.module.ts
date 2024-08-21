import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './role.model';
import { UserRoles } from '../user/models/user_roles.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, UserRoles, User]), JwtModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
