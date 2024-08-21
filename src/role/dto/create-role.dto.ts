import { NotContains, IsNotEmpty } from '@nestjs/class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    @NotContains(' ')
    value: string
}
