import { Career } from "src/modules/career/entities/career.entity";

export class Institute {
    _id?: string;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    schoolGrade?: string;
    careers?: Array<Career>
        

}
