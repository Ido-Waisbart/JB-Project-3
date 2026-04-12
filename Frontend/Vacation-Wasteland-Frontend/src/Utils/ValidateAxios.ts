import axios from "axios";
import { notify } from "./Notify";

const statusTooManyRequests = 429;

// Track recent notifications to prevent duplicates within a short time window
const recentNotifications = new Map<string, number>();
const NOTIFICATION_COOLDOWN_MS = 3000; // 3 seconds cooldown for same error type

function shouldShowNotification(errorKey: string): boolean {
    const now = Date.now();
    const lastShown = recentNotifications.get(errorKey);

    if (lastShown === undefined || (now - lastShown) > NOTIFICATION_COOLDOWN_MS) {
        recentNotifications.set(errorKey, now);
        return true;
    }

    return false;
}

export function validateAxios(error: any) {
    if (axios.isAxiosError(error)) {

        // Axios error (HTTP error, network error, etc.)
        if (error.response) {
            // Server responded with a status outside 2xx

            // serverMessage was proposed by ChatGPT, to make sure the error details are not omitted as I've noticed.
            // Likely only works for proper axios errors with responses.
            const serverMessage =
                error.response.data?.details ||
                error.response.data?.message ||
                JSON.stringify(error.response.data);

            if (error.response.status === statusTooManyRequests) {
                const errorKey = 'rate-limit-429';
                if (shouldShowNotification(errorKey)) {
                    notify.warn('Too many requests. Consider retrying after a delay.');
                }
            }
            else {
                const errorKey = `http-error-${error.response.status}`;
                if (shouldShowNotification(errorKey)) {
                    // console.log(JSON.stringify(error.toJSON()));  // Axios’ toJSON() intentionally strips out response.data and custom payloads.
                    // console.log(serverMessage);  // Works. May be useful for debugging.
                    notify.error('HTTP error: ' + error.response.status.toString() + " - " + error.response.statusText + ". " + serverMessage);
                }
            }
        } else if (error.request) {
            // Request was made but no response received
            const errorKey = 'cors-network-error';
            if (shouldShowNotification(errorKey)) {
                notify.error('CORS or network error: browser blocked the response. Possibly rate-limited.');  // "You cannot reliably get the 429 status, because the browser blocks it. But you can detect that a request failed and no response is available."
            }
        } else {
            // Something happened setting up the request
            const errorKey = `axios-setup-${error.message || 'unknown'}`;
            if (shouldShowNotification(errorKey)) {
                // notify.error('Axios setup error:', error.message);
                notify.error('Axios setup error: ' + error.message);
            }
        }
    } else {
        // Non-Axios error
        const errorKey = `unexpected-error-${String(error)}`;
        if (shouldShowNotification(errorKey)) {
            // notify.error('Unexpected error:', error);
            notify.error('Unexpected error:' + error);
        }
    }
}