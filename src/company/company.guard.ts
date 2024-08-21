import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Req,
  Param,
  BadRequestException,
} from '@nestjs/common';
// import { jwtConstants } from './constants';
import { Request } from 'express';

import { CompanyService } from './company.service';
import { ErrorHandler } from 'src/utils/ErrorHandler';

interface CustomRequest extends Request {
  userId: {
    id: string;
  };
}

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private companyService: CompanyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const userId = request.userId.id;
    const companyId = request.params.id;

    try {
      const company = await this.companyService.findOneByUser(
        userId,
        companyId,
      );
      if (!company) {
        return false;
      }
    } catch (e) {
      // if (e.status !== 404) {
      //   throw new BadRequestException({ message: 'invalid uuid' });
      // }
      // console.log(e);
      ErrorHandler(e);
    }
    return true;
  }
}
