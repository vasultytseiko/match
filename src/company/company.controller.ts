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

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/CompanyDto/create-company.dto';
import { UpdateCompanyDto } from './dto/CompanyDto/update-company.dto';

import { AuthGuard } from '../auth/auth.guard';
import { CompanyGuard } from './company.guard';
import { ValidationPipe } from '../pipe/validation.pipe';
import { CreateMembersDto } from './dto/MembersDto/create-members.dto';
import { CreateOfferDto } from './dto/OfferDto/create-offer.dto';

import { CustomRequest } from '../types/index';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: CustomRequest,
  ) {
    createCompanyDto.userId = req.userId.id;
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(AuthGuard)
  // @UsePipes(ValidationPipe)
  @Post('/offer/:id')
  createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ) {
    return this.companyService.createOffer(createOfferDto, req.userId.id, id);
  }

  @UseGuards(AuthGuard)
  @Get('/offer/:id')
  findOneResponse(@Param('id') id: string) {
    return this.companyService.findOneOffer(id);
  }

  @UseGuards(AuthGuard, CompanyGuard)
  @Post('/addMember/:id')
  addMember(
    @Param('id') id: string,
    @Body() createMembersDto: CreateMembersDto,
  ) {
    return this.companyService.addMember(id, createMembersDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @UseGuards(AuthGuard, CompanyGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  update(@Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(updateCompanyDto);
  }

  @UseGuards(AuthGuard, CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
