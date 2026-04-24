import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { appConfig } from "./app-config";
import { Role } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";

class Cyber {

    public generateToken(user: UserModel): string {

        // Create payload: 
        const payload = { user };

        // Create options: 
        const options: SignOptions = { expiresIn: "3h" };

        // Generate token: 
        const token = jwt.sign(payload, appConfig.jwtSecret, options);

        // Return token: 
        return token;
    }

    // Verify legal token:
    public verifyToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            return true;
        }
        catch {
            return false;
        }
    }

    // Verify admin:
    public verifyAdmin(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            const payload = jwt.decode(token) as { user: UserModel };
            const user = payload.user;
            return user.role === Role.Admin;
        }
        catch {
            return false;
        }
    }

}

export const cyber = new Cyber();
