/**
 * User Information
 */
export interface PayloadToken {

    sub: string; // user _id
    email: string; // user email
    role: string; // user role name
    iat?: number;
    exp?: number;

}
