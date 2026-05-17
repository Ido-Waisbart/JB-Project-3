import { ChangeEvent, useState } from "react";
import { Prompt } from "../../../Models/Prompt";
import { chatGptService } from "../../../Services/ChatGptService";
import "./AIRecommendation.css";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { Stack } from "@mui/material";

export function AIRecommendation() {
    const [destination, setDestination] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [fetching, setFetching] = useState<boolean>(false);

    function handleChange(args: ChangeEvent<HTMLInputElement>) {
        const value = args.target.value;
        setDestination(value);
    }

    async function send() {
        try {
            setFetching(true);
            const answer = await getAiReview(destination);
            setAnswer(answer);
            setFetching(false);
        } catch (err: any) {
            notify.error(err);
            setFetching(false);
        }
    }

    async function getAiReview(vacationDestination: string): Promise<string> {
        const prompt = new Prompt();

        // GPT Personality:
        prompt.systemContent = "You are an expert in 'Vacation Wasteland' vacations.";

        // Our command:
        prompt.userContent = `
            Write about 200 words review for the 'Vacation Wasteland' vacation "${vacationDestination}".
            Return back an HTML divided into paragraphs containing the review.
            Emphasize important words with <strong> tags.
        `;

        // Get review:
        let review = await chatGptService.getCompletion(prompt);

        // Remove starting ```html and ending ``` if exist:
        review = review.replace("```html", "").replace("```", "").trim();
        return review;
    }

    return (
        <div className="AIRecommendation">
            <Stack sx={{ width: "80%" }}>
                <h2>AI Recommendation</h2>

                <div>
                    <label>Destination: </label>
                    <br />

                    <input type="text" onChange={handleChange} value={destination} />
                    <span>  </span>
                    <button onClick={send}>Get Recommendation</button>
                </div>
                <hr />

                <div>
                    {fetching && <Spinner />}

                    {!fetching && <div dangerouslySetInnerHTML={{ __html: answer }} />}
                </div>
            </Stack>
        </div>
    );
}
