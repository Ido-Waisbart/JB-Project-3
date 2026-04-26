// TODO: Cleanup

import joi from "joi";
import { UploadedFile } from "express-fileupload";
import { ValidationError } from "./client-errors";

export class VacationModel {
    public id!: number;
    public destination!: string;
    // public description: string;
    // public description!: string;
    public description?: string;
    public start_date!: Date;
    public end_date!: Date;
    public price_in_usd!: number;
    // public image_uri: string;
    // public image_uri!: string;
    public image: UploadedFile;  // Not in the database.
    public image_url?: string;  // Not in the database.
    public image_uri?: string;  // Identifier/name. F.E., athens.jpg.

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price_in_usd = vacation.price_in_usd;
        this.image = vacation.image;
        this.image_uri = vacation.image_uri;
        this.image_url = vacation.image_url;
    }

    // joi schema - specify what is legal for each field:
    private static schema = joi.object({
        id: joi.number().optional().positive().integer(),
        destination: joi.string().required().min(2).max(100),
        description: joi.string().required().min(2).max(1000),
        start_date: joi.date().required(),
        end_date: joi.date().required(),
        price_in_usd: joi.number().required().min(0).max(10000),
        image: joi.object().optional(),
        image_url: joi.string().optional().max(255),
        image_uri: joi.string().optional().max(50)
    });

    // Validate this product against the schema:
    public validate(): void {
        const result = VacationModel.schema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}