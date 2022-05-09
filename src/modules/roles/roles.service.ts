import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './interfaces/role.interface';
import { CreateRoleDTO } from './dto/create-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) { }

    async getAll(): Promise<Role[]> {
        const roles = await this.roleModel.find({}).exec();
        return roles;
    }

    async getById(roleID: string): Promise<Role> {
        const role = await this.roleModel.findById(roleID).exec();
        return role;
    }

    async getByName(roleName: string): Promise<Role> {
        const role = await this.roleModel.findOne({ name: roleName });
        return role;
    }

    async create(createRoleDTO: CreateRoleDTO): Promise<Role> {
        const created = new this.roleModel(createRoleDTO);
        return await created.save();
    }

    async update(roleID: string, createRoleDTO: CreateRoleDTO): Promise<Role> {
        const updated = await this.roleModel.findByIdAndUpdate(roleID, createRoleDTO, { new: true }).exec();
        return updated;
    }

    async delete(roleID: string): Promise<Role> {
        const deleted = await this.roleModel.findByIdAndDelete(roleID).exec();
        return deleted;
    }

}
