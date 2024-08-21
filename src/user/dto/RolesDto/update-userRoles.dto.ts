import { PartialType } from "@nestjs/mapped-types";
import { CreateUserRoleDto } from "./create-userRoles.dto";

export class UppdateUserRoleDto extends PartialType(CreateUserRoleDto) {
    userId: string;
    roleId: string;
}