import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { Vacancy } from './models/vacancy.model';
import { CompanyModule } from '../company/company.module';
import { Company } from '../company/models/company.model';
import { CompanyService } from '../company/company.service';
import { Response } from './models/response.model';
import { VacancyCategory } from './models/vacancy_category.model';
import { Category } from 'src/category/category.model';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { Members } from 'src/company/models/members.model';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { UserRoles } from 'src/user/models/user_roles.model';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { Offer } from 'src/company/models/offer.model';
import { Resume } from 'src/resume/models/resume.model';
import { ResumeModule } from 'src/resume/resume.module';
import { ResumeService } from 'src/resume/resume.service';
import { Experience } from 'src/resume/models/experience.model';
import { Language } from 'src/resume/models/language.model';
import { ResumeCategory } from 'src/resume/models/resume_category.model';


@Module({
  imports: [
    SequelizeModule.forFeature([Vacancy, Company, Response, VacancyCategory, Category, Members, User, UserRoles, Role, Offer, Resume, Experience, Language, ResumeCategory]),
    JwtModule,
    CompanyModule,
    CategoryModule,
    RoleModule,
    ResumeModule
  ],
  controllers: [VacancyController],
  providers: [VacancyService, CompanyService, CategoryService, UserService, RoleService, ResumeService],
})
export class VacancyModule {}
