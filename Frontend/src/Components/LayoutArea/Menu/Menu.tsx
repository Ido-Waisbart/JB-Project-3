import { NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserState } from "../../../Redux/UserSlice";
import { Role } from "../../../Models/Enums";

export function Menu() {
    const user = useSelector<AppState, UserState>((state) => state.userState);
    return (
        user && (
            <Container className="Menu">
                <Stack direction="row" gap="16px" justifyContent="center">
                    <NavLink to="/home">Vacations</NavLink>
                    <span> | </span>
                    <NavLink to="/recommend">AI Recommendation</NavLink>
                    <span> | </span>
                    <NavLink to="/ask">Ask Anything</NavLink>
                </Stack>
                {user.role === Role.Admin && (
                    <>
                        <br />
                        <Stack direction="row" gap="16px" justifyContent="center">
                            <AdminPanelSettingsIcon />
                            <NavLink to="/admin">Admin</NavLink>
                            <span> | </span>
                            <NavLink to="/add">Add Vacation (Admin)</NavLink>
                            <span> | </span>
                            <NavLink to="/reports">Reports (Admin)</NavLink>
                        </Stack>
                    </>
                )}
            </Container>
        )
    );
}
