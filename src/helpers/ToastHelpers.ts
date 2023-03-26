import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function errorToast(toastText: string) {
    toast.error(toastText, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export function successToast(toastText: string) {
    toast.success(toastText, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
