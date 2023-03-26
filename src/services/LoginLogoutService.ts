import axios from "axios";
import { errorToast, successToast } from "../helpers/ToastHelpers";

export async function login(loginUsername: string, loginPassword: string) {
    let loginSuccessful = false;
    const username = localStorage.getItem("username");
    if (!username) {
        try {
            if (!process.env.REACT_APP_API_ENDPOINT) return;
            const res = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
                {
                    username: loginUsername,
                    password: loginPassword,
                }
            );
            localStorage.setItem("username", loginUsername);
            loginSuccessful = true;
            successToast(res.data.status);
        } catch (err: any) {
            errorToast(err.response.data);
        }
    } else {
        try {
            const isLogged = isLoggedIn(loginUsername);
            if (!isLogged) {
                errorToast("Token likely expired");
            } else {
                loginSuccessful = true;
                successToast(`'${username}' is already logged in`);
            }
        } catch (err: any) {
            errorToast("Token expired");
        }
    }
    return loginSuccessful;
}

export async function logout() {
    let logoutSuccessful = false;
    const loggedInUsername = localStorage.getItem("username");
    if (loggedInUsername) {
        try {
            const loginSuccessful = await isLoggedIn(loggedInUsername);
            if (loginSuccessful) {
                if (!process.env.REACT_APP_API_ENDPOINT) return;
                const res = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/users/logout`,
                    {
                        username: loggedInUsername,
                    }
                );
                localStorage.clear();
                logoutSuccessful = true;
                successToast(res.data.status);
            }
        } catch (err: any) {
            errorToast(err.response.data);
        }
    } else {
        errorToast("There is no user logged in");
    }
    return logoutSuccessful;
}

export async function isLoggedIn(loginUsername: string) {
    let loginSuccessful = false;
    try {
        if (!process.env.REACT_APP_API_ENDPOINT) return;
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users/me`, {
            username: loginUsername,
        });
        loginSuccessful = true;
    } catch (err: any) {
        console.log(err);
    }
    return loginSuccessful;
}
