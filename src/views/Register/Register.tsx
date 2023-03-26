import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/RegisterService";
import logo from "../../assets/logo.png";
import "../../index.css";
import { isLoggedIn } from "../../services/LoginLogoutService";

export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();

    async function registerUser(e: any) {
        e.preventDefault();
        if (registerUsername?.length > 0 && registerPassword?.length > 0) {
            const registerSuccessful = await register(
                registerUsername,
                registerPassword
            );
            if (registerSuccessful) navigate("/login", { replace: true });
        }
    }

    useEffect(() => {
        const check = async () => {
            const storeId = localStorage.getItem("username");
            if (storeId) {
                const loginSuccessful = await isLoggedIn(storeId);
                if (!loginSuccessful) {
                    localStorage.clear();
                    navigate("/login", { replace: true });
                }
            } else {
                navigate("/login", { replace: true });
            }
        };
        check();
    }, []);

    return (
        <div className="centeredContainer">
            <form className="formBackground" onSubmit={(e) => registerUser(e)}>
                <img
                    src={logo}
                    style={{ height: "70px", padding: "20px" }}
                    alt="logo"
                />
                <input
                    className="textBox"
                    placeholder="username"
                    name="username"
                    type="text"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    className="textBox"
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button className="submitButton" type="submit">
                    Register
                </button>
            </form>
            <Link to="/login">Already have an account?</Link>
        </div>
    );
}
