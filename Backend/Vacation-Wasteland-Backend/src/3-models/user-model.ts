import { Role } from "./enums";
import joi from "joi";
import { ValidationError } from "./client-errors";
import { passwordStrength } from "../2-utils/password";

export class UserModel {

    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    // public password_hash: string;
    public role!: Role;
    // public captchaToken: string;  // TODO: Is this needed?

    public constructor(user: UserModel) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        // this.captchaToken = user.captchaToken;
    }

    private static schema = joi.object({
        id: joi.number().optional().positive().integer(),
        first_name: joi.string().required().min(2).max(30),
        last_name: joi.string().required().min(2).max(30),
        email: joi.string().email(),
        password: joi.string().required().min(2).max(30).custom(value => {
            if(!passwordStrength.isStrong(value))
                throw new ValidationError("Weak password...");
        }),
        role: joi.number().optional(),
        // captchaToken: joi.string().required().min(100).max(5000)
    });

    public validate(): void {
        const result = UserModel.schema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}