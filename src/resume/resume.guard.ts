import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

import { ResumeService } from './resume.service';

interface CustomRequest extends Request {
  userId: {
    id: string;
  };
}

@Injectable()
export class ResumeGuard implements CanActivate {
  constructor(private resumeService: ResumeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const userId = request.userId.id;
    const resumeId = request.body.id;

    try {
      const resume = await this.resumeService.findOneByUser(userId, resumeId);
      if (!resume) {
        return false;
      }
    } catch (e) {
      throw new UnauthorizedException('Unable to check resume permission');
    }
    return true;
  }
}
