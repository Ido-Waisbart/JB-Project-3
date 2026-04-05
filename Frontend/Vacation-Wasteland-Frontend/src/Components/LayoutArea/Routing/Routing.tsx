import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { AddVacation } from "../../PagesArea/Add Vacation/AddVacation";
import { Admin } from "../../PagesArea/Admin/Admin";
import { AIRecommendation } from "../../PagesArea/AI Recommendation/AIRecommendation";
import { AskAnything } from "../../PagesArea/Ask Anything/AskAnything";
import { EditVacation } from "../../PagesArea/Edit Vacation/EditVacation";
import { Login } from "../../PagesArea/Login/Login";
import { Register } from "../../PagesArea/Register/Register";
import { VacationReports } from "../../PagesArea/Vacation Reports/VacationReports";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddVacation />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/recommend" element={<AIRecommendation />} />
            <Route path="/ask" element={<AskAnything />} />
            <Route path="/edit" element={<EditVacation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<VacationReports />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
