import { Model, Document } from "mongoose";
import { PaginatedRespond } from './paginated-respond.interface';

export interface MongoModel<T extends Document> extends Model<T> {

    paginate(query: object, options: PaginateOptions): Promise<PaginatedRespond<T>>;

    aggregatePaginate(query: any, options: PaginateOptions): Promise<PaginatedRespond<T>>;

}

interface PaginateOptions {
    select?: object | string;
    collation?: object;
    sort?: object | string;
    populate?: Array<any> | object | string;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;
    customLabels?: object;
    pagination?: boolean;
    forceCountFn?: boolean;
    read?: object;
}