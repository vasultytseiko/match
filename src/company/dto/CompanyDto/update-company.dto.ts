import { PartialType } from '@nestjs/mapped-types';
import { Length } from '@nestjs/class-validator';

import { CreateCompanyDto } from './create-company.dto';
import { UpdateMembersDto } from '../MembersDto/update-members.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  id: string;
  @Length(3, 30)
  companyName: string;
  @Length(10, 200)
  description: string;
  userId: string;
  image: string;
}
