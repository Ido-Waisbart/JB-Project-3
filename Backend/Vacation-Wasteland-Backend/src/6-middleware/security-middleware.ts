import { NextFunction, Request, Response } from "express";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

class SecurityMiddleware {

    // Verify legal token:
    public verifyToken(request: Request, response: Response, next: NextFunction): void {

        // Extract token: 
        // Authorization: Bearer the-token...
        //                       -->
        //                01234567
        const authorization = request.headers.authorization;
        const token = authorization?.substring(7)!;

        // If token not legal:
        if (!cyber.verifyToken(token)) {
            next(new UnauthorizedError("You are not logged-in."));
            return;
        }

        // All is good: 
        next();
    }

    // Verify admin:
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {

        // Extract token: 
        // Authorization: Bearer the-token...
        //                       -->
        //                01234567
        const authorization = request.headers.authorization;
        const token = authorization?.substring(7)!;

        // If user is not admin:
        if (!cyber.verifyAdmin(token)) {
            next(new UnauthorizedError("You are not authorized."));
            return;
        }

        // All is good: 
        next();
    }


}

export const securityMiddleware = new SecurityMiddleware();
