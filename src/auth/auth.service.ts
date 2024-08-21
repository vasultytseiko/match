import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/UserDto/create-user.dto';
import { UpdateUserDto } from '../user/dto/UserDto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SendMail } from './utils/sendMail.js';
import { ErrorHandler } from 'src/utils/ErrorHandler';

@Injectable()
export class AuthService {
  private readonly jwtAccessSecret: string = process.env.JWT_ACCESS_SECRET;
  private readonly jwtRefreshSecret: string = process.env.JWT_REFRESH_SECRET;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sendMail: SendMail,
  ) {}

  async registration(userDto: CreateUserDto) {
    try {
      const { user } = await this.userService.create(userDto);
      const token = this.generateToken(user.id);
      await this.sendMail.sendConfirmationEmail(user.email, token.accessToken);
      return token;
    } catch(error) {
      ErrorHandler(error)
    }
  }

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.userService.findByEmail(userDto.email);
      if (!user.isActive) {
        throw {
          message: 'Email is not activated',
          status: HttpStatus.UNAUTHORIZED,
        };
      }

      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) {
        return this.generateToken(user.id);
      } else {
        throw {
          message: 'Incorrect password',
          status: HttpStatus.UNAUTHORIZED,
        };
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }

  refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.jwtRefreshSecret,
      });

      return this.generateToken(payload.id);
      // console.log(payload);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized token',
      });
    }
  }

  async emailConfirm(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: this.jwtAccessSecret,
      });
      await this.userService.activeUser(decodedToken.id, true);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const fUser = await this.userService.findByEmail(resetPasswordDto.email);

      const token = this.generateToken(fUser.id);
      await this.sendMail.sendPasswordResetEmail(
        fUser.email,
        token.accessToken,
      );
      return {
        message:
          'The confirmation to reset your password was sent to your email',
      };
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async resetPasswordToken(resetPasswordDto: ResetPasswordDto, token: string) {
    try {
      const decodedToken = await this.jwtService.verify(token, {
        secret: this.jwtAccessSecret,
      });
      const hashPassword = await bcrypt.hash(resetPasswordDto.password, 5);
      resetPasswordDto.password = hashPassword;
      await this.userService.updatePassword(
        decodedToken.id,
        resetPasswordDto.password,
      );
      return decodedToken;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  private generateToken(id: string) {
    const accessToken = this.jwtService.sign(
      { id },
      { expiresIn: '24h', secret: this.jwtAccessSecret },
    );
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '24h', secret: this.jwtRefreshSecret },
    );
    return { accessToken, refreshToken };
  }
}
