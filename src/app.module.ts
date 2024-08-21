import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

import { User } from './user/models/user.model';
import { Company } from './company/models/company.model';
import { Vacancy } from './vacancy/models/vacancy.model';
import { Role } from './role/role.model';
import { UserRoles } from './user/models/user_roles.model';
import { Resume } from './resume/models/resume.model';
import { Category } from './category/category.model';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CompanyModule } from './company/company.module';
import { ResumeModule } from './resume/resume.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';

import * as path from 'path';
import { Experience } from './resume/models/experience.model';
import { Language } from './resume/models/language.model';
import { Response } from './vacancy/models/response.model';
import { ResumeCategory } from './resume/models/resume_category.model';
import { VacancyCategory } from './vacancy/models/vacancy_category.model';
import { Offer } from './company/models/offer.model';
import { Members } from './company/models/members.model';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Vacancy, Company, Response, VacancyCategory, Category, Members, User, UserRoles, Role, Offer, Resume]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
      serveRoot: '/api/static/',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Company, Resume, Vacancy, Role, UserRoles, Experience, Language, Category, Response, ResumeCategory, VacancyCategory, Offer, Members],
      autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    CompanyModule,
    ResumeModule,
    VacancyModule,
    RoleModule,
    CategoryModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, RoleService],
})
export class AppModule {}
