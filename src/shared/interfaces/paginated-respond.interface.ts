export interface PaginatedRespond<T> {
    data: Array<T>;
    count: number;
    limit: number;
    page: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean
}