import { IsEmail, Length, Matches } from '@nestjs/class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
