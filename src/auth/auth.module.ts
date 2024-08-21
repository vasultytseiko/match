import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { SendMail } from './utils/sendMail';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { UserRoles } from 'src/user/models/user_roles.model';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserRoles, Role]),
    JwtModule,
    UserModule,
    RoleModule
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, SendMail, RoleService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}


