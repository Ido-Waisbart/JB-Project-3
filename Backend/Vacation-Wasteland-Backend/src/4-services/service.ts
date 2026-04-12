import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";

class Service {
  public async getAllVacations(): Promise<VacationModel[] | undefined> {
    // let v: VacationModel = {id: 1, destination: "wah", description: "hoo", start_date: new Date(), end_date: new Date(), price_in_usd: 69};
    // return [v];

    const sql = "select * from vacations";
    // console.log("Executing SQL: " + sql);
    let vacations;
    try {
      vacations = (await dal.execute(sql)) as VacationModel[];
    } catch (error: any) {
      console.error("DB/SQL error:", error);
      // return undefined; // TODO: Return error of some sort?
      throw error;  // The controller has to handle this error, not the service.
    }
    console.log("Finished executing SQL.");
    return vacations;
  }
}

export const service = new Service();
