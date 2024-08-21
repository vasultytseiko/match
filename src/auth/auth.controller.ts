import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Req,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/UserDto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @UsePipes(ValidationPipe)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(userDto);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    return { message: 'User successfully login' };
  }

  @Get('/refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = request.cookies.refreshToken;

    if (!token)
      throw new BadRequestException({
        message: 'Refresh token does not exist',
      });
    // console.log('---refresh Token', token);
    const tokens = this.authService.refresh(token);

    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    return { message: 'refresh success' };
  }

  @Post('/email-confirmation/:token')
  emailConfirm(@Param('token') token: string) {
    return this.authService.emailConfirm(token);
  }

  @Post('/reset-password')
  @UsePipes(ValidationPipe)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('/reset-password/:token')
  @UsePipes(ValidationPipe)
  resetPasswordToken(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPasswordToken(resetPasswordDto, token);
  }
}
