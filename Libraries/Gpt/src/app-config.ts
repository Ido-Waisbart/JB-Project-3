import dotenv from "dotenv";

dotenv.config({ path: "../../.env", quiet: true });

class AppConfig {

    public readonly openaiApiKey = process.env.OPENAI_API_KEY;

}

export const appConfig = new AppConfig();
