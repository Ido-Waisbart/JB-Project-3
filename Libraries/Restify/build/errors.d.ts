import { StatusCode } from "./enums";
declare abstract class ClientError {
    status: StatusCode;
    message: string;
    constructor(status: StatusCode, message: string);
}
export declare class RouteNotFoundError extends ClientError {
    constructor(route: string, method: string);
}
export declare class ResourceNotFoundError extends ClientError {
    constructor(id: number | string);
}
export declare class ValidationError extends ClientError {
    constructor(message: string);
}
export declare class UnauthorizedError extends ClientError {
    constructor(message: string);
}
export {};
