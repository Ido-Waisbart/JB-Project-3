import { ValidationError } from "./client-errors";

export class UserModel {
    public id!: number;

    public constructor(user: UserModel) {
        this.id = user.id;
    }

    // joi schema - specify what is legal for each field:
    /*private static schema = joi.object({
        id: joi.number().optional().positive().integer(),
    });

    // Validate this product against the schema:
    public validate(): void {
        const result = UserModel.schema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }*/
}