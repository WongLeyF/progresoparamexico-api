import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Denounce } from './interfaces/denounce.interface';
import { Model } from 'mongoose';


@Injectable()
export class DenounceService {
    constructor(@InjectModel('Denounce')  private readonly denounceModule: Model<Denounce>) {}

    async create(denounce: Denounce): Promise<Denounce> {
        const newDenounce = new this.denounceModule(denounce);
        return await newDenounce.save();
    }

    async findAll(): Promise<Denounce[]> {
        return await this.denounceModule.find().exec();
    }

    async findOne(id: string): Promise<Denounce> {
        //populate institute and career
        return await this.denounceModule.findById(id).populate('instituteId').populate('careerId').exec();
    }

    async delete(id: string): Promise<Denounce> {
        return await this.denounceModule.findByIdAndRemove(id).exec();
    }

    async update(id: string, denounce: Denounce): Promise<Denounce> {
        return await this.denounceModule.findByIdAndUpdate(id, denounce, { new: true }).exec();
    }

    async findBySchool(school: string): Promise<Denounce[]> {
        return await this.denounceModule.find({ school: school }).populate('instituteId').populate('careerId').exec();
    }

    async findBySchoolGrade(institute: string, grade: string): Promise<Denounce[]> {
        //find by institute.name and institute.schoolgrade populate institute and career
        return await this.denounceModule.find({ institute: institute, schoolgrade: grade }).populate('instituteId').populate('careerId').exec();
    }

    async findBySchoolGradeAndCareer(school: string, grade: string, career: string): Promise<Denounce[]> {
        return await this.denounceModule.find({ school: school, schoolgrade: grade, career: career }).exec();
    }

    async findBySchoolGradeAndCareerAndViolenceType(school: string, grade: string, career: string, violenceType: string): Promise<Denounce[]> {
        return await this.denounceModule.find({ school: school, schoolgrade: grade, career: career, violenceType: violenceType }).exec();
    }

    async findByViolenceType(violenceType: string): Promise<Denounce[]> {
        return await this.denounceModule.find({ violenceType: violenceType }).exec();
    }

    async countBySchoolGradeAndCareerAndViolenceType(school: string, grade: string, career: string, violenceType: string): Promise<number> {
        return await this.denounceModule.count({ school: school, schoolgrade: grade, career: career, violenceType: violenceType }).exec();
    }
    
}
