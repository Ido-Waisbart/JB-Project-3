import joi from "joi";
import { ValidationError } from "./client-errors";

export class LikeModel {

    public user_id!: number;
    public vacation_id!: number;

    public constructor(like: LikeModel) {
        this.user_id = like.user_id;
        this.vacation_id = like.vacation_id;
    }

    private static schema = joi.object({
        user_id: joi.number().optional().positive().integer(),
        vacation_id: joi.number().optional().positive().integer(),
    });

    public validate(): void {
        const result = LikeModel.schema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}