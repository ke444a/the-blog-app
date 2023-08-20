import Box from "@mui/material/Box";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import PostFeed from "../../posts/components/PostFeed";
import Header from "../../../components/Layout/Header";
import { Typography } from "@mui/material";

const Home = () => {
    return (
        <CustomContainer>
            <Header />
            <Box
                sx={(theme) => ({
                    [theme.breakpoints.up("sm")]: {
                        paddingX: "20px",
                        margin: "15px 0",
                    },
                    padding: "20px 0",
                })}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "600",
                        mb: 3,
                    }}
                >
                    Latest posts
                </Typography>
                <PostFeed />
            </Box>
        </CustomContainer>
    );
};

export default Home;
