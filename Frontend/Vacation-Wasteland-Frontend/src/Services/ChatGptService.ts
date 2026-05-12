import OpenAI from "openai";
import axios from "axios";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import { Prompt } from "../Models/Prompt";
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

// TODO: Unneeded?
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
    // OpenAI configuration:
    private openai = new OpenAI({
        apiKey: appConfig.chatGptApiKey,
        dangerouslyAllowBrowser: true, // Only if we really want to do it in the frontend.
    });

    // Get GPT completion: 
    public async getCompletion(prompt: Prompt): Promise<string> {

        // Data to send: 
        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: prompt.systemContent },
                { role: "user", content: prompt.userContent }
            ]
        };

        // Send request: 
        const response = await this.openai.chat.completions.create(body)

        // Return completion: 
        const completion = response.choices[0].message.content!;
        return completion;
    }

    // TODO: Unneeded?
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
                model: "gpt-4.1-mini",
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

    // Get MCP result:
    public async getMcpResult(input: string): Promise<string> {
        // Data to send:
        const body: OpenAI.Responses.ResponseCreateParams = {
            model: "gpt-4.1-mini",
            // TODO: Set-up a mcpServerUrl, like https://pointedly-enteric-yee.ngrok-free.dev/sse.
            // This will work without this tools member, but this is not like what was taught.
            tools: [
                {
                    type: "mcp",
                    server_label: "Vacation Wasteland MCP",
                    server_description:
                        "Vacation Wasteland company MCP server exposing vacation data like details, dates and likes.",
                    server_url: appConfig.mcpServerUrl,
                    require_approval: "never",
                },
            ],
            input,
        };

        // Ask AI:
        const response = await this.openai.responses.create(body);

        // Return output:
        return response.output_text;
    }
}

export const chatGptService = new ChatGptService();
