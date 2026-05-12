// TODO: Prettify
import { ChangeEvent, useState } from "react";
import { chatGptService } from "../../../Services/ChatGptService";
import { notify } from "../../../Utils/Notify";
import "./AskAnything.css";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { Button, Input, Stack, TextField, Typography } from "@mui/material";

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
        } catch (err: any) {
            notify.error(err);
            setFetching(false);
        }
    }

    return (
        <div className="AskAnything">
            <Stack sx={{ width: "80%", display: "flex", alignItems: "center", gap: "16px" }}>
                <Typography variant="h3">
                    Ask our AI anything about our
                    <br />
                    vacations at Vacation Wasteland.
                </Typography>

                <div style={{ width: "50%" }}>
                    <Typography variant="body1" sx={{ fontSize: "1.75rem", paddingBottom: "8px" }}>
                        <label htmlFor="question">Enter your question:</label>
                    </Typography>

                    <TextField
                        name="question"
                        id="question"
                        multiline
                        onChange={handleChange}
                        value={question}
                        fullWidth
                    />

                    <Button onClick={send} size="medium" variant="contained" sx={{ marginTop: "8px" }}>
                        Send
                    </Button>
                </div>

                <hr />

                <div style={{ width: "60%" }}>
                    {fetching && <Spinner />}

                    {!fetching && answer && (
                        <Typography variant="body1" sx={{ fontSize: "1.25rem", lineHeight: "2.5" }}>
                            <span>
                                <b>AI:</b>{" "}
                            </span>
                            {answer}
                        </Typography>
                    )}
                </div>
            </Stack>
        </div>
    );
}
