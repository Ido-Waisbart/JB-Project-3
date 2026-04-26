// Taken from project 2.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveSelectedVacationsToLocalStorage, loadSelectedVacationsFromLocalStorage } from "../Utils/LocalStorage";
import { VacationModel } from "../Models/VacationModel";

// Init vacations reducer: (Takes an entire vacation array, and sets it to the Redux state.)
function initVacations(currentState: VacationSliceType, action: PayloadAction<VacationModel[]>): VacationSliceType {
    const newVacations = action.payload;  // Get the new vacations.
    let newState = {...currentState, vacations: [...newVacations]};
    
    // Initialize filteredVacations to match vacations if no filter has been applied yet
    // (filteredVacations.length === 0 means no filter has been set)
    /*if (newState.filteredVacations.length === 0) {
        newState.filteredVacations = [...newVacations];
    }*/
    
    // Restore selected vacations from localStorage if they exist and match current vacations
    if (newState.vacations.length === 0) {
        const storedSelectedVacations = loadSelectedVacationsFromLocalStorage();
        if (storedSelectedVacations.length > 0) {
            // Match stored vacation IDs with the actual vacations
            const matchedVacations = storedSelectedVacations
                .map(storedVacation => newVacations.find(vacation => vacation.id === storedVacation.id))
                .filter((vacation): vacation is VacationModel => vacation !== undefined);
            
            // Only restore if we found matches (max 6 vacations)
            if (matchedVacations.length > 0 && matchedVacations.length <= 6) {
                newState.vacations = matchedVacations;
                // Save the matched vacations back to localStorage to ensure data consistency
                saveSelectedVacationsToLocalStorage(matchedVacations);
            }
        }
    }
    
    return newState;  // Return the new state.
}

// Add vacation reducer: 
function addVacation(currentState: VacationSliceType, action: PayloadAction<VacationModel>): VacationSliceType {
    const vacationToAdd = action.payload; // Get the vacation to add.
    const newState = {vacations: [...currentState.vacations]}; // Duplicating currentState.
    newState.vacations.push(vacationToAdd); // Add the vacation.
    return newState; // Return the new state.
}

// Update vacation reducer: 
function updateVacation(currentState: VacationSliceType, action: PayloadAction<VacationModel>): VacationSliceType {
    const vacationToUpdate = action.payload; // Get the vacation to update.
    const newState = {vacations: [...currentState.vacations]}; // Duplicating currentState.
    const index = newState.vacations.findIndex(p => p.id === vacationToUpdate.id); // Find index to update (-1 if not found)
    if (index >= 0) {
        newState.vacations[index] = vacationToUpdate; // Update.
    }
    return newState; // Return the new state.
}

// Delete vacation reducer: 
function deleteVacation(currentState: VacationSliceType, action: PayloadAction<number>): VacationSliceType {
    const idToDelete = action.payload; // Get the vacation id to delete.
    const newState = {vacations: [...currentState.vacations]}; // Duplicating currentState.
    const index = newState.vacations.findIndex(p => p.id === idToDelete); // Find index to delete (-1 if not found).
    if (index >= 0) {
        newState.vacations.splice(index, 1); // Delete from index one item.
    }
    return newState; // Return the new state.
}

export type VacationSliceType = {
    vacations: VacationModel[];
};

export const vacationSlice = createSlice({
    name: "vacation-slice",
    initialState: {
        vacations: [] as VacationModel[],
    } as VacationSliceType,
    reducers: {initVacations, addVacation, updateVacation, deleteVacation},
});