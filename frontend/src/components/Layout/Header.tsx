import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
    return (
        <Box
            sx={(theme) => ({
                padding: theme.spacing(3, 0),
                textAlign: "center",
                borderBottom: "1px solid rgba(0,0,0,0.34)",
            })}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    textTransform: "uppercase",
                    fontSize: { xs: "6em", sm: "8em", lg: "10em" },
                }}
            >
                THE BLOG
            </Typography>
        </Box>
    );
};

export default Header;
