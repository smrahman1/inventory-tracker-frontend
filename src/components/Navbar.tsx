import { useNavigate } from "react-router-dom";
import { logout } from "../services/LoginLogoutService";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { Button } from "@mui/material";

export default function Navbar() {
    const navigate = useNavigate();

    const logoutUser = async () => {
        const logoutSuccessful = await logout();
        if (logoutSuccessful) navigate("/login", { replace: true });
    };

    return (
        <div id="header">
            <img
                src={logo}
                id="logo"
                alt="logo"
                onClick={() => navigate("/")}
            />
            <button
                className="submitButton"
                style={{ width: "6rem" }}
                onClick={() => navigate("/add")}
            >
                Add Item
            </button>
            <div>
                <span
                    style={{
                        fontSize: "0.9rem",
                        fontStyle: "oblique",
                        marginRight: "15px",
                    }}
                >
                    {localStorage.getItem("username")}
                </span>
                <button
                    className="submitButton"
                    style={{ width: "70px" }}
                    onClick={() => logoutUser()}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
