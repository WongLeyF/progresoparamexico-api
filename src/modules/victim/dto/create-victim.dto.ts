export class CreateVictimDto {
    name?: string;
    lastName?: string;
    gender?: string;
    age?: number;
    address?: string;
    phone?: string;
    email?: string;
    careerId: string;
    instituteId: string;
}
