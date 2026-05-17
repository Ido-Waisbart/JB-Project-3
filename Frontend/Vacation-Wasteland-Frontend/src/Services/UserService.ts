import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { UserModel } from "../Models/UserModel";
import { userSlice } from "../Redux/UserSlice";
import { CredentialsModel } from "../Models/CredentialsModel";

class UserService {
    // Restore user from storage if exist:
    public constructor() {
        // Load token from storage:
        const token = localStorage.getItem("token");

        // If exists:
        if (token) {
            // Restore user if token is valid and not expired:
            // Extract user:
            const container = jwtDecode<{ user: UserModel; exp: number }>(token);

            // JWT exp is in seconds
            const expired = container.exp * 1000 < Date.now();

            if (expired) {
                console.log("Detected JWT token expiration. Removing from localStorage...");
                localStorage.removeItem("token");
                return;
            }

            const dbUser = container.user;

            // Save to global state:
            const action = userSlice.actions.initUser(dbUser);
            store.dispatch(action);
        }
    }

    // Register as a new user:
    public async register(user: UserModel): Promise<void> {
        // Send user to backend:
        const response = await axios.post<string>(appConfig.registerApiUrl, user);

        // Get back token:
        const token = response.data;
        localStorage.setItem("token", token);

        // Extract user:
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;

        // Save to global state:
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    // Login as existing user:
    public async login(credentials: CredentialsModel): Promise<void> {
        // Send credentials to backend:
        const response = await axios.post<string>(appConfig.loginApiUrl, credentials);

        // Get back token:
        const token = response.data;
        localStorage.setItem("token", token);

        // Extract user:
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;

        // Save to global state:
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    // Logout:
    public logout(): void {
        // Delete from storage:
        localStorage.removeItem("token");

        // Save to global state:
        const action = userSlice.actions.logoutUser();
        store.dispatch(action);
    }

    // Get user details:
    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersApiUrl + id);
        const user = response.data;
        return user;
    }
}

export const userService = new UserService();
