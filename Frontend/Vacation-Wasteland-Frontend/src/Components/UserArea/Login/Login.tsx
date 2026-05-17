import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { BetterTextField } from "../../SharedArea/BetterTextField/BetterTextField";
import { notify } from "../../../Utils/Notify";

export function Login() {
    const { control, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome Back!");
            navigate("/home");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">
            {/* 
                noValidate is set to disable browser-native validation tooltips, which fail or behave inconsistently across browsers (e.g. Firefox vs Edge).
                - The 'rules' prop provides programmatic cross-browser validation via react-hook-form to render inline errors cleanly.
                - The 'slotProps.htmlInput' constraints (e.g., minLength/maxLength) physically restrict user typing limits at the browser level.
            */}
            <form onSubmit={handleSubmit(send)} style={{ width: "400px", gap: "12px" }} noValidate>
                {/* Note: If I used control (for proper resetting, see the start of BetterTextField.tsx), I don't need register(). */}
                <BetterTextField
                    name="email"
                    control={control}
                    label="Email: "
                    type="email"
                    required
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format"
                        }
                    }}
                />
                <BetterTextField name="password"
                    control={control}
                    label="Password: "
                    type="password"
                    required
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password must be at least 4 characters"
                        },
                        maxLength: {
                            value: 32,
                            message: "Password cannot exceed 32 characters"
                        }
                    }}
                    slotProps={{
                        htmlInput: {
                            minLength: 4,
                            maxLength: 32,
                        },
                    }}
                />

                <Box>
                    <Button type="submit" color="primary" variant="contained">
                        {" "}
                        <AccountCircle /> &nbsp; Login
                    </Button>
                </Box>
            </form>
        </div>
    );
}
