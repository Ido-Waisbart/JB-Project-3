import axios from "axios";
import { appConfig, } from "../Utils/AppConfig";
import { LikeModel, } from "../Models/LikeModel";
import { likeSlice } from "../Redux/LikeSlice";
import { store } from "../Redux/Store";
import { validateAxios } from "../Utils/ValidateAxios";


class LikeService {
    private loadingLikesPromise: Promise<LikeModel[]> | null = null;

    public async getAllLikes(): Promise<LikeModel[]> {
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
                const response = await axios.get<LikeModel[]>(appConfig.likesApiUrl);
                const likes = response.data;

                const action = likeSlice.actions.initLikes(likes);
                store.dispatch(action);

                this.loadingLikesPromise = null; // Clear the promise after success
                return likes;
            }
            catch (error: any) {
                this.loadingLikesPromise = null; // Clear the promise after error
                validateAxios(error);
                throw error;
            }
        })();

        return this.loadingLikesPromise;
    }
}

export const likeService = new LikeService();
