import { PartialType } from "@nestjs/mapped-types";
import { CreateMembersDto } from "./create-members.dto";

export class UpdateMembersDto extends PartialType(CreateMembersDto) {
    userId: string;
    companyId: string;
    position: string;
}