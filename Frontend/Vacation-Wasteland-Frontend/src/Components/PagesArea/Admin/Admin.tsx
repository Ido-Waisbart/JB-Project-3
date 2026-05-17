import "./Admin.css";
import { Box, Button, Container, Divider, Pagination, Stack, Typography } from "@mui/material";
import { vacationService } from "../../../Services/VacationService";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { VacationPanel } from "../../VacationArea/VacationCard/VacationCard";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

export function Admin() {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const allVacations = useSelector((state: AppState) => state.vacationState.vacations);
    const sortedVacations = useMemo(() => {
        return [...allVacations].sort((v1, v2) => (v1.start_date > v2.start_date ? 1 : -1));
    }, [allVacations]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Load vacations if not already loaded
        if (allVacations.length === 0) {
            setLoading(true);
            setError(false);
            vacationService
                .getAllVacations()
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

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Container className="Admin">
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
                        <Typography>Are you still logged in?</Typography>
                    </Container>
                )}
                {!loading && !error && (
                    <Container>
                        <Button onClick={() => navigate("/add")} variant="contained">
                            Create Vacation
                        </Button>

                        <br />
                        <br />

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
                            {sortedVacations.slice(9 * (page - 1), 9 * (page - 1) + 9).map((vacation, i) => (
                                <VacationPanel
                                    vacation={vacation}
                                    key={i}
                                    adminMode
                                    initiallyLikedByUser={false}
                                    initialTotalLikes={0}
                                />
                            ))}
                        </Container>

                        <Box sx={{ display: "flex", justifyContent: "center", padding: "24px" }}>
                            <Pagination
                                count={Math.ceil(sortedVacations.length / 9)}
                                page={page}
                                onChange={handlePageChange}
                                size="large"
                            />
                        </Box>
                    </Container>
                )}
            </Stack>
        </Container>
    );
}
