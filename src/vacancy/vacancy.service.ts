import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/VacancyDto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/VacancyDto/update-vacancy.dto';
import { Vacancy } from './models/vacancy.model';
import { Company } from 'src/company/models/company.model';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyService } from '../company/company.service';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { VacancyCategory } from './models/vacancy_category.model';
import { CategoryService } from 'src/category/category.service';
import { CreateResponseDto } from './dto/ResponseDto/create-response.dto';
import { Response } from './models/response.model';
import { Category } from 'src/category/category.model';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel(Vacancy) private readonly vacancyRepostitory: typeof Vacancy,
    @InjectModel(VacancyCategory) private readonly vacancyCategoryRepostitory: typeof VacancyCategory,
    @InjectModel(Response) private readonly responseRepostitory: typeof Response,
    private readonly companyService: CompanyService,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createVacancyDto: CreateVacancyDto, userId: string) {
    try {
      const { category, ...vacancyData } = createVacancyDto;
      const company = await this.companyService.findOneByUser(
        userId,
        vacancyData.companyId,
      );
      if (!company) {
        throw { message: 'company not found', status: HttpStatus.NOT_FOUND };
      }

      const isCategory = await this.categoryService.findOne(category.categoryId);
      if (!isCategory) {
        throw {
          message: 'category not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const vacancy = await this.vacancyRepostitory.create(vacancyData);

      const categoryData = {
        ...category,
        vacancyId: vacancy.id,
      }

      await this.vacancyCategoryRepostitory.create(categoryData);

      return {vacancy, categoryData};
    } catch (err) {
      ErrorHandler(err)
    }
  }

  async createResponse(createResponseDto: CreateResponseDto, userId: string, vacancyId: string) {
    try {
    const vacancy = this.findOne(vacancyId);
    const responseData = {
      vacancyId: vacancyId,
      userId: userId,
      description: createResponseDto.description,
      file: createResponseDto.file,
      resume: createResponseDto.resume
    }
    await this.responseRepostitory.create(responseData);

    return responseData;
    } catch(error) {
      ErrorHandler(error);
    }
  }

  async findOneResponse(id: string) {
    try {
      const response = await this.responseRepostitory.findByPk(id);
      if (!response) {
        throw { message: 'response not found', status: HttpStatus.NOT_FOUND };
      }
      return response;
    } catch (error) {
      ErrorHandler(error)
    }
  }

  async findAll() {
    const vacancy = await this.vacancyRepostitory.findAll({
       include: [Category],
    });
    return vacancy;
  }

  async findOne(id: string) {
    try {
      const vacancy = await this.vacancyRepostitory.findByPk(id, {
        include: [Category],
      });
      if (!vacancy) {
        throw { message: 'vacancy not found', status: HttpStatus.NOT_FOUND };
      }
      return vacancy;
    } catch (error) {
      ErrorHandler(error)
    }
  }

  async findOneByUser(userId: string, vacancyId: string) {
    try {
      const vacancy = await this.vacancyRepostitory.findOne({
        where: { id: vacancyId },
      });

      const company = await this.companyService.findOne(vacancy.companyId);
      if (
        company.userId !== userId ||
        !company ||
        vacancy.companyId !== company.id
      ) {
        throw { message: 'You do not own this company or such company does not exist',
         status: HttpStatus.NOT_FOUND };
      }

      return vacancy;
    } catch (error) {
      ErrorHandler(error)
    }
  }

  async findOneCategory(vacancyId: string) {
    try {
      const category = await this.vacancyCategoryRepostitory.findOne({
        where: { vacancyId },
      });
      if (!category) {
        throw new Error('category not found');
      }
      return category;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async update(updateVacancyDto: UpdateVacancyDto) {
    try {
      const vacancy = await this.findOne(updateVacancyDto.id);
      if (!vacancy) {
        throw { message: 'Vacancy not found',status: HttpStatus.NOT_FOUND };
      }
      const { category, ...vacancyData } = updateVacancyDto;
      const categoryToUpdate = await this.findOneCategory(updateVacancyDto.id);
      await categoryToUpdate.update(category);
      await vacancy.update(vacancyData);
      return {vacancy, categoryToUpdate};
    } catch (error) {
      ErrorHandler(error)
    }
  }

  async remove(id: string) {
    try {
      const vacancy = await this.findOne(id);
      if (!vacancy) {
        throw { message: 'Vacancy not found',status: HttpStatus.NOT_FOUND };
      }
      await this.vacancyRepostitory.destroy({ where: { id } });
      return { message: 'Vacancy deleted successfuly' };
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
