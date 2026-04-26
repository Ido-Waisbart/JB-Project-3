import { Controller, Control, FieldValues, Path } from "react-hook-form";
import TextField from "@mui/material/TextField";

type CustomDatePickerProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    required?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
};

export function CustomDatePicker<T extends FieldValues>({
    control,
    name,
    label,
    required = false,
    fullWidth = false,
    disabled = false,
}: CustomDatePickerProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    type="date"
                    label={label}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    required={required}
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                />
            )}
        />
    );
}