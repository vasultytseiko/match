import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { Length } from '@nestjs/class-validator';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  resumeId: string;
  @Length(3, 30)
  position: string;
  @Length(10, 200)
  description: string;
  companyName: string;
  city: string;
  periodStart: Date;
  periodEnd: Date;
}
