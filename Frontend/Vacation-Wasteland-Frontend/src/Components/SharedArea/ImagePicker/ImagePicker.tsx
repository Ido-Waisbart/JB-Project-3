import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";

type ImagePickerProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
};

export function ImagePicker<T extends FieldValues>({
    control,
    name,
    label,
    fullWidth = false,
    required = false,
}: ImagePickerProps<T>) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field, fieldState }) => (
                <Box width={fullWidth ? "100%" : "auto"} display="flex" flexDirection="column" gap={1}>
                    
                    {label && (
                        <Typography variant="body2">
                            {label}{required ? " *" : ""}
                        </Typography>
                    )}

                    <Button variant="contained" component="label">
                        Choose Image
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;

                                field.onChange(file);

                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                } else {
                                    setPreview(null);
                                }
                            }}
                        />
                    </Button>

                    {fieldState.error && (
                        <Typography color="error" variant="caption">
                            {fieldState.error.message || "Image is required"}
                        </Typography>
                    )}

                    {preview && (
                        <Box
                            component="img"
                            src={preview}
                            sx={{
                                width: "100%",
                                maxHeight: 220,
                                objectFit: "cover",
                                borderRadius: 1,
                                boxShadow: 2,
                                mt: 1,
                            }}
                        />
                    )}
                </Box>
            )}
        />
    );
}