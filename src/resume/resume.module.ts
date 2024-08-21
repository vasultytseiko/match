import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { Resume } from './models/resume.model';

import { User } from '../user/models/user.model';
import { Experience } from './models/experience.model';
import { Language } from './models/language.model';
import {Offer} from "../company/models/offer.model"
import { ResumeCategory } from './models/resume_category.model';
import { Category } from 'src/category/category.model';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { Company } from 'src/company/models/company.model';
import { CompanyModule } from 'src/company/company.module';
import { CompanyService } from 'src/company/company.service';
import { Members } from 'src/company/models/members.model';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/user/models/user_roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Resume, User, Experience, Language, Offer, ResumeCategory, Category, Company, Members, Offer, Role, UserRoles]),
   JwtModule,
   CategoryModule,
   CompanyModule,
   UserModule,
   RoleModule
  ],
  controllers: [ResumeController],
  providers: [ResumeService, CategoryService, CompanyService, RoleService, UserService],
})
export class ResumeModule {}
