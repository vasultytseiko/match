import { Length, IsNotEmpty, NotContains } from '@nestjs/class-validator';

export class CreateExperienceDto {
  resumeId: string;
  @Length(3, 30)
  @IsNotEmpty()
  @NotContains(' ')
  position: string;
  @IsNotEmpty()
  @NotContains(' ')
  @Length(10, 200)
  description: string;
  @IsNotEmpty()
  @NotContains(' ')
  companyName: string;
  @IsNotEmpty()
  @NotContains(' ')
  city: string;
  @IsNotEmpty()
  @NotContains(' ')
  periodStart: Date;
  @IsNotEmpty()
  @NotContains(' ')
  periodEnd: Date;
}
