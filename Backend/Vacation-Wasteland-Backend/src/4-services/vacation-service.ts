import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";

class VacationService {
  public async getAllVacations(): Promise<VacationModel[] | undefined> {
    // Debug data:
    // let v: VacationModel = {id: 1, destination: "Somewhere in Nevada", description: "USA", start_date: new Date(), end_date: new Date(), price_in_usd: 799};
    // return [v];

    const sql = "select *, concat(?, image_uri) as image_url from vacations";
    const values = [appConfig.imagesLocation];

    console.log("Executing SQL: `" + sql + "` with values: " + values);
    let vacations;
    try {
      vacations = (await dal.execute(sql, values)) as VacationModel[];
    } catch (error: any) {
      console.error("DB/SQL error:", error);
      throw error; // The controller has to handle this error, not the service.
    }
    console.log("Finished executing SQL: " + sql);
    return vacations;
  }

  // Get image name from db.
  // Used only within this file, vacation-service.ts.
  private async getImageName(id: number): Promise<string | null> {
    const sql = "select image_uri from products where id = ?";
    const values = [id];
    const vacations = (await dal.execute(sql, values)) as VacationModel[];
    const vacation = vacations[0];
    if (!vacation) return null;
    return vacation.image_uri!;
  }
}

export const vacation_service = new VacationService();
