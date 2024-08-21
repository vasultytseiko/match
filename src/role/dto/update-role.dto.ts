import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { NotContains, IsNotEmpty } from '@nestjs/class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsNotEmpty()
    @NotContains(' ')
    id: string;
    @IsNotEmpty()
    @NotContains(' ')
    value: string;
}
