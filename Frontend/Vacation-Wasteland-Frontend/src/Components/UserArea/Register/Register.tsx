import { useForm } from "react-hook-form";
import "./Register.css";
import { UserModel } from "../../../Models/UserModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AccountCircle, Cancel } from "@mui/icons-material";
// import ReCAPTCHA from "react-google-recaptcha";
import { appConfig } from "../../../Utils/AppConfig";
import { useState } from "react";
import { BetterTextField } from "../../SharedArea/BetterTextField/BetterTextField";

// https://developers.google.com/recaptcha/docs/faq

export function Register() {
    const { control, register, handleSubmit, reset } = useForm<UserModel>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    // const [captchaToken, setCaptchaToken] = useState<string | null>("");

    async function send(user: UserModel) {
        try {
            /*if(!captchaToken) {
                notify.error("Please verify that you are a human.");
                return;
            }
            user.captchaToken = captchaToken;*/
            await userService.register(user);
            notify.success(`Welcome ${user.first_name} ${user.last_name}!`);
            navigate("/home");
        } catch (err: any) {
            notify.error(err);
        }
    }

    const handleReset = () => {
        reset();
        (document.activeElement as HTMLElement)?.blur();
    };

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(send)} style={{ width: "400px", gap: "12px" }}>
                {/* Note: If I used control (for proper resetting, see the start of BetterTextField.tsx), I don't need register(). */}
                <BetterTextField control={control} name="first_name" label="First name" fullWidth required />

                <BetterTextField control={control} name="last_name" label="Last name" fullWidth required />

                <BetterTextField
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                />

                <BetterTextField
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    slotProps={{
                        htmlInput: {
                            minLength: 4,
                            maxLength: 32,
                        },
                    }}
                />

                {/* <ReCAPTCHA sitekey={appConfig.recaptchaSiteKey} onChange={saveCaptchaToken} /> */}

                <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
                    <Button type="submit" color="primary" variant="contained" sx={{ flex: 2.5 }}>
                        {" "}
                        <AccountCircle /> &nbsp; Register
                    </Button>
                    <Button type="button" onClick={handleReset} color="info" variant="contained" sx={{ flex: 1 }}>
                        {" "}
                        <Cancel /> &nbsp; Clear
                    </Button>
                </Box>
            </form>
        </div>
    );
}
