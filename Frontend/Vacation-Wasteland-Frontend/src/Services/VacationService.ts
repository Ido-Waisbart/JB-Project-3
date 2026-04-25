import axios from "axios";
import { appConfig, } from "../Utils/AppConfig";
import { VacationModel, } from "../Models/VacationModel";
import { vacationSlice } from "../Redux/VacationSlice";
import { store } from "../Redux/Store";
import { validateAxios } from "../Utils/ValidateAxios";


class VacationService {
    private loadingVacationsPromise: Promise<VacationModel[]> | null = null;

    public async getAllVacations(): Promise<VacationModel[]> {
        // Check if vacations are already loaded in Redux
        const currentState = store.getState();
        if (currentState.vacationState.vacations.length > 0) {
            return currentState.vacationState.vacations;
        }

        // If already loading, return the existing promise to prevent duplicate calls
        if (this.loadingVacationsPromise) {
            return this.loadingVacationsPromise;
        }

        // Create a new loading promise
        this.loadingVacationsPromise = (async () => {
            try {
                // Access backend, which accesses MySQL database:
                const response = await axios.get<VacationModel[]>(appConfig.vacationsApiUrl);
                const vacations = response.data;

                const action = vacationSlice.actions.initVacations(vacations);
                store.dispatch(action);

                this.loadingVacationsPromise = null; // Clear the promise after success
                return vacations;
            }
            catch (error: any) {
                this.loadingVacationsPromise = null; // Clear the promise after error
                validateAxios(error);
                // return [];  // Not good - The Home page cannot do setError().
                throw error;
            }
        })();

        return this.loadingVacationsPromise;
    }
}

export const vacationService = new VacationService();
