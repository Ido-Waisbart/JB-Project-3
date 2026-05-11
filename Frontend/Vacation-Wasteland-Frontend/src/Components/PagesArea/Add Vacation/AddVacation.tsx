import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import "./AddVacation.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { Box, Button } from "@mui/material";
import { BetterTextField } from "../../SharedArea/BetterTextField/BetterTextField";
import { ImagePicker } from "../../SharedArea/ImagePicker/ImagePicker";
import { CustomDatePicker } from "../../SharedArea/CustomDatePicker/CustomDatePicker";

export function AddVacation() {
    const { control, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            // console.log(vacation);
            await vacationService.addVacation(vacation);
            notify.success("Vacation has been added.");
            navigate("/admin");
        } catch (err: any) {
            notify.error(err);
        }
    }

    function handleCancel() {
        navigate("/admin");
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)} style={{ width: "400px", gap: "12px" }}>
                <BetterTextField control={control} name="destination" label="Destination" fullWidth required />
                <BetterTextField
                    control={control}
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    required
                />
                {/* <DatePicker name="start_date" label="Start Date" slotProps={{ textField: { fullWidth: true } }} /> */}
                <CustomDatePicker control={control} name="start_date" label="Start Date" fullWidth required />
                <CustomDatePicker control={control} name="end_date" label="End Date" fullWidth required />
                <BetterTextField
                    control={control}
                    name="price_in_usd"
                    label="Price in USD"
                    type="number"
                    fullWidth
                    required
                    rules={{
                        min: {
                            value: 0,
                            message: "Price cannot be less than 0",
                        },
                        max: {
                            value: 10000,
                            message: "Price cannot exceed 10000",
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <span>$</span>,
                        },
                    }}
                />
                <ImagePicker control={control} name="image" label="Image" fullWidth required />

                <br />

                <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
                    <Button type="submit" color="primary" variant="contained" sx={{ flex: 2.5 }}>
                        Register
                    </Button>
                    <Button type="button" onClick={handleCancel} color="info" variant="contained" sx={{ flex: 1 }}>
                        Cancel
                    </Button>
                </Box>

                <br />
            </form>
        </div>
    );
}
