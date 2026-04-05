//  Models based on the APIs.
//  See AppConfig.ts for elaboration.

import { VacationSliceType } from "./VacationSlice";

export type AppState = {
    vacationState: VacationSliceType;
};