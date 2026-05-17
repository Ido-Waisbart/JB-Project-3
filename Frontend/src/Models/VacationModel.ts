export class VacationModel {
    public id!: number;
    public destination!: string;
    public description?: string;
    public start_date!: Date;
    public end_date!: Date;
    public price_in_usd!: number;
    public image_url?: string;
    public image?: File;
}