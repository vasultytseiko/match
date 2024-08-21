import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { CreateResumeDto } from './dto/resumeDto/create-resume.dto';
import { UpdateResumeDto } from './dto/resumeDto/update-resume.dto';
import { Resume } from './models/resume.model';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorHandler } from 'src/utils/ErrorHandler';

import { Experience } from './models/experience.model';
import { Language } from './models/language.model';
import { ResumeCategory } from './models/resume_category.model';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/category.model';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume) private readonly resumeRepostitory: typeof Resume,
    @InjectModel(Experience) private readonly experienceRepository: typeof Experience,
    @InjectModel(Language) private readonly languageRepository: typeof Language,
    @InjectModel(ResumeCategory) private readonly resumeCategoryRepository: typeof ResumeCategory,
    private readonly categoryService: CategoryService,
  ) {}
    
  async create(createResumeDto: CreateResumeDto) {
    try {
      const { experience, language, category, ...resumeData } = createResumeDto;
      const resume = await this.resumeRepostitory.create(resumeData);
      const isCategory = await this.categoryService.findOne(category.categoryId);
      if (!isCategory) {
        throw {
          message: 'category not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
        const experienceData = {
          ...experience,
          resumeId: resume.id,
        };
        const languageData = {
          ...language,
          resumeId: resume.id,
        };
        const categoryData = {
          ...category,
          resumeId: resume.id,
        }
      await this.experienceRepository.create(experienceData);
      await this.languageRepository.create(languageData);
      await this.resumeCategoryRepository.create(categoryData);
      return {resume,experienceData, languageData, categoryData};
    } catch(error) {
      ErrorHandler(error);
    }
  }

  async findAll() {
    const resume = await this.resumeRepostitory.findAll({
       include: [Experience, Language, Category],
    });
    return resume;
  }

  async findOne(id: string) {
    try {
      const resume = await this.resumeRepostitory.findByPk(id, {
        include: [Experience, Language, Category],
      });
      if (!resume) {
        throw {
          message: 'resume not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return resume;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async findOneExperience(resumeId: string) {
    try {
      const experience = await this.experienceRepository.findOne({
        where: { resumeId },
      });
      if (!experience) {
        throw new Error('Experience not found');
      }
      return experience;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async findOneLanguage(resumeId: string) {
    try {
      const language = await this.languageRepository.findOne({
        where: { resumeId },
      });
      if (!language) {
        throw new Error('language not found');
      }
      return language;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async findOneCategory(resumeId: string) {
    try {
      const category = await this.resumeCategoryRepository.findOne({
        where: { resumeId },
      });
      if (!category) {
        throw new Error('category not found');
      }
      return category;
    } catch (error) {
      ErrorHandler(error);
    }
  }
  
  

  async findOneByUser(userId: string, resumeId: string) {
    try {
      const resume = await this.resumeRepostitory.findOne({
        where: { userId, id: resumeId },
      });
      if (!resume) {
        throw { message: 'resume not found', status: HttpStatus.NOT_FOUND };
      }
      return resume;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async update(updateResumeDto: UpdateResumeDto) {
      try {
      const resume = await this.resumeRepostitory.findByPk(updateResumeDto.id);
      if (!resume) {
        throw { message: 'resume not found', status: HttpStatus.NOT_FOUND };
      }

      const { experience, language, category, ...resumeData } = updateResumeDto;

      const experienceToUpdate = await this.findOneExperience(updateResumeDto.id);
      const languageToUpdate = await this.findOneLanguage(updateResumeDto.id);
      const categoryToUpdate = await this.findOneCategory(updateResumeDto.id);
      await experienceToUpdate.update(experience);
      await languageToUpdate.update(language);
      await categoryToUpdate.update(category);
      await resume.update(resumeData);

      return {resume, experienceToUpdate, languageToUpdate, categoryToUpdate};
    } catch(error) {
      ErrorHandler(error);
    }
  }
  
  
  
  async remove(id: string) {
    try {
      const resume = await this.findOne(id);
      await this.resumeRepostitory.destroy({ where: { id } });
      return { message: 'resume deleted successfuly' };
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
