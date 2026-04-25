import "./UserMenu.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { AppState } from "../../../Redux/AppState";
import { UserState } from "../../../Redux/UserSlice";
import { userService } from "../../../Services/UserService";

export function UserMenu() {

    const user = useSelector<AppState, UserState>(state => state.userState);

    function logout() {
        userService.logout();
    }

    return (
        <div className="UserMenu">

            {user && <div>
                <Typography component="span">Hello {user.first_name} {user.last_name} | </Typography>
                <NavLink to="/login" onClick={logout}>Logout</NavLink>
            </div>}

            {!user && <div>
                <Typography component="span">Hello Guest | </Typography>
                <NavLink to="/register">Register</NavLink>
                <Typography component="span"> | </Typography>
                <NavLink to="/login">Login</NavLink>
            </div>}

        </div>
    );
}
