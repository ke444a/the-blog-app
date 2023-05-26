import { useEffect, useRef } from "react";
import { ToastOptions, toast } from "react-toastify";

interface IToastMessage {
    type: string;
    message: string;
}

export const ToastMessage = ({ type, message }: IToastMessage) => {
    const isMountedRef = useRef(false);
    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const showToast = () => {
            const toastConfig: ToastOptions = {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            };
            if (type === "error") {
                toast.error(message, toastConfig);
            } else if (type === "info") {
                toast.info(message, toastConfig);
            }
        };
        showToast();
    }, []);

    return null;
};