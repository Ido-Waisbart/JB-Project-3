import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {
    return (
        <div className="Menu">
            <NavLink to="/home">Vacations</NavLink>
            <span> | </span>
            <NavLink to="/register">Register</NavLink>
            <span> | </span>
            <NavLink to="/login">Log In</NavLink>
            <span> | </span>
            <NavLink to="/recommend">AI Recommendation</NavLink>
            <span> | </span>
            <NavLink to="/ask">Ask Anything</NavLink>
            <span> --- </span>
            <NavLink to="/admin">Admin</NavLink>
            <span> | </span>
            <NavLink to="/add">Add Vacation (Admin)</NavLink>
            <span> | </span>
            <NavLink to="/edit">Edit Vacation (Admin)</NavLink>
            <span> | </span>
            <NavLink to="/reports">Reports (Admin)</NavLink>
        </div>
    );
}
