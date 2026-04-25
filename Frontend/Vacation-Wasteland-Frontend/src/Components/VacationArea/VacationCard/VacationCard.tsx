import { Box, Card, Container, Typography } from "@mui/material";
import "./VacationCard.css";
import { VacationModel } from "../../../Models/VacationModel";

type VacationPanelProps = {
    vacation: VacationModel;
};
export const VacationPanel: React.FC<VacationPanelProps> = (props: VacationPanelProps) => {
    return (
        <Card
            className="VacationPanel"
            sx={{
                backgroundColor: "var(--dusty-denim)",
                width: "30%",
                minHeight: "250px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* TODO: <Stack> */}
            <Box
                sx={{
                    flex: "0 0 25%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 8px",
                }}
            >
                <Typography variant="h5">
                    <u>{props.vacation.destination}</u>
                </Typography>
                <Typography>
                    {new Date(props.vacation.start_date).toLocaleDateString("he-IL")} -{" "}
                    {new Date(props.vacation.end_date).toLocaleDateString("he-IL")}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: "1 1 auto",
                    minHeight: 0 /*flex items' min-height default to auto, allowing the image to become too big in this case.*/,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    component="img"
                    src={props.vacation.image_url ?? "dirthut.jpg"}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>
            <Box
                sx={{
                    flex: "0 0 20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Container
                    sx={{
                        width: "60%",
                        height: "75%",
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderRadius: 4,
                        backgroundColor: "var(--deep-space-blue)",
                        display: "flex",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography>${props.vacation.price_in_usd}</Typography>
                    </Box>
                </Container>
            </Box>
            {/* </Stack> */}
        </Card>
    );
};
