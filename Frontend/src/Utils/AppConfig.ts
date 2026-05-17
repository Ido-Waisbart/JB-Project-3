class AppConfig {
    public readonly environment = import.meta.env.MODE; // development / production
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";

    private readonly serverUrl = "http://localhost:4000/api";
    // private readonly host = this.isDevelopment ? "http://localhost:4000/api" : "https://www.customdomain.com";

    // Server routes:
    public readonly vacationsApiUrl = `${this.serverUrl}/vacations/`;
    public readonly usersApiUrl = `${this.serverUrl}/users/`;
    public readonly likesApiUrl = `${this.serverUrl}/likes/`;
    public readonly registerApiUrl = `${this.serverUrl}/register/`;
    public readonly loginApiUrl = `${this.serverUrl}/login/`;

    // GPT:
    // Access to database: https://mobile-overlabor-clergyman.ngrok-free.dev/api/vacations
    // Original URL: public readonly mcpServerUrl = "https://pointedly-enteric-yee.ngrok-free.dev/sse";
    public readonly mcpServerUrl = "https://mobile-overlabor-clergyman.ngrok-free.dev/sse";
    public readonly chatGptCompletionApiUrl = "https://api.openai.com/v1/chat/completions";

    // .env:
    public readonly chatGptApiKey = import.meta.env.VITE_CHATGPT_API_KEY;
    // public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig(); // Singleton
