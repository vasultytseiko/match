import { PartialType } from '@nestjs/mapped-types';
import { CreateVacancyDto } from './create-vacancy.dto';
import { Length, IsNotEmpty, NotContains } from '@nestjs/class-validator';
import { UpdateVacancyCategoryDto } from '../CategoryDto/update-vacancyCategory.dto';

export class UpdateVacancyDto extends PartialType(CreateVacancyDto) {
  @IsNotEmpty()
  @NotContains(' ')
  id: string;
  @IsNotEmpty()
  @NotContains(' ')
  companyId: string;
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
  experience: string;
  @IsNotEmpty()
  @NotContains(' ')
  city: string;
  @IsNotEmpty()
  salary: number;
  typeWork: 'Remote' | 'NotRemote';
  employment: 'PartTime' | 'FullTime';
  category: UpdateVacancyCategoryDto;
}
