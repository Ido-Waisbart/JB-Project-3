import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Register/login reducer: 
function initUser(_currentState: UserState, action: PayloadAction<UserModel>): UserState {
    const newState = action.payload;
    return newState;
}

// Logout reducer: 
function logoutUser(_currentState: UserState, _action: Action): UserState {
    return null;
}

export type UserState = UserModel | null;
export const userSlice = createSlice({
    name: "user-slice",
    initialState: null as UserState,
    reducers: { initUser, logoutUser }
});

