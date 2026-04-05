import { NextFunction, Request, Response } from "express";
declare class ErrorMiddleware {
    catchAll(err: any, request: Request, response: Response, next: NextFunction): void;
    routeNotFound(request: Request, response: Response, next: NextFunction): void;
}
export declare const errorMiddleware: ErrorMiddleware;
export {};
