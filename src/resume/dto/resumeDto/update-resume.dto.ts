import { PartialType } from '@nestjs/mapped-types';
import { Length, NotContains, IsNotEmpty  } from '@nestjs/class-validator';
import { CreateResumeDto } from './create-resume.dto';
import { UpdateExperienceDto } from '../experienceDto/update-experience.dto';
import { UpdateLanguageDto } from '../languageDto/update-language.dto';
import { UpdateResumeCategoryDto } from '../resumeCategoryDto/update-resumeCategory.dto';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @IsNotEmpty()
    @NotContains(' ')
    id: string;
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
    experience: UpdateExperienceDto;
    language: UpdateLanguageDto;
    category: UpdateResumeCategoryDto;
}


