import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { Request } from 'express';

interface CustomRequest extends Request {
  userId: {
    id: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = request.cookies.accessToken;
    // console.log(token);
    if (!token) {
      throw new UnauthorizedException('token does not exist');
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      // console.log('---payload', payload);
      //We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['userId'] = payload;
      // console.log('auth guard-------', request.userId);
    } catch (e) {
      throw new UnauthorizedException('token does not verify ');
    }
    return true;
  }
}
