import { Backdrop, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { successToast, errorToast } from "../helpers/ToastHelpers";

export default function BalloonTable({ data }: any) {
    const [rows, setRows] = useState(data);
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "title",
            headerName: "Title",
            width: 500,
            editable: false,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 100,
            editable: true,
        },
        {
            field: "size",
            headerName: "Size",
            width: 150,
            editable: false,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.size ? +params.row.size + "''" : ""}`,
        },
        {
            field: "unit_price",
            headerName: "Unit Price",
            width: 100,
            editable: false,
            valueGetter: (params: GridValueGetterParams) =>
                `${(+params.row.unit_price).toFixed(2)}`,
        },
    ];

    const updateQuantity = async (params: any, e: any) => {
        const value = e.target.value;
        const { id, field } = params;
        try {
            await axios(
                `${process.env.REACT_APP_API_ENDPOINT}/inventory/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        id,
                        field,
                        value,
                    }),
                }
            );
        } catch (err: any) {
            errorToast(err);
        }
    };

    const handleSelectionChange = (params: any) => {
        setSelectedRows(params);
    };

    const handleDelete = async () => {
        if (selectedRows.length === 0) {
            errorToast("No rows selected");
            return;
        }
        try {
            const res = await axios(
                `${process.env.REACT_APP_API_ENDPOINT}/inventory/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        ids: selectedRows,
                    }),
                }
            );
            const data = await res.data;
            setRows(data);
        } catch (err: any) {
            errorToast(err);
        }
    };

    return (
        <>
            {data && data.length > 0 && (
                <Box sx={{ height: "70vh", overflow: "scroll" }}>
                    <DataGrid
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    id: false,
                                },
                            },
                        }}
                        rows={rows}
                        columns={columns}
                        onCellEditStop={updateQuantity}
                        onRowSelectionModelChange={handleSelectionChange}
                        disableRowSelectionOnClick
                        checkboxSelection
                    />
                </Box>
            )}
            <button
                className="submitButton"
                style={{ marginTop: "1rem", width: "6rem" }}
                onClick={handleDelete}
            >
                Delete
            </button>
            {!loading && (
                <button
                    className="submitButton"
                    style={{ marginTop: "1rem", width: "6rem" }}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            const res = await axios.get(
                                `${process.env.REACT_APP_API_ENDPOINT}/inventory/fetch`,
                                {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                            setLoading(false);
                            if (res.data === "True") {
                                successToast("Data fetched successfully");
                            }
                        } catch (err: any) {
                            setLoading(false);
                            errorToast("Error fetching data");
                        }
                    }}
                >
                    Fetch
                </button>
            )}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" component="div">
                        Please wait...It may take up to 2 minutes
                    </Typography>
                    <CircularProgress color="inherit" />
                </div>
            </Backdrop>
        </>
    );
}
