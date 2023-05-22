import { styled } from "@mui/material";
import Container from "@mui/material/Container";

const CustomContainer = styled(Container)({
    "@media (min-width: 640px)": {
        maxWidth: "85%"
    },
    width: "100%"
});

export default CustomContainer;
