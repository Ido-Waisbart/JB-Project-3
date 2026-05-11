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
            <form onSubmit={handleSubmit(send)} style={{ width: "400px", gap: "12px" }}>
                {/* Note: If I used control (for proper resetting, see the start of BetterTextField.tsx), I don't need register(). */}
                <BetterTextField name="email" control={control} label="Email: " type="email" required />
                <BetterTextField name="password"
                    control={control}
                    label="Password: "
                    type="password"
                    required
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
