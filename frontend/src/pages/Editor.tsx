import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomContainer from "../components/ui/CustomContainer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { CreatePostForm } from "../components/form/CreatePostForm";
import { useState } from "react";
import RenderedPost from "../components/ui/RenderedPost";

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

    const handleSwitch = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <CustomContainer>
            <Box
                sx={{
                    margin: "1.5em 0",
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleSwitch}>
                        <Tab label="Write" />
                        <Tab label="Preview" />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <CreatePostForm
                        user={useSelector(selectCurrentUser)}
                        setTitle={setTitle}
                        setContent={setContent}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{
                        border: (title || content) && "1px solid #333",
                        borderRadius: "5px",
                        padding: "20px",
                        marginTop: "15px"
                    }}>
                        <RenderedPost title={title} content={content} />
                    </Box>
                </TabPanel>
            </Box>
        </CustomContainer>
    );
};

export default Editor;