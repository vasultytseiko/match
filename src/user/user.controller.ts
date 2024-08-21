import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/UserDto/create-user.dto';
import { UpdateUserDto } from './dto/UserDto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ValidationPipe } from '../pipe/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomRequest } from 'src/types';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: CustomRequest) {
    return this.userService.update(req.userId.id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('profile-image')
  updateProfileImage(@Req() req: CustomRequest, 
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
      ],
    }),
  ) image: Express.Multer.File) {
    this.userService.updateProfileImage(req.userId.id, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
