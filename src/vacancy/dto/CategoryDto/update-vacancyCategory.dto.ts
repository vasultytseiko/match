import { PartialType } from '@nestjs/mapped-types';
import { CreateVacancyCategoryDto } from './create-vacancyCategory.dto';

export class UpdateVacancyCategoryDto extends PartialType(CreateVacancyCategoryDto) {
  vacancyId: string;
  categoryId: string;
}
