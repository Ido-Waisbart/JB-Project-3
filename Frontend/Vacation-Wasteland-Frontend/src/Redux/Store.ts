import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { vacationSlice } from "./VacationSlice";
import { userSlice } from "./UserSlice";
import { likeSlice } from "./LikeSlice";

const appReducer = combineReducers({
    vacationState: vacationSlice.reducer,  // Connect AppState vacations to our slice.
    userState: userSlice.reducer,  // Connect AppState user to our slice.
    likeState: likeSlice.reducer,  // Connect AppState likes to our slice.
});

export const rootReducer = (state: any, action: any) => {
    if (action.type === userSlice.actions.logoutUser.type) {
        state = undefined; // 👈 resets entire Redux store
    }

    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;