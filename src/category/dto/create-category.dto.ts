import { NotContains, IsNotEmpty } from '@nestjs/class-validator';

export class CreateCategoryDto {
  // @IsNotEmpty()
  // @NotContains(' ')
  // id: string;
  @IsNotEmpty()
  @NotContains(' ')
  value: string;
}
