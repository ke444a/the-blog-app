import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { PostForm } from "./PostForm";
import RenderedPost from "./RenderedPost";
import { useGetSinglePostQuery } from "..";

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Box hidden={value !== index} {...other}>
            {children}
        </Box>
    );
};

const EditorTabs = (props: { postId?: string; isEdit?: boolean }) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [postImg, setPostImg] = useState<string | File>("");
    const [preview, setPreview] = useState<string>("");
    const { data: post } = useGetSinglePostQuery(props.postId);

    const handleTabSwitch = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setTabValue(newValue);
    };

    return (
        <Box
            sx={(theme) => ({
                margin: theme.spacing(3, 0),
            })}
        >
            <Box>
                <Tabs value={tabValue} onChange={handleTabSwitch}>
                    <Tab label="Write" sx={{ fontSize: "1em" }} />
                    <Tab label="Preview" sx={{ fontSize: "1em" }} />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <PostForm
                    id={post?.id}
                    setTitle={setTitle}
                    setContent={setContent}
                    setPostImg={setPostImg}
                    setPreview={setPreview}
                    title={post?.title}
                    preview={post?.preview}
                    content={post?.content}
                    postImg={post?.postImg}
                    isEdit={props.isEdit}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <RenderedPost
                    title={title}
                    content={content}
                    preview={preview}
                    postImg={postImg}
                />
            </TabPanel>
        </Box>
    );
};

export default EditorTabs;
