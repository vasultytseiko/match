import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { Category } from './category.model';

@Module({
  imports: [SequelizeModule.forFeature([Category]), JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
