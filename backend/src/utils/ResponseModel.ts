export interface ResponseModel<T = {}> {
    success?: boolean;
    message?: string;
    data?: T;
    error?: Error;
    StatusCode?: number;
}