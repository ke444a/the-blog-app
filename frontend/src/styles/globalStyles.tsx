import { GlobalStyles, Theme } from "@mui/material";

const styles = (theme: Theme) => ({
    body: {
        [theme.breakpoints.down("lg")]: {
            fontSize: 14,
        },
    },
    ".MuiSvgIcon-root": {
        [theme.breakpoints.down("md")]: {
            fontSize: "16px",
        },
    },
    ".active": {
        fontWeight: 700,
    },

});

export const globalStyles = <GlobalStyles styles={styles} />;
 