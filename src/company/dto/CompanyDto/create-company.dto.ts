import { Length } from '@nestjs/class-validator';
import { CreateMembersDto } from '../MembersDto/create-members.dto';

export class CreateCompanyDto {
  @Length(3, 30)
  companyName: string;
  @Length(10, 200)
  description: string;
  userId: string;
  image: string;
  members: CreateMembersDto;
}
