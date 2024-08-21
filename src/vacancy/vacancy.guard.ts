import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Req,
  Param,
} from '@nestjs/common';
// import { jwtConstants } from './constants';
import { Request } from 'express';

import { VacancyService } from './vacancy.service';

interface CustomRequest extends Request {
  userId: {
    id: string;
  };
}

@Injectable()
export class VacancyGuard implements CanActivate {
  constructor(private vacancyService: VacancyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const userId = request.userId.id;
    const vacancyId = request.body.id;

    try {
      const vacancy = await this.vacancyService.findOneByUser(
        userId,
        vacancyId,
      );
      if (!vacancy) {
        throw new UnauthorizedException('vacancy not editable');
      }
    } catch {
      throw new UnauthorizedException('to vacancy permission denied');
    }
    return true;
  }
}
