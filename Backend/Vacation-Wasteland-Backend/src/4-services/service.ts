import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";

class Service {
    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = "select * from vacations";
        const vacation = await dal.execute(sql) as VacationModel[];
        return vacation;
    }
}

export const service = new Service();
