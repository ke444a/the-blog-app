import Box from "@mui/material/Box";
import CustomContainer from "../components/ui/CustomContainer";
import { PostContext } from "../context/PostContext";
import PostList from "../components/ui/PostList";

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
                    <PostList />
                </Box>
            </CustomContainer>
        </PostContext.Provider>
    );
};

export default Home;