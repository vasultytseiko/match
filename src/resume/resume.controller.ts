import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/resumeDto/create-resume.dto';
import { CreateExperienceDto } from './dto/experienceDto/create-experience.dto';
import { UpdateResumeDto } from './dto/resumeDto/update-resume.dto';
import { ResumeGuard } from './resume.guard';
import { ValidationPipe } from '../pipe/validation.pipe';

interface CustomRequest extends Request {
  userId: {
    id: string;
  };
}

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(
    @Body() createResumeDto: CreateResumeDto,
    @Req() req: CustomRequest,
  ) {
    createResumeDto.userId = req.userId.id;
    return this.resumeService.create(createResumeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  @UseGuards(AuthGuard, ResumeGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  update(@Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(updateResumeDto);
  }

  @UseGuards(AuthGuard, ResumeGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(id);
  }
}
