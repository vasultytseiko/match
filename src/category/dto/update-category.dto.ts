import { PartialType } from '@nestjs/mapped-types';
import { NotContains, IsNotEmpty } from '@nestjs/class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @NotContains(' ')
  id: string;
  @IsNotEmpty()
  @NotContains(' ')
  value: string;
}
