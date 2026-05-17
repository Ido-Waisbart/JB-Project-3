import "./AddVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { Box, Button, Typography } from "@mui/material";
import { BetterTextField } from "../../SharedArea/BetterTextField/BetterTextField";
import { ImagePicker } from "../../SharedArea/ImagePicker/ImagePicker";
import { CustomDatePicker } from "../../SharedArea/CustomDatePicker/CustomDatePicker";

export function AddVacation() {
    const { control, handleSubmit, watch, trigger, getValues } = useForm<VacationModel>({
        mode: "onChange", // Causes validation to also run on change, not only on submit.
        reValidateMode: "onChange", // Causes React Hook Form to re-run validation for fields that already have an error on change.
    });
    const currStartDate = watch("start_date");
    const currEndDate = watch("end_date");
    const navigate = useNavigate();

    async function submitForm(vacation: VacationModel) {
        try {
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

    // Is the given date in the past?
    const ruleNotInPast = (value: string | number | Date | File | undefined) => {
        if (!value) return true; // "Value required."
        const today = new Date().toISOString().split("T")[0];
        return value >= today || "Cannot select past dates";
    };

    return (
        <div className="AddVacation">
            <Typography variant="button">Adding...</Typography>
            <form onSubmit={handleSubmit(submitForm)} style={{ width: "400px", gap: "12px" }}>
                <BetterTextField control={control} name="destination" label="Destination" fullWidth required />
                <BetterTextField
                    control={control}
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    required
                />
                <CustomDatePicker
                    control={control}
                    name="start_date"
                    label="Start Date"
                    fullWidth
                    rules={{
                        required: true,
                        onChange: (_event) => {
                            if (currEndDate) trigger("end_date");
                            // else trigger("start_date");  // validation doesn't happen if the value is <empty string> for example.
                        },
                        validate: {
                            notInPast: ruleNotInPast,
                            notAfterEndDate: (value) => {
                                if (value === "" || value == null) return true;
                                const end_date = getValues("end_date");
                                if (!end_date) return true;
                                const start_date = value;
                                // Helpful for debugging:
                                console.log(`(start_date) Comparing: ${start_date} <= ${end_date}`);
                                return start_date <= end_date || "Start date must be before end date";
                            },
                        },
                    }}
                />
                <CustomDatePicker
                    control={control}
                    name="end_date"
                    label="End Date"
                    fullWidth
                    rules={{
                        required: true,
                        onChange: (_event) => {
                            console.log(_event.target.value);
                            if (currStartDate) trigger("start_date");
                            // else trigger("end_date");  // validation doesn't happen if the value is <empty string> for example.
                        },
                        validate: {
                            notInPast: ruleNotInPast,
                            notBeforeStartDate: (value) => {
                                if (value === "" || value == null) return true;
                                const start_date = getValues("start_date");
                                if (!start_date) return true;
                                const end_date = value;
                                // Helpful for debugging:
                                console.log(`(end_date) Comparing: ${start_date} <= ${end_date}`);
                                return start_date <= end_date || "Start date must be before end date";
                            },
                        },
                    }}
                />
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
                        Add
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
