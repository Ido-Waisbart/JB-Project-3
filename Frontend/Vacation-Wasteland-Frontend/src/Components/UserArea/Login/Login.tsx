import { useForm } from "react-hook-form";
import "./Login.css";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { FormControl, TextField } from "@mui/material";

export function Login() {
  const { register, handleSubmit } = useForm<CredentialsModel>();
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
    <FormControl className="Login">
      {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
      <form onSubmit={handleSubmit(send)}>
        <TextField
          label="Email: "
          type="email"
          {...register("email")}
          required
        />
        <TextField
          label="Password: "
          type="password"
          {...register("password")}
          required
          //   inputProps={{
          //     minLength: 4,
          //     maxLength: 32,
          //   }}
          slotProps={{
            htmlInput: {
              minLength: 4,
              maxLength: 32,
            },
          }}
        //   minLength={4}
        //   maxLength={32}
        />

        <button>Login</button>
      </form>
    </FormControl>
  );
}
