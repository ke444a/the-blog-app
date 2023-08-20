import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        footer?: PaletteOptions["primary"];
        highlight?: PaletteOptions["primary"];
    }
}

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: "Inter",
        h1: {
            fontWeight: 700,
            fontSize: "2.0em",
        },
        h2: {
            fontWeight: 700,
            fontSize: "1.8em",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.4em",
        },
        body2: {
            fontSize: 14,
        },
    },
    palette: {
        primary: {
            main: "#1A1A1A",
        },
        secondary: {
            main: "#667085",
        },
        error: {
            main: "#f8333c",
            dark: "#541d33",
        },
        info: {
            main: "#1D3354",
        },
        footer: {
            main: "#F6F6F7",
        },
        highlight: {
            main: "#6941C6",
        },
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    fontSize: "1.2em",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "1.2em",
                },
            },
        },
    },
});

export default theme;
