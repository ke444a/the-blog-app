import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
    typography: {
        fontFamily: ["Open Sans", "Poppins"].join(","),
        h1: {
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "2.0em",
        },
        h2: {
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "1.8em",
        },
        h3: {
            fontWeight: 700,
            fontSize: "1.5em",
        },
        body2: {
            fontSize: 14,
        },
        fontSize: 16,
    },
    palette: {
        primary: {
            main: "#333",
        },
        secondary: {
            main: "#fffdfa",
        },
        error: {
            main: "#f8333c",
            dark: "#541d33",
        },
        info: {
            main: "#1D3354",
        },
    },
});

export default theme;
