import { GlobalStyles, Theme } from "@mui/material";

const styles = (theme: Theme) => ({
    body: {
        [theme.breakpoints.down("lg")]: {
            fontSize: 14,
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: 20,
        },
        [theme.breakpoints.up(2200)]: {
            fontSize: 24,
        },
    },
    ".MuiSvgIcon-root": {
        [theme.breakpoints.down("md")]: {
            fontSize: "16px",
        },
    },
    ".active": {
        fontWeight: 500,
    },
});

export const globalStyles = <GlobalStyles styles={styles} />;
