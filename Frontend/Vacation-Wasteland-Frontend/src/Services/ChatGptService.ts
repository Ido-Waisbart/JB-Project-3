import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import { Prompt } from "../Models/Prompt";
import { appConfig } from "../Utils/AppConfig";

export type ChatGptMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

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
                { role: "user", content: prompt.userContent },
            ],
        };

        // Send request:
        const response = await this.openai.chat.completions.create(body);

        // Return completion:
        const completion = response.choices[0].message.content!;
        return completion;
    }

    // Get MCP result:
    public async getMcpResult(input: string): Promise<string> {
        // Data to send:
        const body: OpenAI.Responses.ResponseCreateParams = {
            model: "gpt-4.1-mini",
            tools: [
                {
                    type: "mcp",
                    server_label: "Vacation-Wasteland-MCP",
                    server_description:
                        "Vacation Wasteland company MCP server exposing vacation data like details, dates and likes." +
                        "Return plain text only." +
                        "Do not use markdown." +
                        "Do not use brackets or links." +
                        "Do not format output for UI." +
                        "No follow up questions or questions at all.",
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
