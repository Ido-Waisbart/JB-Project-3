// From the backend. TODO: Move elsewhere. Shared folder for both frontend and backend?
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
    public image_uri?: string;

    /*public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price_in_usd = vacation.price_in_usd;
        this.image_uri = vacation.image_uri;
    }*/
}