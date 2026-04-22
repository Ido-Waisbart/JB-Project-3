import { Box, Card, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import "./Home.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

var vacations: VacationModel[] = [];
/*var vacations: VacationModel[] = [
  { id: 1, destination: "italy", start_date: new Date("2026-01-30"), end_date: new Date(), price_in_usd: 100 },
  { id: 2, destination: "lala land", start_date: new Date(), end_date: new Date(), price_in_usd: 21 },
  { id: 3, destination: "wackoo land", start_date: new Date(), end_date: new Date(), price_in_usd: 333, image_uri: "1" },
  { id: 4, destination: "batman land", start_date: new Date(), end_date: new Date(), price_in_usd: 42 },
]; // TODO: Get from backend, which gets from MySQL database.
*/

// TODO: Move me elsewhere.
type VacationPanelProps = {
  vacation: VacationModel;
}
const VacationPanel: React.FC<VacationPanelProps> = (props: VacationPanelProps) => {
  return (
    <Card className="VacationPanel" sx={{
      backgroundColor: "var(--dusty-denim)", width: "30%", minHeight: "250px", height: "250px",
      display: "flex", flexDirection: "column",
    }}>
      {/* <Stack> */}
      <Box sx={{
        flex: "0 0 25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography variant="h5"><u>{props.vacation.destination}</u></Typography>
        <Typography>{new Date(props.vacation.start_date).toLocaleDateString("he-IL")} - {new Date(props.vacation.end_date).toLocaleDateString("he-IL")}</Typography>
      </Box>
      <Box sx={{
        flex: "1 1 auto", minHeight: 0,  /*flex items' min-height default to auto, allowing the image to become too big in this case.*/
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Box component="img" src={props.vacation.image_uri ?? "dirthut.jpg"} sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
      </Box>
      <Box sx={{
        flex: "0 0 20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Container sx={{
          width: "60%", height: "75%", paddingLeft: 0, paddingRight: 0,
          borderRadius: 4, backgroundColor: "var(--deep-space-blue)", display: "flex",
        }}>
          <Box sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography>${props.vacation.price_in_usd}</Typography>
          </Box>
        </Container>
      </Box>
      {/* </Stack> */}
    </Card>
  );
}

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
