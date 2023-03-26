import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/LoginLogoutService";
import logo from "../../assets/logo.png";
import "../../index.css";
import { successToast } from "../../helpers/ToastHelpers";

export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    async function loginUser(e: any) {
        e.preventDefault();
        if (loginUsername?.length > 0 && loginPassword?.length > 0) {
            const loginSuccessful = await login(loginUsername, loginPassword);
            if (loginSuccessful) {
                successToast("Login Successful");
                navigate("/");
            }
        }
    }

    return (
        <div className="centeredContainer">
            <form className="formBackground" onSubmit={(e) => loginUser(e)}>
                <img
                    src={logo}
                    style={{ height: "150px", padding: "20px" }}
                    alt="logo"
                />
                <input
                    className="textBox"
                    placeholder="username"
                    name="username"
                    type="text"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    className="textBox"
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button className="submitButton" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
