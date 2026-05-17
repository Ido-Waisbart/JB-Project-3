import "./Home.css";
import { Box, Button, Container, Divider, Pagination, Stack, Typography } from "@mui/material";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { VacationPanel } from "../../VacationArea/VacationCard/VacationCard";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { likeService } from "../../../Services/LikeService";

// var vacations: VacationModel[] = [];
// Helpful debug data:
/*var vacations: VacationModel[] = [
  { id: 1, destination: "italy", start_date: new Date("2026-01-30"), end_date: new Date(), price_in_usd: 100 },
  { id: 2, destination: "lala land", start_date: new Date(), end_date: new Date(), price_in_usd: 21 },
  { id: 3, destination: "cloud cuckoo land", start_date: new Date(), end_date: new Date(), price_in_usd: 333, image_uri: "1.png" },
  { id: 4, destination: "batman land", start_date: new Date(), end_date: new Date(), price_in_usd: 42 },
];*/

export function Home() {
    // ASSUMPTION: Never both loading AND error.
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const allVacations = useSelector((state: AppState) => state.vacationState.vacations);
    const sortedVacations = useMemo(() => {
        return [...allVacations].sort((v1, v2) => (v1.start_date > v2.start_date ? 1 : -1));
    }, [allVacations]);
    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]); // Could in theory use useMemo for this.
    const user = useSelector((state: AppState) => state.userState!); // ASSUMPTION: If the user was able to access Home.tsx, then userState is surely not null.
    const allLikes = useSelector((state: AppState) => state.likeState.likes);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setFilteredVacations(sortedVacations);
    }, [sortedVacations]); // ASSUMPTION: allVacations gets selected only and exactly once.

    useEffect(() => {
        // Load vacations if not already loaded
        if (sortedVacations.length === 0) {
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

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
                    <Container>
                        <Container
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                flexDirection: "row",
                                gap: "8px",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    setFilteredVacations(
                                        sortedVacations.filter((v) =>
                                            allLikes.some(
                                                (like) => like.user_id === user.id && like.vacation_id === v.id,
                                            ),
                                        ),
                                    )
                                }
                                variant="contained"
                            >
                                View Liked
                            </Button>
                            <Button
                                onClick={() =>
                                    setFilteredVacations(
                                        sortedVacations.filter(
                                            (v) => v.end_date > new Date() && new Date() > v.start_date,
                                        ),
                                    )
                                }
                                variant="contained"
                            >
                                View Ongoing
                            </Button>
                            <Button
                                onClick={() =>
                                    setFilteredVacations(sortedVacations.filter((v) => new Date() < v.start_date))
                                }
                                variant="contained"
                            >
                                View Upcoming
                            </Button>
                            <Button onClick={() => setFilteredVacations(sortedVacations)} variant="contained">
                                View All
                            </Button>
                        </Container>

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
                            {filteredVacations.slice(9 * (page - 1), 9 * (page - 1) + 9).map((vacation, i) => {
                                return (
                                    <VacationPanel
                                        vacation={vacation}
                                        key={i}
                                        initiallyLikedByUser={allLikes.some(
                                            (like) => like.user_id === user.id && like.vacation_id === vacation.id,
                                        )}
                                        initialTotalLikes={
                                            allLikes.filter((like) => like.vacation_id === vacation.id).length
                                        }
                                        adminMode={false}
                                    />
                                );
                            })}
                        </Container>

                        <Box sx={{ display: "flex", justifyContent: "center", padding: "24px" }}>
                            <Pagination
                                count={Math.ceil(filteredVacations.length / 9)}
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
