import { ChangeEvent, useState } from "react";
import { chatGptService } from "../../../Services/ChatGptService";
import { notify } from "../../../Utils/Notify";
import "./AskAnything.css";
import { Spinner } from "../../SharedArea/Spinner/Spinner";

export function AskAnything() {

    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [fetching, setFetching] = useState<boolean>(false);

    function handleChange(args: ChangeEvent<HTMLInputElement>) {
        const value = args.target.value;
        setQuestion(value);
    }

    async function send() {
        try {
            setFetching(true);
            const answer = await chatGptService.getMcpResult(question);
            setAnswer(answer);
            setFetching(false);
        }
        catch (err: any) {
            notify.error(err);
            setFetching(false);
        }
    }

    return (
        <div className="AskAnything">

            <h2>Ask AI anything about our vacations at Vacation Wasteland</h2>

            <label>Enter your question: </label>
            <br />

            <input type="text" onChange={handleChange} value={question} />
            <button onClick={send}>Send</button>
            <hr />

            <div>

                {fetching && <Spinner />}

                {!fetching && answer}
                
            </div>

        </div>
    );
}
