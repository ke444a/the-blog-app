import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { CreatePostForm } from "../components/CreatePostForm";
import { useState } from "react";
import RenderedPost from "../components/RenderedPost";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            hidden={value !== index}
            {...other}
        >
            {children}
        </Box>
    );
};

const Editor = () => {
    const [value, setValue] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [postImage, setPostImage] = useState<string>("");

    const handleSwitch = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <CustomContainer>
            <Box
                sx={(theme) => ({
                    margin: theme.spacing(3, 0),
                })}
            >
                <Box>
                    <Tabs value={value} onChange={handleSwitch}>
                        <Tab label="Write" sx={{ fontSize: "1em" }} />
                        <Tab label="Preview" sx={{ fontSize: "1em" }}  />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <CreatePostForm
                        setTitle={setTitle}
                        setContent={setContent}
                        setPostImage={setPostImage}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RenderedPost
                        title={title}
                        content={content}
                        postImage={postImage}
                    />
                </TabPanel>
            </Box>
        </CustomContainer>
    );
};

export default Editor;