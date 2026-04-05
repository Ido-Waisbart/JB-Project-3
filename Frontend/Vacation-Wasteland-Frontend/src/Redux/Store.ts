import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { vacationSlice } from "./VacationSlice";

export const store = configureStore<AppState>({
    reducer: {
        vacationState: vacationSlice.reducer,  // Connect AppState coins and filter to our slice.
    }
});