import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorHandler } from 'src/utils/ErrorHandler';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isUnique = await this.isUniqueCategory(createCategoryDto.value);
    if (!isUnique) {
      throw new BadRequestException({
        message: 'Such category has already exist',
      });
    }
    const category = await this.categoryRepository.create(createCategoryDto);
    return category;
  }

  async findAll() {
    const category = await this.categoryRepository.findAll();
    return category;
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findByPk(id);
      if (!category) {
        throw { message: 'category not found', status: HttpStatus.NOT_FOUND };
      }
      return category;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(updateCategoryDto.id);
      await category.update(updateCategoryDto);
      return category;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.findOne(id);
      await this.categoryRepository.destroy({ where: { id } });
      return { message: 'category deleted successfuly' };
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async isUniqueCategory(value: string): Promise<boolean> {
    try {
      const isUnique = await this.categoryRepository.findOne({
        where: { value },
      });
      if (isUnique) {
        return false;
      }
      return true;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
