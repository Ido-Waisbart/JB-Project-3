import "./EditVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { Box, Button, Typography } from "@mui/material";
import { BetterTextField } from "../../SharedArea/BetterTextField/BetterTextField";
import { ImagePicker } from "../../SharedArea/ImagePicker/ImagePicker";
import { CustomDatePicker } from "../../SharedArea/CustomDatePicker/CustomDatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateUtils } from "../../../Utils/DateUtils";

export function EditVacation() {
    const [vacation, setVacation] = useState<VacationModel | undefined>(undefined);
    const { control, handleSubmit, watch, trigger, getValues, reset } = useForm<VacationModel>({
        mode: "onChange", // Causes validation to also run on change, not only on submit.
        reValidateMode: "onChange", // Causes React Hook Form to re-run validation for fields that already have an error on change.
    });
    const currStartDate = watch("start_date");
    const currEndDate = watch("end_date");
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        const abortController = new AbortController();

        vacationService.getOneVacation(id, abortController.signal)
            .then(vacation => {
                const vacationCopy = { ...vacation };
                setVacation(vacationCopy);
                // Pre-format dates for the HTML5 date inputs
                vacationCopy.start_date = DateUtils.toMySQLDateLocal(vacationCopy.start_date) as any;
                vacationCopy.end_date = DateUtils.toMySQLDateLocal(vacationCopy.end_date) as any;
                reset(vacationCopy);
            })
            .catch(err => {
                if (axios.isCancel(err)) return;
                notify.error(err);
            });

        return () => abortController.abort();
    }, [id])


    async function submitForm(vacation: VacationModel) {
        try {
            await vacationService.updateVacation(vacation);
            notify.success("Vacation has been successfully updated.");
            navigate("/admin");
        } catch (err: any) {
            notify.error(err);
        }
    }

    function handleCancel() {
        navigate("/admin");
    }

    return (
        !vacation ?
            <>
                <Typography>The vacation with the supplied ID could not be found.</Typography>
            </>
            :
            <div className="EditVacation">
                <Typography variant="button">Editing...</Typography>
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
                            },
                            validate: {
                                notAfterEndDate: (value) => {
                                    if (value === "" || value == null) return true;
                                    const end_date = getValues("end_date");
                                    if (!end_date) return true;
                                    const start_date = value;
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
                                if (currStartDate) trigger("start_date");
                            },
                            validate: {
                                notBeforeStartDate: (value) => {
                                    if (value === "" || value == null) return true;
                                    const start_date = getValues("start_date");
                                    if (!start_date) return true;
                                    const end_date = value;
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
                    <ImagePicker control={control} name="image" label="Image" fullWidth
                        imageUrl={vacation.image_url} />

                    <br />

                    <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
                        <Button type="submit" color="primary" variant="contained" sx={{ flex: 2.5 }}>
                            Submit Edit
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
