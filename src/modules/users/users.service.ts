import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FilterUsersDto } from './dto/filter-users.dto';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { Resumen } from './interfaces/resumen.interface';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { MongoModel } from 'src/shared/interfaces/mongo-model.interface';
import { PaginatedRespond } from 'src/shared/interfaces/paginated-respond.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: MongoModel<User>
    ) { }

    async getAllWithImage(skip: number, limit: number): Promise<Array<User>> {
        return await this.userModel.find({ imageProfile: { $exists: true } }).skip(skip).limit(limit);
    }


    async getAll(query: FilterUsersDto): Promise<PaginatedRespond<User>> {

        const filters = {
        };

        if (query.role !== 'null') {
            filters['roleId'] = new Types.ObjectId(query.role);
        }

        if (query.status !== 'todos') {
            filters['isActive'] = query.status === 'activo';
        }

        if (query.name !== '') {
            filters['$or'] = [
                { fullName: { $regex: new RegExp(query.name), $options: 'i' } },
                { email: { $regex: new RegExp(query.name), $options: 'i' } }
            ];
        }

        const queryAggregate = this.userModel.aggregate([
            // {
            //     $lookup: {
            //         from: 'bussiness',
            //         localField: '_id',
            //         foreignField: 'userId',
            //         as: 'bussiness'
            //     }
            // },
            // pupulate roleId
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'roleId'
                }
            },
            {
                $unwind: '$roleId'
            },
            {
                $addFields: {
                    // business: { $arrayElemAt: ['$bussiness', 0] },
                    fullName: { $concat: ['$name', ' ', '$lastName', ' ', '$surName'] }
                }
            },
            {
                $match: filters
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    email: 1,
                    isVerified: 1,
                    isActive: 1,
                    roleId: 1,
                    role: 1,
                    createdAt: 1,
                    // 'business._id': 1,
                    // 'business.name': 1
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);

        const users = this.userModel.aggregatePaginate(queryAggregate, {
            page: query.page,
            limit: query.limit,
            customLabels: {
                totalDocs: 'count',
                docs: 'data',
                // limit: 'perPage',
                // page: 'currentPage',
                // nextPage: 'next',
                // prevPage: 'prev',
                // totalPages: 'pageCount',
                // pagingCounter: 'slNo',
                // meta: 'paginator'
            }
        });

        return users;
    }

    async getResumen(): Promise<Resumen[]> {

        return this.userModel.aggregate([
            {
                $group: {
                    _id: '$roleId', count: { $sum: 1 }
                }
            }
        ]).exec();

    }


    async create(createUserDto: CreateUserDto): Promise<User> {

        const createdUser = new this.userModel(createUserDto);

        return await createdUser.save();

    }

    async update(userId: string, createUserDto: CreateUserDto): Promise<User> {

        const user = await this.userModel.findByIdAndUpdate(userId, createUserDto, { new: true }).exec();

        return user;

    }

    async updateStatus(userId: string, createUserDto: UpdateUserStatusDto): Promise<User> {

        return await this.userModel.findByIdAndUpdate(userId, createUserDto, { new: true }).exec();

    }

    async getByEmail(email: string): Promise<User> {

        return await this.userModel.findOne({ email }).populate('roleId', '-createdAt -updatedAt').exec();

    }


    async getByRole(roleId: string, fields: string = null): Promise<User[]> {

        if (fields) {
            return await this.userModel.find({ roleId }, fields).exec();
        } else {
            return await this.userModel.find({ roleId }).exec();
        }

    }

    async getByRoles(roles: Array<string>, fields: string = null): Promise<User[]> {

        if (fields) {
            return await this.userModel.find({ roleId: { $in: roles } }, fields).exec();
        } else {
            return await this.userModel.find({ roleId: { $in: roles } }).exec();
        }

    }

    async getByIds(ids: Array<string>, fields: string = null): Promise<User[]> {

        if (fields) {
            return await this.userModel.find({ _id: { $in: ids } }, fields).exec();
        } else {
            return await this.userModel.find({ _id: { $in: ids } }).exec();
        }

    }

    async getByVerifiedCode(verifiedCode: string): Promise<User> {

        return await this.userModel.findOne({ verifiedCode }).populate('roleId', '-createdAt -updatedAt');

    }

    async getById(_id: string): Promise<User> {

        return await this.userModel.findById(_id).populate('interests', 'name').exec();

    }

    async getByIdArr(_id: Array<string>): Promise<Array<User>> {

        return await this.userModel.find({ _id: { $in: _id } }).exec();

    }

    async updatePassword(userId: string, updatePasswordDTO: UpdatePasswordDTO): Promise<User> {

        return await this.userModel.findByIdAndUpdate(userId, updatePasswordDTO, { new: true }).exec();

    }

    async updateRole(userId: string, updateDto: UpdateRoleDto): Promise<User> {

        return await this.userModel.findByIdAndUpdate(userId, updateDto, { new: true }).exec();

    }

    async delete(userId: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(userId).exec();
    }
}
