import { Length, NotContains, IsNotEmpty  } from '@nestjs/class-validator';

export class CreateLanguageDto {
  resumeId: string;
  @IsNotEmpty()
  @NotContains(' ')
  value: string;
  @IsNotEmpty()
  @NotContains(' ')
  level: string;
}
