import axios from 'axios';
import { errorToast, successToast } from '../helpers/ToastHelpers';

export async function login(loginUsername: string, loginPassword: string) {
    let loginSuccessful = false;
    const loggedInUsername = localStorage.getItem('username');
    if (!loggedInUsername) {
        await axios.post(`${process.env.REACT_APP_USERS_API_ENDPOINT}/login`, {
            username: loginUsername,
            password: loginPassword
        })
        .then(res => {
            localStorage.setItem('username', loginUsername);
            loginSuccessful = true;
            successToast(res.data.status);
        })
        .catch(err => errorToast(err.response.data.status));
    } else {
        loginSuccessful = true;
        errorToast(`'${loggedInUsername}' is already logged in`);
    }
    return loginSuccessful;
}

export async function logout() {
    let logoutSuccessful = false;
    const loggedInUsername = localStorage.getItem('username');
    if (loggedInUsername) {
        await axios.post(`${process.env.REACT_APP_USERS_API_ENDPOINT}/logout`, {
            username: loggedInUsername
        })
        .then(res => {
            localStorage.clear();
            logoutSuccessful = true;
            successToast(res.data.status);
        })
        .catch(err => errorToast(err.response.data.status));
    } else {
        errorToast('There is no user logged in');
    }
    return logoutSuccessful;
}