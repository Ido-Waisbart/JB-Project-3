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

export type LikeSliceType = {
    likes: LikeModel[];
};

export const likeSlice = createSlice({
    name: "like-slice",
    initialState: {
        likes: [] as LikeModel[],
        selectedLikes: [] as LikeModel[],
        filteredLikes: [] as LikeModel[],
    } as LikeSliceType,
    reducers: {initLikes,},
});