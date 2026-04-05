declare class ChatGpt {
    private openai;
    getCompletion(systemContent: string, userContent: string): Promise<string>;
    getImageUrl(prompt: string): Promise<string>;
}
export declare const chatGpt: ChatGpt;
export {};
