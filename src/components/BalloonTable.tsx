import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { errorToast } from "../helpers/ToastHelpers";

export default function BalloonTable({ data }: any) {
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
                `${params.row.size || ""}`,
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
        const res = await fetch(
            `${process.env.REACT_APP_INVENTORY_API_ENDPOINT}/update`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    field,
                    value,
                }),
            }
        );
        const data = await res.json();
        if (data.error) {
            errorToast(data.error);
        }
    };

    return (
        <>
            {data && data.length > 0 && (
                <Box sx={{ height: "80vh", overflow: "scroll" }}>
                    <DataGrid
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    id: false,
                                },
                            },
                        }}
                        rows={data}
                        columns={columns}
                        onCellEditStop={updateQuantity}
                        disableRowSelectionOnClick
                    />
                </Box>
            )}
        </>
    );
}
