"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatGpt = void 0;
const openai_1 = __importDefault(require("openai"));
const app_config_1 = require("./app-config");
class ChatGpt {
    openai = new openai_1.default({
        apiKey: app_config_1.appConfig.openaiApiKey
    });
    async getCompletion(systemContent, userContent) {
        // Data to send: 
        const body = {
            model: "gpt-5",
            messages: [
                { role: "system", content: systemContent },
                { role: "user", content: userContent }
            ]
        };
        // Send request: 
        const response = await this.openai.chat.completions.create(body);
        // Return completion: 
        const completion = response.choices[0].message.content;
        return completion;
    }
    async getImageUrl(prompt) {
        // Data to send: 
        const body = {
            model: "dall-e-3",
            prompt
        };
        // Send request: 
        const response = await this.openai.images.generate(body);
        // Return image url: 
        const url = response.data?.[0].url;
        return url;
    }
}
exports.chatGpt = new ChatGpt();
