import axios from "axios";
import { errorToast, successToast } from "../helpers/ToastHelpers";

export async function register(
    registerUsername: string,
    registerPassword: string
) {
    let registerSuccessful = false;
    if (registerPassword?.length >= 4) {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/users/register`,
                {
                    username: registerUsername,
                    password: registerPassword,
                }
            );

            registerSuccessful = true;
            successToast(res.data.status);
        } catch (err: any) {
            errorToast(err.response.data.status);
        }
    } else {
        errorToast("Password must be at least 4 characters");
    }
    return registerSuccessful;
}
