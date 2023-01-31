import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function errorToast(toastText: string) {
    toast.error(toastText, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export function successToast(toastText: string) {
    toast.success(toastText, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}