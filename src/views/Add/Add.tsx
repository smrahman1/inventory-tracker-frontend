import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add.css";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function Login() {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState<number | null>(null);
    const [unitPrice, setUnitPrice] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleAddItem(e: any) {
        e.preventDefault();
        await axios(`${process.env.REACT_APP_API_ENDPOINT}/inventory/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                title,
                quantity,
                size: size ? size : null,
                unitPrice: unitPrice ? unitPrice : null,
            }),
        });
        navigate("/", { replace: true });
    }

    return (
        <>
            <Navbar admin={false} />
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
