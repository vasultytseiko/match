import { PartialType } from '@nestjs/mapped-types';
import { Length } from '@nestjs/class-validator';
import { CreateResponseDto } from './create-response.dto';

export class UpdateResponseDto extends PartialType(CreateResponseDto) {
    vacancyId: string;
    userId: string;
    @Length(10, 200)
    description: string;
    file: string;
    resume: string;
}
