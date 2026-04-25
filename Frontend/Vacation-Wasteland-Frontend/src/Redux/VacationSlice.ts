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

/*function setVacationSelected(currentState: VacationSliceType,
                         action: PayloadAction<{vacation: VacationModel, shouldBeSelected: boolean}>): VacationSliceType {
    const targetVacation: VacationModel = action.payload.vacation;
    const shouldBeSelected: boolean = action.payload.shouldBeSelected;
    let newState = {...currentState, selectedVacations: [...currentState.selectedVacations]};  // Deep-copy selected vacations.
    
    // Validate.
    
    // If the user wants to select the unselected 'btc':
    // isSelected = false
    // shouldBeSelected = true
    const isSelected = (newState.selectedVacations.find(vacation => vacation.id === targetVacation.id) !== undefined);
    if(isSelected === shouldBeSelected)
    {
        // Illogical - There must have been an error in the code.
        throw new Error(`setVacationSelected() implemented incorrectly. Tried to apply incorrect shouldBeSelected value: ${shouldBeSelected}, ${JSON.stringify(targetVacation)}, ${JSON.stringify(newState.selectedVacations)}`);
    }

    if(!shouldBeSelected && newState.selectedVacations.length === 0){
        // Illogical - There must have been an error in the code.
        throw new Error("setVacationSelected() implemented incorrectly. Too many unselected vacations.");
    }

    if(shouldBeSelected && newState.selectedVacations.length >= 6){
        // Illogical - There must have been an error in the code.
        throw new Error("setVacationSelected() implemented incorrectly. Too many selected vacations.");
    }



    // Execute.

    if (shouldBeSelected) {
        newState.selectedVacations.push(targetVacation);
    }
    else {
       newState.selectedVacations = newState.selectedVacations.filter(vacation => vacation.id !== targetVacation.id);
    }

    // Save to localStorage whenever selectedVacations changes
    saveSelectedVacationsToLocalStorage(newState.selectedVacations);

    return newState;  // Return the new state.
}

// Restore selected vacations from localStorage (can be called from any page)
function restoreSelectedVacations(currentState: VacationSliceType, _action: PayloadAction<void>): VacationSliceType {
    let newState = {...currentState};
    
    // Only restore if vacations are loaded
    if (newState.vacations.length > 0) {
        const storedSelectedVacations = loadSelectedVacationsFromLocalStorage();
        if (storedSelectedVacations.length > 0) {
            // Match stored vacation IDs with the actual vacations
            const matchedVacations = storedSelectedVacations
                .map(storedVacation => newState.vacations.find(vacation => vacation.id === storedVacation.id))
                .filter((vacation): vacation is VacationModel => vacation !== undefined);
            
            // Check if current selectedVacations matches stored vacations (by IDs)
            const currentIds = newState.selectedVacations.map(c => c.id).sort();
            const storedIds = matchedVacations.map(c => c.id).sort();
            const idsMatch = currentIds.length === storedIds.length && 
                           currentIds.every((id, index) => id === storedIds[index]);
            
            // Restore if we found matches and they don't match current state
            // Also restore if current state is empty but we have stored vacations
            if (matchedVacations.length > 0 && matchedVacations.length <= 6 && (!idsMatch || newState.selectedVacations.length === 0)) {
                newState.selectedVacations = matchedVacations;
                // Save the matched vacations back to localStorage to ensure data consistency
                saveSelectedVacationsToLocalStorage(matchedVacations);
            }
        }
    }
    
    return newState;
}

// Filter vacations reducer: Filters vacations based on search string
// This belongs in Redux as it manages state that multiple components need to access
function filterVacations(currentState: VacationSliceType, action: PayloadAction<string>): VacationSliceType {
    const filter = action.payload;
    let newState = {...currentState};
    newState.filteredVacations = newState.vacations.filter(vacation => {
        return vacation.name?.toLowerCase().includes(filter) || vacation.symbol?.toLowerCase().includes(filter);
    });  //  Filter the vacations.
    return newState;  // Return the new state.
}*/

export type VacationSliceType = {
    vacations: VacationModel[];
    // selectedVacations: VacationModel[];
    // filteredVacations: VacationModel[];
};

export const vacationSlice = createSlice({
    name: "vacation-slice",
    initialState: {
        vacations: [] as VacationModel[],
        selectedVacations: [] as VacationModel[],
        filteredVacations: [] as VacationModel[],
    } as VacationSliceType,
    // reducers: {initVacations, filterVacations, setVacationSelected, restoreSelectedVacations},
    reducers: {initVacations,},
});