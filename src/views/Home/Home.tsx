import Navbar from "../../components/Navbar";
import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../helpers/ToastHelpers";
import BalloonTable from "../../components/BalloonTable";

export default function Home() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loggedInUsername = localStorage.getItem("username");
        if (!loggedInUsername) {
            navigate("/login", { replace: true });
            // errorToast("No user logged in");
        } else {
            // eslint-disable-next-line
            const fetchData = async () => {
                setLoading(true);
                const res = await fetch(
                    `${process.env.REACT_APP_INVENTORY_API_ENDPOINT}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: loggedInUsername,
                        }),
                    }
                );
                const data = await res.json();
                if (data.error) {
                    errorToast(data.error);
                }
                setInventory(data);
                setLoading(false);
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <Navbar />
            {!loading && <BalloonTable data={inventory} />}
        </>
    );
}
