import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { User } from './models/user.model';
import { Company } from 'src/company/models/company.model';
import { Role } from '../role/role.model';
import { UserRoles } from './models/user_roles.model';
import { Resume } from 'src/resume/models/resume.model';
import { Response } from 'src/vacancy/models/response.model';
import { Vacancy } from 'src/vacancy/models/vacancy.model';
import { Members } from 'src/company/models/members.model';

import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Company, Role, UserRoles, Resume, Response, Vacancy, Members]),
    JwtModule,
    RoleModule,
    MulterModule.register({
      storage: diskStorage({
        destination: process.env.UPLOAD_PATH || './src/assets/user_avatars',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  ], 
  controllers: [UserController],
  providers: [UserService, RoleService],
})
export class UserModule {}
