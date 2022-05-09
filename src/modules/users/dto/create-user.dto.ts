export class CreateUserDto {
    readonly passportId: string;
    readonly name: string;
    readonly lastName: string;
    readonly surName: string;
    readonly email: string;
    readonly password: string;
    readonly onlyRegister?: boolean;
    roleId: string;
    verifiedCode: string;
    verifiedAt: Date;
    isVerified: boolean;
}