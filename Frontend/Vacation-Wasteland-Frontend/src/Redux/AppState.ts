//  Models based on the APIs.
//  See AppConfig.ts for elaboration.

import { UserModel } from "../Models/UserModel";
import { VacationSliceType } from "./VacationSlice";

export type AppState = {
    vacationState: VacationSliceType;
    userState: UserModel;
};