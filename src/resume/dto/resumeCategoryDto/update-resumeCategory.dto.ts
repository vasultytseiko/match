import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeCategoryDto } from './create-resumeCategory.dto';

export class UpdateResumeCategoryDto extends PartialType(CreateResumeCategoryDto) {
  resumeId: string;
  categoryId: string;
}
