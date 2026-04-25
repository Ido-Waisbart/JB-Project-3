import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { vacationSlice } from "./VacationSlice";
import { userSlice } from "./UserSlice";

export const store = configureStore<AppState>({
    reducer: {
        vacationState: vacationSlice.reducer,  // Connect AppState vacations to our slice.
        userState: userSlice.reducer,  // Connect AppState user to our slice.
    }
});