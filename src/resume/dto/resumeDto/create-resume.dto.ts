import { Length, NotContains, IsNotEmpty  } from '@nestjs/class-validator';
import { CreateExperienceDto } from '../experienceDto/create-experience.dto';
import { CreateLanguageDto } from '../languageDto/create-language.dto';
import { CreateResumeCategoryDto } from '../resumeCategoryDto/create-resumeCategory.dto';

export class CreateResumeDto {
  userId: string;
  @IsNotEmpty()
  @NotContains(' ')
  @Length(3, 30)
  position: string;
  @IsNotEmpty()
  @NotContains(' ')
  @Length(10, 200)
  description: string;
  @IsNotEmpty()
  @NotContains(' ')
  skills: string;
  @IsNotEmpty()
  @NotContains(' ')
  city: string;
  @IsNotEmpty()
  @NotContains(' ')
  salary: number;
  @IsNotEmpty()
  @NotContains(' ')
  typeWork: 'Remote' | 'NotRemote';
  experience: CreateExperienceDto;
  language: CreateLanguageDto;
  category: CreateResumeCategoryDto;
}
