import Box from "@mui/material/Box";
import CustomContainer from "../components/ui/CustomContainer";
import { PostContext } from "../context/PostContext";
import PostFeed from "../components/ui/PostFeed";

const Home = () => {    
    return (
        <PostContext.Provider value="homepage">
            <CustomContainer>
                <Box
                    sx={{
                        margin: "15px 0",
                        padding: "20px"
                    }}
                >
                    <PostFeed />
                </Box>
            </CustomContainer>
        </PostContext.Provider>
    );
};

export default Home;