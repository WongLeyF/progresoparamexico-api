export interface Denounce extends Document {
    schoolgrade: string;
    school: string;
    career: string;
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