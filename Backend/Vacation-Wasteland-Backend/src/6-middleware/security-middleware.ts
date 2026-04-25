import { NextFunction, Request, Response } from "express";
import striptags from "striptags";
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

        // If there was no auth attempt OR token not legal:
        if (authorization === undefined || !cyber.verifyToken(token)) {
            // Helpful for debugging: console.warn(request.url + ", " + JSON.stringify(request.headers) + ", " + authorization + ", " + token); // Note: JSON.stringify(request) is impossible, because request is not JSON-serializable.
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

    // Verify me:
    public verifyMe(request: Request, response: Response, next: NextFunction): void {
        // Extract token:
        const token = cyber.extractToken(request);

        // Get token user id:
        const tokenUserId = cyber.getTokenUserId(token);
        const routeId = +request.params.id;

        // If not the same:
        if (tokenUserId !== routeId) {
            next(new UnauthorizedError("You are not authorized."));
            return;
        }

        // All is good:
        next();
    }

    // Prevent XSS attack:
    public preventXss(request: Request, response: Response, next: NextFunction): void {
        // Run on body object:
        for (const prop in request.body) {
            const value = request.body[prop];
            if (typeof value === "string") {
                request.body[prop] = striptags(value); // <script>something</script> --> something
            }
        }

        next(); // Continue the request
    }
}

export const securityMiddleware = new SecurityMiddleware();
