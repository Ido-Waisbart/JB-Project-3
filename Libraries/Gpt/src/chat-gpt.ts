import OpenAI from "openai";
import { appConfig } from "./app-config";
import { ChatCompletionCreateParamsNonStreaming, ImageGenerateParamsNonStreaming } from "openai/resources";

class ChatGpt {

    private openai = new OpenAI({
        apiKey: appConfig.openaiApiKey
    });

    public async getCompletion(systemContent: string, userContent: string): Promise<string> {

        // Data to send: 
        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-5",
            messages: [
                { role: "system", content: systemContent },
                { role: "user", content: userContent }
            ]
        };

        // Send request: 
        const response = await this.openai.chat.completions.create(body)

        // Return completion: 
        const completion = response.choices[0].message.content!;
        return completion;
    }

    public async getImageUrl(prompt: string): Promise<string> {

        // Data to send: 
        const body: ImageGenerateParamsNonStreaming = {
            model: "dall-e-3",
            prompt
        };

        // Send request: 
        const response = await this.openai.images.generate(body)

        // Return image url: 
        const url = response.data?.[0].url!;
        return url;
    }

}

export const chatGpt = new ChatGpt();
