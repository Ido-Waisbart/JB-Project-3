import { Box, Card, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import "./Home.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { VacationPanel } from "../../VacationArea/VacationCard/VacationCard";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { BarChart } from "@mui/x-charts/BarChart";
import { likeService } from "../../../Services/LikeService";

var vacations: VacationModel[] = [];
// Helpful debug data:
/*var vacations: VacationModel[] = [
  { id: 1, destination: "italy", start_date: new Date("2026-01-30"), end_date: new Date(), price_in_usd: 100 },
  { id: 2, destination: "lala land", start_date: new Date(), end_date: new Date(), price_in_usd: 21 },
  { id: 3, destination: "cloud cuckoo land", start_date: new Date(), end_date: new Date(), price_in_usd: 333, image_uri: "1.png" },
  { id: 4, destination: "batman land", start_date: new Date(), end_date: new Date(), price_in_usd: 42 },
];*/

export function Home() {
    const theme = useTheme();
    // ASSUMPTION: Never both loading AND error.
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const allVacations = useSelector((state: AppState) => state.vacationState.vacations);
    const allLikes = useSelector((state: AppState) => state.likeState.likes);

    useEffect(() => {
        // Load coins if not already loaded
        if (allVacations.length === 0) {
            setLoading(true);
            setError(false);
            Promise.all([vacationService.getAllVacations(), likeService.getAllLikes()])
                .then(() => {
                    setLoading(false);
                })
                .catch(() => {
                    // Error is already handled by VacationService with notify
                    // But, VacationService will also throw the error, to allow setError() to be called.
                    setError(true);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <Container className="Home">
            {/* Swap with Box and other stuff belonging to Bootstrap/MUI? */}
            <Stack style={{ width: "80vw" }} spacing={2}>
                <Typography typography="h4">Vacations</Typography>

                <Divider variant="middle" />

                {loading && (
                    <Container>
                        <Typography>Loading...</Typography>
                        <Box height="32px" />
                        <Spinner />
                    </Container>
                )}
                {error && (
                    <Container>
                        <Typography color="#975555">ERROR: Could not get vacations.</Typography>
                        <Typography>Are you logged in?</Typography>
                    </Container>
                )}
                {!loading && !error && (
                    <Container
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            gap: "32px",
                        }}
                    >
                        {vacations.map((vacation, i) => (
                            <VacationPanel vacation={vacation} key={i} />
                        ))}
                        {allVacations.map((vacation, i) => (
                            <VacationPanel vacation={vacation} key={i} />
                        ))}
                    </Container>
                )}
            </Stack>
        </Container>
    );
}
