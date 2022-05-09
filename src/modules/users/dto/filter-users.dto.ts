export class FilterUsersDto {
    readonly role: string;
    readonly name: string;
    readonly status: string;
    readonly page: number;
    readonly limit: number;
}