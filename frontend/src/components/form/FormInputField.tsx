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
    const { name, control, required, maxLength, ...other } = props;

    return (
        <Controller
            name={name}
            control={control}
            {...other}
            render={({ field }) => <TextField {...field} {...props} />}
            defaultValue=""
            rules={{ required: required, maxLength: maxLength }}
        />
    );
};
