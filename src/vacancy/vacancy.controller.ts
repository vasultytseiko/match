import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { CompanyGuard } from '../company/company.guard';
import { VacancyGuard } from './vacancy.guard';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/VacancyDto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/VacancyDto/update-vacancy.dto';
import { CreateResponseDto } from './dto/ResponseDto/create-response.dto';
import { ValidationPipe } from '../pipe/validation.pipe';

interface CustomRequest extends Request {
  userId: {
    id: string;
  };
}

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(
    @Body() createVacancyDto: CreateVacancyDto,
    @Req() req: CustomRequest,
  ) {
    return this.vacancyService.create(createVacancyDto, req.userId.id);
  }

  @UseGuards(AuthGuard)
  @Post('/response/:id')
  createResponse(
    @Body() createResponseDto: CreateResponseDto,
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ) {
    return this.vacancyService.createResponse(
      createResponseDto,
      req.userId.id,
      id,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.vacancyService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacancyService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('/response/:id')
  findOneResponse(@Param('id') id: string) {
    return this.vacancyService.findOneResponse(id);
  }

  @UseGuards(AuthGuard, VacancyGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  update(@Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(updateVacancyDto);
  }

  @UseGuards(AuthGuard, VacancyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacancyService.remove(id);
  }
}
