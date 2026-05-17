import { Box, Card, Chip, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./VacationCard.css";
import { VacationModel } from "../../../Models/VacationModel";
import { likeService } from "../../../Services/LikeService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { LikeModel } from "../../../Models/LikeModel";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

type VacationPanelProps = {
    vacation: VacationModel;
    initiallyLikedByUser: boolean;
    initialTotalLikes: number;
    adminMode: boolean;
};
export const VacationPanel: React.FC<VacationPanelProps> = ({
    vacation,
    initiallyLikedByUser,
    initialTotalLikes,
    adminMode = false,
}) => {
    const user = useSelector((state: AppState) => state.userState!);
    const [likedByUser, setLikedByUser] = useState<boolean>(initiallyLikedByUser);
    const [totalLikes, setTotalLikes] = useState<number>(initialTotalLikes);
    const navigate = useNavigate();

    function handleToggleFavorite() {
        if (likedByUser) {
            likeService.deleteLike({ user_id: user.id, vacation_id: vacation.id } as LikeModel);
            setTotalLikes(totalLikes - 1);
        } else {
            likeService.addLike({ user_id: user.id, vacation_id: vacation.id } as LikeModel);
            setTotalLikes(totalLikes + 1);
        }
        setLikedByUser(!likedByUser);
    }

    function handleEdit() {
        navigate("/edit/" + vacation.id);
    }

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this vacation?\nThis action is irreversible.")) {
            await vacationService.deleteVacation(vacation.id);
            notify.success("Vacation has been successfully deleted.");
            navigate("/admin");
        }
    }

    // When 'vacation' changes, react to any prop changes.
    useEffect(() => {
        setLikedByUser(initiallyLikedByUser);
        setTotalLikes(initialTotalLikes);
    }, [vacation]);

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
                    <u>{vacation.destination}</u>
                </Typography>
                <Typography>
                    {new Date(vacation.start_date).toLocaleDateString("he-IL")} -{" "}
                    {new Date(vacation.end_date).toLocaleDateString("he-IL")}
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
                    src={vacation.image_url ?? "dirthut.jpg"}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {adminMode && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            height: 24,
                            display: "flex",
                            justifyContent: "start",
                            gap: "4px",
                        }}
                    >
                        <Chip
                            clickable
                            onClick={handleEdit}
                            icon={<EditIcon />}
                            label={"Edit"}
                            size="small"
                            color="warning"
                            sx={{
                                fontWeight: "bold",
                                boxShadow: 3,
                            }}
                        />
                        <Chip
                            clickable
                            onClick={handleDelete}
                            icon={<DeleteIcon />}
                            label={"Delete"}
                            size="small"
                            color="error"
                            sx={{
                                fontWeight: "bold",
                                boxShadow: 3,
                            }}
                        />
                    </Box>
                )}
                {!adminMode && (
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
                )}
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
                        <Typography>${vacation.price_in_usd}</Typography>
                    </Box>
                </Container>
            </Box>
        </Card>
    );
};
