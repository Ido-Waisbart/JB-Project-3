import { useForm } from "react-hook-form";
import "./Register.css";
import { UserModel } from "../../../Models/UserModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, TextField, Typography } from "@mui/material";
import { AccountCircle, Cancel, HowToReg } from "@mui/icons-material";
// import ReCAPTCHA from "react-google-recaptcha";
import { appConfig } from "../../../Utils/AppConfig";
import { useState } from "react";

// https://developers.google.com/recaptcha/docs/faq

export function Register() {

    const { register, handleSubmit } = useForm<UserModel>();
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
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // TODO: Is this even needed?
    /*function saveCaptchaToken(captchaToken: string | null): void {
        console.log(captchaToken);
        setCaptchaToken(captchaToken);
    }*/

    return (
        <div className="Register">

            <Typography variant="h4" color="primary" className="spacing">
                Register to Northwind
                &nbsp;
                <HowToReg fontSize="large" className="middle" />
            </Typography>

            <FormControl onSubmit={handleSubmit(send)}>

                <TextField label="First name" fullWidth {...register("first_name")} required />

                <TextField label="Last name" fullWidth {...register("last_name")} required />

                <TextField label="Email" type="email" fullWidth {...register("email")} required />

                <TextField label="Password" type="password" fullWidth {...register("password")} required />

                <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />

                {/* <ReCAPTCHA sitekey={appConfig.recaptchaSiteKey} onChange={saveCaptchaToken} /> */}

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary"> <AccountCircle /> &nbsp; Register</Button>
                    <Button type="reset" color="secondary"> <Cancel /> &nbsp; Clear</Button>
                </ButtonGroup>

            </FormControl>

        </div>
    );
}
