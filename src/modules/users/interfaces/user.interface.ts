import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    passportId: string;
    name: string;
    lastName: string;
    surName: string;
    email: string;
    password: string;
    isActive: boolean;
    isVerified: boolean;
    verifiedCode: string;
    verifiedAt: Date;
    createdAt: Date;
    roleId: string | any;
    comparePassword(password: string): Promise<boolean>;
}
