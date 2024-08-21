import { Length, IsNotEmpty, NotContains } from '@nestjs/class-validator';
import { CreateVacancyCategoryDto } from '../CategoryDto/create-vacancyCategory.dto';

export class CreateVacancyDto {
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
  category: CreateVacancyCategoryDto;
}
