import { Career } from "src/modules/career/entities/career.entity";
import { Institute } from "src/modules/institute/entities/institute.entity";

export class Victim {
    _id: string;
    name: string;
    lastName: string;
    age: number;
    address: string;
    phone: string;
    email: string;
    careerId: Career;
    instituteId: Institute;
}
