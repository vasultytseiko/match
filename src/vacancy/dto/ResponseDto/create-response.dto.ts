import { Length, IsNotEmpty, NotContains } from '@nestjs/class-validator';

export class CreateResponseDto {
    @IsNotEmpty()
    @NotContains(' ')
    vacancyId: string;
    @IsNotEmpty()
    @NotContains(' ')
    userId: string;
    @Length(10, 200)
    description: string;
    @IsNotEmpty()
    @NotContains(' ')
    file: string;
    @IsNotEmpty()
    @NotContains(' ')
    resume: string;
}