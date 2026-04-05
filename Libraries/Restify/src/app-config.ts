import dotenv from "dotenv";

dotenv.config({ path: "../../.env", quiet: true });

class AppConfig {

    public readonly environment = process.env.ENVIRONMENT;
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";

}

export const appConfig = new AppConfig();
