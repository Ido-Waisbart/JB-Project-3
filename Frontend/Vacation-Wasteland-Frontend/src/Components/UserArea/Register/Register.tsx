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
            {/* 
                noValidate is set to disable browser-native validation tooltips, which fail or behave inconsistently across browsers (e.g. Firefox vs Edge).
                - The 'rules' prop provides programmatic cross-browser validation via react-hook-form to render inline errors cleanly.
                - The 'slotProps.htmlInput' constraints (e.g., minLength/maxLength) physically restrict user typing limits at the browser level.
            */}
            <form onSubmit={handleSubmit(send)} style={{ width: "400px", gap: "12px" }} noValidate>
                {/* Note: If I used control (for proper resetting, see the start of BetterTextField.tsx), I don't need register(). */}
                <BetterTextField
                    control={control}
                    name="first_name"
                    label="First name"
                    fullWidth
                    required
                    rules={{
                        required: "First name is required",
                        minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters"
                        },
                        maxLength: {
                            value: 30,
                            message: "First name cannot exceed 30 characters"
                        }
                    }}
                />

                <BetterTextField
                    control={control}
                    name="last_name"
                    label="Last name"
                    fullWidth
                    required
                    rules={{
                        required: "Last name is required",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters"
                        },
                        maxLength: {
                            value: 30,
                            message: "Last name cannot exceed 30 characters"
                        }
                    }}
                />

                <BetterTextField
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format"
                        }
                    }}
                />

                <BetterTextField
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        },
                        maxLength: {
                            value: 32,
                            message: "Password cannot exceed 32 characters"
                        },
                        validate: (value: string) => {
                            const upper = /[A-Z]/.test(value) ? 1 : 0;
                            const lower = /[a-z]/.test(value) ? 1 : 0;
                            const digit = /[0-9]/.test(value) ? 1 : 0;
                            const special = /[^A-Za-z0-9]/.test(value) ? 1 : 0;
                            if (upper + lower + digit + special < 3) {
                                return "Password must contain at least 3 groups: uppercase, lowercase, numbers, or special characters";
                            }
                            return true;
                        }
                    }}
                    slotProps={{
                        htmlInput: {
                            minLength: 8,
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
