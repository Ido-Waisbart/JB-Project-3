import axios, { InternalAxiosRequestConfig } from "axios";

class Interceptor {

    public create(): void {

        // Before each request: 
        axios.interceptors.request.use((httpRequest: InternalAxiosRequestConfig) => {

            // Take token: 
            const token = localStorage.getItem("token");

            // Send in header: 
            if(token) {
                httpRequest.headers.set("Authorization", `Bearer ${token}`);
                // httpRequest.headers.Authorization = "Bearer " + token;
            }
            else{
                console.warn("Warning: Axios' JWT Token was not found in the local storage.");
            }

            // Return:
            return httpRequest;

        });
    }
}

export const interceptor = new Interceptor();
