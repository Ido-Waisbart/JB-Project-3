// Taken from project 2.
import { VacationModel } from "../Models/VacationModel";
import { notify } from "./Notify";

const SELECTED_VACATIONS_STORAGE_KEY = "selectedVacations";

export function saveSelectedVacationsToLocalStorage(vacations: VacationModel[]): void {
    try {
        // Only save essential data (id, symbol, name) to minimize storage
        const vacationsToSave = vacations.map(vacation => ({
            id: vacation.id,
            destination: vacation.destination,
            description: vacation.description,
            start_date: vacation.start_date,
            end_date: vacation.end_date,
            price_in_usd: vacation.price_in_usd,
            // image_uri: vacation.image_uri,  // TODO: ???
            image_uri: vacation.image_url,
            // symbol: vacation.symbol,
            // name: vacation.name,
            // image: vacation.image
        }));
        localStorage.setItem(SELECTED_VACATIONS_STORAGE_KEY, JSON.stringify(vacationsToSave));
    }
    catch (error) {
        // TODO: Discern which kind of .error() I'd like to use.
        // notify.error("Storage Error", "Failed to save selected vacations. Your selections may not persist after refresh.");
        // notify.error(error);
        notify.error("Storage Error - Failed to save selected vacations. Your selections may not persist after refresh.");
    }
}

export function loadSelectedVacationsFromLocalStorage(): VacationModel[] {
    try {
        const stored = localStorage.getItem(SELECTED_VACATIONS_STORAGE_KEY);
        if (!stored) {
            return [];
        }
        const parsed = JSON.parse(stored) as VacationModel[];
        return Array.isArray(parsed) ? parsed : [];
    }
    catch (error) {
        // notify.error("Storage Error", "Failed to load saved vacation selections.");
        notify.error("Storage Error - Failed to load saved vacation selections.");
        return [];
    }
}
