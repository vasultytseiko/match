import { PartialType } from "@nestjs/mapped-types";
import { CreateOfferDto } from "./create-offer.dto";

export class UpdateMembersDto extends PartialType(CreateOfferDto) {
    companyId: string;
    resumeId: string;
    description: string;
}