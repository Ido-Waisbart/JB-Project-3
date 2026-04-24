import { dal } from "../2-utils/dal";
import { UserModel } from "../3-models/user-model";

class UserService {
  public async getAllUsers(): Promise<UserModel[] | undefined> {
    const sql = "select * from users";

    console.log("Executing SQL: " + sql);
    let vacations;
    try {
      vacations = (await dal.execute(sql)) as UserModel[];
    } catch (error: any) {
      console.error("DB/SQL error:", error);
      throw error; // The controller has to handle this error, not the service.
    }
    console.log("Finished executing SQL: " + sql);
    return vacations;
  }
}

export const user_service = new UserService();
