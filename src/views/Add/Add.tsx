import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/LoginLogoutService";
import logo from "../../assets/logo.png";
import "./Add.css";
import Navbar from "../../components/Navbar";

export default function Login() {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState<number | null>(null);
    const [unitPrice, setUnitPrice] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleAddItem(e: any) {
        e.preventDefault();
        await fetch(`${process.env.REACT_APP_INVENTORY_API_ENDPOINT}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                quantity,
                size: size ? size : null,
                unitPrice: unitPrice ? unitPrice : null,
            }),
        });
        navigate("/home", { replace: true });
    }

    return (
        <>
            <Navbar />
            <div className="addContainer">
                <form
                    className="formBackground"
                    onSubmit={(e) => handleAddItem(e)}
                >
                    <h1>Add item</h1>
                    <input
                        className="textBox"
                        placeholder="title"
                        name="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="textBox"
                        placeholder="quantity"
                        name="quantity"
                        type="number"
                        onChange={(e) => setQuantity(+e.target.value)}
                    />
                    <input
                        className="textBox"
                        placeholder="size in inches"
                        name="size"
                        type="number"
                        onChange={(e) => setSize(+e.target.value)}
                    />
                    <input
                        className="textBox"
                        placeholder="unit price"
                        name="unit-price"
                        type="text"
                        onChange={(e) => setUnitPrice(e.target.value)}
                    />
                    <button className="submitButton" type="submit">
                        Add Item
                    </button>
                </form>
            </div>
        </>
    );
}
