import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { LikeModel } from "../Models/LikeModel";
import { likeSlice } from "../Redux/LikeSlice";
import { store } from "../Redux/Store";
import { validateAxios } from "../Utils/ValidateAxios";

class LikeService {
    private loadingLikesPromise: Promise<LikeModel[]> | null = null;

    public async getAllLikes(signal?: AbortSignal): Promise<LikeModel[]> {
        // Check if likes are already loaded in Redux
        const currentState = store.getState();
        if (currentState.likeState.likes.length > 0) {
            return currentState.likeState.likes;
        }

        // If already loading, return the existing promise to prevent duplicate calls
        if (this.loadingLikesPromise) {
            return this.loadingLikesPromise;
        }

        // Create a new loading promise
        this.loadingLikesPromise = (async () => {
            try {
                // Access backend, which accesses MySQL database:
                const response = await axios.get<LikeModel[]>(appConfig.likesApiUrl, { signal });
                const likes = response.data;

                const action = likeSlice.actions.initLikes(likes);
                store.dispatch(action);

                this.loadingLikesPromise = null; // Clear the promise after success
                return likes;
            } catch (error: any) {
                this.loadingLikesPromise = null; // Clear the promise after error
                validateAxios(error);
                throw error;
            }
        })();

        return this.loadingLikesPromise;
    }

    // Add like:
    public async addLike(like: LikeModel): Promise<void> {
        // Send like to backend:
        const response = await axios.post<LikeModel>(appConfig.likesApiUrl, {
            user_id: like.user_id,
            vacation_id: like.vacation_id,
        });

        // Extract added like:
        const dbLike = response.data;

        // Send dbLike to global state only if global state contains likes:
        if (store.getState().likeState.likes.length > 0) {
            const action = likeSlice.actions.addLike(dbLike); // { type: "like-slice/addLike", payload: dbLike }
            store.dispatch(action);
        }
    }

    // Update like:
    /*public async updateLike(like: LikeModel): Promise<void> {

        // Convert like to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("name", like.name!);
        myFormData.append("price", like.price?.toString()!);
        myFormData.append("stock", like.stock?.toString()!);
        myFormData.append("image", like.image!);

        // Send like to backend: 
        const response = await axios.put<LikeModel>(appConfig.likesUrl + like.id, myFormData);

        // Extract updated like: 
        const dbLike = response.data;

        // Update like in global state:
        const action = likeSlice.actions.updateLike(dbLike); // { type: "like-slice/updateLike", payload: dbLike }
        store.dispatch(action);
    }*/

    // Delete like from backend:
    public async deleteLike(like: LikeModel): Promise<void> {
        // Delete like from backend:
        await axios.delete(appConfig.likesApiUrl + like.user_id + "/" + like.vacation_id); // Problem?

        // Delete this like from global state:
        const action = likeSlice.actions.deleteLike(like); // { type: "like-slice/deleteLike", payload: id }
        store.dispatch(action);
    }
}

export const likeService = new LikeService();
