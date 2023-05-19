import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

interface IInputField extends React.ComponentProps<typeof TextField> {
    name: string;
    control: Control;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
}

export const FormInputField = (props: IInputField) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => <TextField {...field} {...props} />}
            defaultValue=""
            rules={{ required: props.required, maxLength: props.maxLength }}
        />
    );
};
