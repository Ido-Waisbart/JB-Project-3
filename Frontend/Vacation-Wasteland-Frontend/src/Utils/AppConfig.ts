class AppConfig {
    public readonly serverUrl = "http://localhost:4000/api/";
    // Potentially insert .env stuff here.
    public readonly allVacationsApiUrl = this.serverUrl + "vacations";
    public readonly chatGptCompletionApiUrl = "https://api.openai.com/v1/chat/completions";
}

export const appConfig = new AppConfig(); // Singleton
