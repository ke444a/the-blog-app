import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";

const RenderedPost = (props: { title: string, content: string }) => {
    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    marginBottom: "15px",
                }}
            >
                {props.title}
            </Typography>
            <ReactMarkdown>
                {props.content}
            </ReactMarkdown>
        </>
    );
};

export default RenderedPost;
