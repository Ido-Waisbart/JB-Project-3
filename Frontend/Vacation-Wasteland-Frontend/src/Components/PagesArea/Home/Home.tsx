import { Box, Card, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import "./Home.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { VacationPanel } from "../../SharedArea/VacationCard/VacationCard";

var vacations: VacationModel[] = [];
/*var vacations: VacationModel[] = [
  { id: 1, destination: "italy", start_date: new Date("2026-01-30"), end_date: new Date(), price_in_usd: 100 },
  { id: 2, destination: "lala land", start_date: new Date(), end_date: new Date(), price_in_usd: 21 },
  { id: 3, destination: "wackoo land", start_date: new Date(), end_date: new Date(), price_in_usd: 333, image_uri: "1" },
  { id: 4, destination: "batman land", start_date: new Date(), end_date: new Date(), price_in_usd: 42 },
]; // TODO: Get from backend, which gets from MySQL database.
*/

export function Home() {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const allVacations = useSelector(
    (state: AppState) => state.vacationState.vacations
  );

  useEffect(() => {
    // Load coins if not already loaded
    if (allVacations.length === 0) {
      setLoading(true);
      setError(false);
      vacationService.getAllVacations()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          // Error is already handled by CoinService with notify
          setError(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [allVacations.length]);

  return (
    <Container className="Home">
      {/* Swap with Box and other stuff belonging to Bootstrap/MUI? */}
      <Stack style={{ width: "80vw", }} spacing={2}>
        <Typography typography="h4">Vacations</Typography>

        <Divider variant="middle" />

        <Container style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          flexWrap: "wrap", flexDirection: "row", gap: "32px",
        }}>
          {vacations.map((vacation, i) => (
            <VacationPanel vacation={vacation} key={i} />
          ))}
          {allVacations.map((vacation, i) => (
            <VacationPanel vacation={vacation} key={i} />
          ))}
        </Container>
      </Stack>
    </Container>
  );
}
