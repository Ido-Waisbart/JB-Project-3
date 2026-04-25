import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import "./UserMenu.css";
import { userService } from "../../../Services/UserService";

export function UserMenu() {

    const user = useSelector<AppState, UserModel>(state => state.userState);

    function logout() {
        userService.logout();
    }

    return (
        <div className="UserMenu">

            {user && <div>
                <span>Hello {user.first_name} {user.last_name} | </span>
                <NavLink className="info" to={"/users/details/" + user.id}>ℹ️ | </NavLink>
                <NavLink to="/home" onClick={logout}>Logout</NavLink>
            </div>}

            {!user && <div>
                <span>Hello Guest | </span>
                <NavLink to="/register">Register</NavLink>
                <span> | </span>
                <NavLink to="/login">Login</NavLink>
            </div>}

        </div>
    );
}
