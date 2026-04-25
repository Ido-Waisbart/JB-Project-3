class AppConfig {
    public readonly environment = import.meta.env.MODE; // development / production
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";

    private readonly serverUrl = "http://localhost:4000/api";
    // private readonly host = this.isDevelopment ? "http://localhost:4000/api" : "https://www.customdomain.com";
    
    public readonly chatGptCompletionApiUrl = "https://api.openai.com/v1/chat/completions";

    // Server routes: 
	public readonly vacationsApiUrl = `${this.serverUrl}/vacations/`;
    public readonly usersApiUrl = `${this.serverUrl}/users/`;
    public readonly registerApiUrl = `${this.serverUrl}/register/`;
    public readonly loginApiUrl = `${this.serverUrl}/login/`;
}

export const appConfig = new AppConfig(); // Singleton
