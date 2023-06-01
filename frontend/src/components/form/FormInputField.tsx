import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";
import { useMediaQuery, Theme } from "@mui/material";

interface IInputField extends React.ComponentProps<typeof TextField> {
    name: string;
    control: Control;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
}

export const FormInputField = (props: IInputField) => {
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));  

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <TextField
                    size={isSmallScreen ? "small" : "medium"}
                    InputProps={{
                        style: {
                            fontSize: isSmallScreen ? ".85em" : "1.2em",
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: isSmallScreen ? ".85em" : "1.2em",
                        },
                    }}
                    {...field}
                    {...props}
                />
            )}
            defaultValue=""
            rules={{ required: props.required, maxLength: props.maxLength }}
        />
    );
};
