import { Career } from "src/modules/career/entities/career.entity";
import { Institute } from "src/modules/institute/entities/institute.entity";

export interface Denounce extends Document {
    instituteId: Institute;
    careerId?: Career
    violenceType: string;
    personDenounced: string;
    personDenouncedGender: string;
    incidentLocation: string;
    actionTaken: string;
    somenthingHappened: string;
    timeSinceIncident: string;
    interventionType: string;
    interventionDescription: string;
    informationReceived: boolean;
    mechanismsExist: boolean;
}