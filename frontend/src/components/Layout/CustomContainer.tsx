import { styled, ContainerProps } from "@mui/material";
import Container from "@mui/material/Container";

export const CustomContainer = styled(Container)<ContainerProps>(
    ({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
            maxWidth: "90%",
        },
        [theme.breakpoints.down("sm")]: {
            paddingX: 0,
        },
        maxWidth: "95%",
        width: "100%",
    }),
);
