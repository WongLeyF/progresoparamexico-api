import { Career } from "src/modules/career/entities/career.entity";

export class Institute {
    constructor(
        public name: string,
        public address: string,
        public phone: string,
        public email: string,
        public schoolGrade: string,
        public careers: Array<Career>,
    ) { }
        

}
