//  Models based on the APIs.
//  See AppConfig.ts for elaboration.

// import { UserModel } from "../Models/UserModel";
import { RootState } from "./Store";
// import { VacationSliceType } from "./VacationSlice";

// export type AppState = {
//     vacationState: VacationSliceType;
//     userState: UserModel;
// };
export type AppState = RootState;  // An alternative way of declaring the type of the global state, based on the reducer fed to the store. Suggested by ChatGPT.