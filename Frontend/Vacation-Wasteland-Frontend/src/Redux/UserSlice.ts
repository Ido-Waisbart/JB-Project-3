import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Register/login reducer: 
function initUser(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const newState = action.payload;
    return newState;
}

// Logout reducer: 
function logoutUser(_currentState: UserModel, _action: Action): UserModel {
    return null!;
}

export const userSlice = createSlice({
    name: "user-slice",
    initialState: null! as UserModel,
    reducers: { initUser, logoutUser }
});

