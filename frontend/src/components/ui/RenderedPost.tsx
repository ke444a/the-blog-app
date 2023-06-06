import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Dispatch, SetStateAction } from "react";
import remarkGfm from "remark-gfm";

interface IRenderedPostProps {
  title: string;
  content: string;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  isEditAllowed?: boolean;
}

const RenderedPost = (props: IRenderedPostProps) => {
    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    marginY: "15px"
                }}
            >
                {props.title}
            </Typography>
            {props?.isEditAllowed && !props?.isEdit && 
                <Button
                    variant="outlined"
                    endIcon={<EditIcon />}
                    size="medium"
                    color="info"
                    onClick={() => props.setIsEdit ? props.setIsEdit(prevState => !prevState) : null}
                >
                    Edit
                </Button>
            }
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.content}
            </ReactMarkdown>
        </>
    );
};

export default RenderedPost;
