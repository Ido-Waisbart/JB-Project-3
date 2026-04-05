import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { validateAxios } from "../Utils/ValidateAxios";
import { notify } from "../Utils/Notify";

type ChatGptMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

type ChatGptRequest = {
    model: string;
    messages: ChatGptMessage[];
    temperature?: number;
};

type ChatGptResponse = {
    choices: Array<{
        message: {
            role: string;
            content: string;
        };
    }>;
};

/*type VacationDataForAI = {
    name: string;
    current_price_usd: number;
    market_cap_usd: number;
    volume_24h_usd: number;
    price_change_percentage_30d_in_currency: number;
    price_change_percentage_60d_in_currency: number;
    price_change_percentage_200d_in_currency: number;
};*/

class ChatGptService {
    private readonly apiKey: string | undefined;

    constructor() {
        // API key should be stored in environment variables
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    }

    /*public async getVacationRecommendation(vacationData: VacationDataForAI): Promise<string> {
        try {
            if (!this.apiKey) {
                const errorMessage = "OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your environment variables.";
                // notify.error("API Configuration Error", errorMessage);
                notify.error("API Configuration Error: " + errorMessage);
                throw new Error(errorMessage);
            }

            const prompt = `You are a cryptocurrency investment advisor. Based on the following data for ${vacationData.name}, provide a recommendation on whether to buy this cryptocurrency or not.

Vacation Data:
- Name: ${vacationData.name}
- Current Price (USD): $${vacationData.current_price_usd.toLocaleString()}
- Market Cap (USD): $${vacationData.market_cap_usd.toLocaleString()}
- 24h Trading Volume (USD): $${vacationData.volume_24h_usd.toLocaleString()}
- 30-day Price Change: ${vacationData.price_change_percentage_30d_in_currency.toFixed(2)}%
- 60-day Price Change: ${vacationData.price_change_percentage_60d_in_currency.toFixed(2)}%
- 200-day Price Change: ${vacationData.price_change_percentage_200d_in_currency.toFixed(2)}%

Please provide:
1. A clear recommendation: "BUY" or "DON'T BUY"
2. A detailed explanation paragraph (2-3 sentences) explaining your reasoning based on the price trends, market cap, trading volume, and overall market performance.

Format your response as:
RECOMMENDATION: [BUY/DON'T BUY]
EXPLANATION: [Your explanation here]`;

            const request: ChatGptRequest = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional cryptocurrency investment advisor. Provide clear, concise recommendations based on market data."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7
            };

            const response = await axios.post<ChatGptResponse>(
                appConfig.chatGptCompletionApiUrl,
                request,
                {
                    headers: {
                        "Authorization": `Bearer ${this.apiKey}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].message.content;
            }

            const errorMessage = "No response from ChatGPT";
            // notify.error("ChatGPT API Error", errorMessage);
            notify.error("ChatGPT API Error: " + errorMessage);
            throw new Error(errorMessage);
        }
        catch (error: any) {
            // Only validate axios errors (network/HTTP errors)
            // Business logic errors (like missing API key, no response) are already handled with notify above
            if (axios.isAxiosError(error)) {
                validateAxios(error);
            }
            throw error;
        }
    }*/
}

export const chatGptService = new ChatGptService();
