import axios from "axios";
import { appConfig, } from "../Utils/AppConfig";
import { VacationModel, } from "../Models/VacationModel";
import { vacationSlice } from "../Redux/VacationSlice";
import { store } from "../Redux/Store";
import { validateAxios } from "../Utils/ValidateAxios";
import { DateUtils } from "../Utils/DateUtils";


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

    // Add vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Convert vacation to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination!);
        myFormData.append("description", vacation.description!);
        myFormData.append("start_date", DateUtils.toMySQLDateLocal(vacation.start_date));
        myFormData.append("end_date", DateUtils.toMySQLDateLocal(vacation.end_date));
        myFormData.append("price_in_usd", vacation.price_in_usd?.toString()!);
        myFormData.append("image", vacation.image!);

        // Send vacation to backend:
        const response = await axios.post<VacationModel>(appConfig.vacationsApiUrl, myFormData);

        // Extract added vacation: 
        const dbVacation = response.data;

        // Send dbVacation to global state only if global state contains vacations:
        if (store.getState().vacationState.vacations.length > 0) {
            const action = vacationSlice.actions.addVacation(dbVacation); // { type: "vacation-slice/addVacation", payload: dbVacation }
            store.dispatch(action);
        }
    }

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Convert vacation to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination!);
        myFormData.append("description", vacation.description!);
        myFormData.append("start_date", DateUtils.toMySQLDateLocal(vacation.start_date));
        myFormData.append("end_date", DateUtils.toMySQLDateLocal(vacation.end_date));
        myFormData.append("price_in_usd", vacation.price_in_usd?.toString()!);
        myFormData.append("image", vacation.image!);

        // Send vacation to backend: 
        const response = await axios.put<VacationModel>(appConfig.vacationsApiUrl + vacation.id, myFormData);

        // Extract updated vacation: 
        const dbVacation = response.data;

        // Update vacation in global state:
        const action = vacationSlice.actions.updateVacation(dbVacation); // { type: "vacation-slice/updateVacation", payload: dbVacation }
        store.dispatch(action);
    }

    // Delete vacation from backend: 
    public async deleteVacation(id: number): Promise<void> {

        // Delete vacation from backend:
        await axios.delete(appConfig.vacationsApiUrl + id);

        // Delete this vacation from global state: 
        const action = vacationSlice.actions.deleteVacation(id); // { type: "vacation-slice/deleteVacation", payload: id }
        store.dispatch(action);
    }
}

export const vacationService = new VacationService();
