import Navbar from "../../components/Navbar";
import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../helpers/ToastHelpers";
import BalloonTable from "../../components/BalloonTable";
import { Typography } from "@mui/material";
import { isAdmin, isLoggedIn } from "../../services/LoginLogoutService";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState();
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const loggedInUsername = localStorage.getItem("username");
        if (!loggedInUsername) {
            navigate("/login", { replace: true });
        } else {
            const check = async () => {
                const loginSuccessful = await isLoggedIn(loggedInUsername);
                if (loginSuccessful) {
                    const userIsAdmin = await isAdmin(loggedInUsername);
                    if (userIsAdmin) setAdmin(true);
                } else {
                    localStorage.clear();
                    navigate("/login", { replace: true });
                }
            };
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios(
                        `${process.env.REACT_APP_API_ENDPOINT}/inventory`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            data: {
                                username: loggedInUsername,
                            },
                        }
                    );
                    const data = await res.data;
                    setInventory(data);
                } catch (err: any) {
                    errorToast(err);
                }
                setLoading(false);
            };
            check();
            fetchData();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar admin={admin} />
            {loading && (
                <Typography textAlign="center" variant="h4">
                    Loading...
                </Typography>
            )}
            {!loading && <BalloonTable data={inventory} />}
        </>
    );
}
