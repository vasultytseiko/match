import {
  IsEmail,
  Length,
  Matches,
  IsString,
  IsOptional,
  NotContains,
  IsNotEmpty,
} from '@nestjs/class-validator';
import { CreateUserRoleDto } from '../RolesDto/create-userRoles.dto';
// import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  // message: 'password too weak',
  // })
  @IsNotEmpty()
  @NotContains(' ')
  password: string;
  isActive: boolean;
  @IsNotEmpty()
  @NotContains(' ')
  firstName: string;
  @IsNotEmpty()
  @NotContains(' ')
  lastName: string;
  @IsNotEmpty()
  @NotContains(' ')
  birthday: string;
  @IsNotEmpty()
  @NotContains(' ')
  phone: string;
  image: string;
  role: CreateUserRoleDto;
}
