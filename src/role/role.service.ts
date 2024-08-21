import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.model';
import { ErrorHandler } from 'src/utils/ErrorHandler';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const isUnique = await this.isUniqueRole(createRoleDto.value);
    if (!isUnique) {
      throw new BadRequestException({
        message: 'Such role has already exist',
      });
    }
    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }

  async findOne(id: string) {
    try {
      const role = await this.roleRepository.findByPk(id);
      if (!role) {
        throw { message: 'role not found', status: HttpStatus.NOT_FOUND };
      }
      return role;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async update(updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.findOne(updateRoleDto.id);
      await role.update(updateRoleDto);
      return role;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.destroy({ where: { id: role.id } });
      return { message: 'role deleted successfuly' };
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async isUniqueRole(value: string): Promise<boolean> {
    const isUnique = await this.roleRepository.findOne({
      where: { value },
    });
    if (isUnique) {
      return false;
    }
    return true;
  }
}
