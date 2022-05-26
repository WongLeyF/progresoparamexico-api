import { Career } from "src/modules/career/entities/career.entity";

export class CreateInstituteDto {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    schoolGrade?: string;
    careers?: Array<Career>
}
