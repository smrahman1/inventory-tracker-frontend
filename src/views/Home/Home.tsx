import Navbar from "../../components/Navbar";
import "./Home.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../helpers/ToastHelpers";

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUsername = localStorage.getItem("username");
        if (!loggedInUsername) {
            navigate("/login", { replace: true });
            // errorToast("No user logged in");
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <Navbar />
            <div id="content">Inventory Tracker</div>
        </>
    );
}
