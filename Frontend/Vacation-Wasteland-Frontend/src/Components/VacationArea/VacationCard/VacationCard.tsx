import { Box, Card, Chip, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./VacationCard.css";
import { VacationModel } from "../../../Models/VacationModel";
import { likeService } from "../../../Services/LikeService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { LikeModel } from "../../../Models/LikeModel";
import { useState } from "react";

type VacationPanelProps = {
    vacation: VacationModel;
    likedByUser: boolean; // Initially?
    totalLikes: number; // Initial?
};
export const VacationPanel: React.FC<VacationPanelProps> = (props: VacationPanelProps) => {
    const user = useSelector((state: AppState) => state.userState!);
    const [likedByUser, setLikedByUser] = useState<boolean>(props.likedByUser);
    const [totalLikes, setTotalLikes] = useState<number>(props.totalLikes);
    function handleToggleFavorite() {
        if (likedByUser) {
            likeService.deleteLike({ user_id: user.id, vacation_id: props.vacation.id } as LikeModel);
            setTotalLikes(totalLikes - 1);
        } else {
            likeService.addLike({ user_id: user.id, vacation_id: props.vacation.id } as LikeModel);
            setTotalLikes(totalLikes + 1);
        }
        setLikedByUser(!props.likedByUser);
    }

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
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src={props.vacation.image_url ?? "dirthut.jpg"}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Chip
                    clickable
                    onClick={handleToggleFavorite}
                    icon={<FavoriteIcon />}
                    label={"Like " + totalLikes}
                    size="small"
                    color={likedByUser ? "primary" : "info"}
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        height: 24,
                        fontWeight: "bold",
                        boxShadow: 3,
                    }}
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
        </Card>
    );
};
