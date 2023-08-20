import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

export const Spinner = () => {
    const stylesOverride: CSSProperties = {
        display: "block",
        margin: "40px auto",
    };

    return <FadeLoader color="#333" cssOverride={stylesOverride} />;
};
