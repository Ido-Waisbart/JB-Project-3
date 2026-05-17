import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import TextField from "@mui/material/TextField";

type CustomDatePickerProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    rules?: RegisterOptions<T>;
    fullWidth?: boolean;
    disabled?: boolean;
};

export function CustomDatePicker<T extends FieldValues>({
    control,
    name,
    label,
    rules,
    fullWidth = false,
    disabled = false,
}: CustomDatePickerProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={ rules }
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    type="date"
                    label={label}
                    value={field.value ?? ""}
                    inputRef={field.ref}  /* Makes the element gets focused if there's a validation error. */
                    required={!!rules?.required}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                />
            )}
        />
    );
}