import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/UserDto/create-user.dto';
import { UpdateUserDto } from './dto/UserDto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { UserRoles } from './models/user_roles.model';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.model';
import * as fs from 'fs';
import * as path from 'path';
import { MulterFile } from 'express-fileupload';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserRoles)
    private readonly userRolesRepository: typeof UserRoles,
    private readonly roleService: RoleService,
  ) {}
  private async isUniqueUser(email: string): Promise<boolean> {
    const isUniqueEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (isUniqueEmail) {
      return false;
    }
    return true;
  }

  async create(createUserDto: CreateUserDto) {
    const { role, ...userData } = createUserDto;
    const isUnique = await this.isUniqueUser(userData.email);

    if (!isUnique) {
      throw new BadRequestException({
        message: 'Email already exist',
      });
    }

    const hashPassword = await bcrypt.hash(userData.password, 5);
    userData.password = hashPassword;
    const user = await this.userRepository.create(userData);

    if (role) {
      const isRole = await this.roleService.findOne(role.roleId);
      if (!isRole) {
        throw {
          message: 'role not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      const roleData = {
        ...role,
        userId: user.id,
      };

      await this.userRolesRepository.create(roleData);
    } else { 
      const roleData = {
        roleId: "d07c79b7-01e8-40ed-b30e-576de66150ca",
        userId: user.id,
      };
      await this.userRolesRepository.create(roleData);
    }

    return {
      user: {
        id: user.id,
        fullName: user.firstName,
        email: user.email,
      },
    };
  }

  async findAll() {
    const users = await this.userRepository.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [{ model: Role, as: 'roles' }],
    });
    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findByPk(id, {
        include: [{ model: Role, as: 'roles' }],
        attributes: {
          exclude: ['password'],
        },
      });
      if (!user) {
        throw { message: 'User not found', status: HttpStatus.NOT_FOUND };
      }
      return user;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'isActive'],
    });

    if (!user) {
      throw new BadRequestException({
        message: 'Incorrect login or password',
      });
    }

    return user;
  }

  async updatePassword(id: string, password: string) {
    try {
      const user = await this.findOne(id);
      await user.update({ password });
      return user;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async findOneRole(roleId: string) {
    try {
      const role = await this.userRolesRepository.findOne({
        where: { roleId },
      });
      if (!role) {
        throw new Error('role not found');
      }
      return role;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw { message: 'User not found', status: HttpStatus.NOT_FOUND };
      }

      const { role, ...userData } = updateUserDto;
      if(role) {
      const roleToUpdate = await this.findOneRole(id);
      await roleToUpdate.update(role);
      }
      await user.update(userData);
      return { user };
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async updateProfileImage(userId: string, image: MulterFile) {
    try {
      const user = await this.userRepository.findByPk(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (image) {
        const destination = process.env.UPLOAD_PATH || './src/assets/user_avatars';
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination, { recursive: true });
        }
        const uniqueFilename = `${Date.now()}-${image.originalname}`;
        const imagePath = path.join(destination, uniqueFilename);

        fs.writeFileSync(imagePath, image.buffer);
        user.image = imagePath;
      }
      await user.save();
      return { message: 'Avatar is successfully updated' };
    } catch (error) {
      ErrorHandler(error);
    }
  }


  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      await this.userRepository.destroy({ where: { id } });
      return { message: 'user deleted successfuly' };
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async activeUser(id: string, isActive: boolean) {
    try {
      const user = await this.findOne(id);
      await user.update({
        isActive,
      });
      return user;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
