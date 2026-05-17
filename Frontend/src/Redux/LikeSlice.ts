// Taken from project 2.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveSelectedLikesToLocalStorage, loadSelectedLikesFromLocalStorage } from "../Utils/LocalStorage";
import { LikeModel } from "../Models/LikeModel";

// Init likes reducer: (Takes an entire like array, and sets it to the Redux state.)
function initLikes(currentState: LikeSliceType, action: PayloadAction<LikeModel[]>): LikeSliceType {
    const newLikes = action.payload;  // Get the new likes.
    let newState = {...currentState, likes: [...newLikes]};
    
    // Restore selected likes from localStorage if they exist and match current likes
    if (newState.likes.length === 0) {
        const storedSelectedLikes = loadSelectedLikesFromLocalStorage();
        if (storedSelectedLikes.length > 0) {
            // Match stored like IDs with the actual likes
            const matchedLikes = storedSelectedLikes
                .map(storedLike => newLikes.find(like => like.user_id === storedLike.user_id && like.vacation_id === storedLike.vacation_id))
                .filter((like): like is LikeModel => like !== undefined);
            
            // Only restore if we found matches (max 6 likes)
            if (matchedLikes.length > 0 && matchedLikes.length <= 6) {
                newState.likes = matchedLikes;
                // Save the matched likes back to localStorage to ensure data consistency
                saveSelectedLikesToLocalStorage(matchedLikes);
            }
        }
    }
    
    return newState;  // Return the new state.
}

// Add like reducer: 
function addLike(currentState: LikeSliceType, action: PayloadAction<LikeModel>): LikeSliceType {
    const likeToAdd = action.payload; // Get the like to add.
    const newState = {likes: [...currentState.likes]}; // Duplicating currentState.
    newState.likes.push(likeToAdd); // Add the like.
    return newState; // Return the new state.
}

// Update like reducer: 
/*function updateLike(currentState: LikeSliceType, action: PayloadAction<LikeModel>): LikeSliceType {
    const likeToUpdate = action.payload; // Get the like to update.
    const newState = [...currentState]; // Duplicating currentState.
    const index = newState.findIndex(p => p.id === likeToUpdate.id); // Find index to update (-1 if not found)
    if (index >= 0) {
        newState[index] = likeToUpdate; // Update.
    }
    return newState; // Return the new state.
}*/

// Delete like reducer: 
function deleteLike(currentState: LikeSliceType, action: PayloadAction<LikeModel>): LikeSliceType {
    const user_id = action.payload.user_id; // Get the like ids to delete.
    const vacation_id = action.payload.vacation_id; // Get the like ids to delete.
    const newState = {likes: [...currentState.likes]}; // Duplicating currentState.
    const index = newState.likes.findIndex(like => like.user_id === user_id && like.vacation_id === vacation_id); // Find index to delete (-1 if not found).
    if (index >= 0) {
        newState.likes.splice(index, 1); // Delete from index one item.
    }
    return newState; // Return the new state.
}

export type LikeSliceType = {
    likes: LikeModel[];
};

export const likeSlice = createSlice({
    name: "like-slice",
    initialState: {
        likes: [] as LikeModel[],
    } as LikeSliceType,
    reducers: {initLikes, addLike, deleteLike,},
});