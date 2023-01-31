import axios from 'axios';
import { errorToast, successToast } from '../helpers/ToastHelpers';

export async function register(registerUsername: string, registerPassword: string) {
    let registerSuccessful = false;
    if (registerPassword?.length >= 8) {
        await axios.post(`${process.env.REACT_APP_USERS_API_ENDPOINT}/register`, {
            username: registerUsername,
            password: registerPassword
        })
        .then(res => {
            registerSuccessful = true;
            successToast(res.data.status);
        })
        .catch(err => errorToast(err.response.data.status));
    } else {
        errorToast("Password must be at least 8 characters");
    }
    return registerSuccessful;
}