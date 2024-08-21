import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

import { Company } from './models/company.model';
import { User } from '../user/models/user.model';
import { UserService } from 'src/user/user.service';
import { Vacancy } from 'src/vacancy/models/vacancy.model';
import { Members } from './models/members.model';
import { UserModule } from 'src/user/user.module';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { UserRoles } from 'src/user/models/user_roles.model';
import { Offer } from './models/offer.model';
import { ResumeService } from 'src/resume/resume.service';
import { ResumeModule } from 'src/resume/resume.module';
import { Resume } from 'src/resume/models/resume.model';
import { Experience } from 'src/resume/models/experience.model';
import { Language } from 'src/resume/models/language.model';
import { ResumeCategory } from 'src/resume/models/resume_category.model';
import { Category } from 'src/category/category.model';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [SequelizeModule.forFeature([Company, User, Vacancy, Members, Role, UserRoles, Offer, Resume, Experience, Language, ResumeCategory, Category]),
    JwtModule,
    UserModule,
    RoleModule,
    CategoryModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService, UserService, RoleService, ResumeService, CategoryService],
})
export class CompanyModule {}
