import {isTableItem, OutputItem} from "@hedgehog/core";

import React, {useCallback, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Card} from "@mui/material";

interface TableComponentProps {
    tableItem: OutputItem;
}


const TableComponent: React.FC<TableComponentProps> = (
    props: TableComponentProps
) => {
    const {tableItem} = props;
    const currentTable = isTableItem(tableItem) ? tableItem.table : null;
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = React.useState<number>(20);

    const currentTableExtend = currentTable as any
    const currentTableOptions = currentTableExtend?.options;

    const [rowsPerPage, setRowsPerPage] = useState<number>(
        currentTableOptions?.rows || 10
    )
    const [tableHeader, setTableHeader] = useState<any>()
    const [tableCells, setTableCells] = useState<any>()

    const [allCells, setAllCells] = useState<string[][]>(
        currentTable?.cells || []
    );
    const [cells, setCells] = useState<string[][]>(
        currentTable?.cells || []
    );

    const handleChangePage = useCallback((event: any, newPage: number) => {
        setPage(newPage);
        setCells(
            allCells.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
        );
    }, [setPage, setCells, rowsPerPage, allCells])

    const handleChangeRowsPerPage = useCallback((event: any) => {
        const newRows = +event.target.value;
        setRowsPerPage(newRows);
        setPage(0);
        setCells(allCells.slice(0, newRows));
    }, [setRowsPerPage, setPage, setCells, allCells])

    const createSortHandler = useCallback((property: string) => (
        event: React.MouseEvent<unknown>
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    }, [orderBy, setOrder, setOrderBy, order])

    useEffect(() => {
        setPage(0);
        setRowsPerPage(currentTableOptions?.rows || 10);
        setOrder("asc");
        setOrderBy("");
    }, [currentTableOptions?.rows]);

    useEffect(() => {
        const copyHeader = currentTable?.headers && [...currentTable?.headers];
        const newTableHeader = copyHeader?.map((header: any, index) => ({
            field: `col` + index,
            headerName: header
        })) ?? []
        setTableHeader(newTableHeader)
    }, [currentTable?.headers])

    useEffect(() => {
        const copyCells = [...cells]
        const newCells = copyCells.map((cellRow: any, indexRow) => {
            return cellRow.map((cell: any, index: number) => ({[`col` + index]: cell}))
        })

        const res = newCells.map((cellRow: any, indexRow) => {
            return Object.assign({id: indexRow}, ...cellRow)
        })

        setTableCells(res)
        console.log(tableHeader)
        console.log(tableCells)
    }, [cells])

    return currentTable ? (
        <>
            <Card sx={{height: '80vh', my: 2}}>
                {(tableHeader && tableCells) && (<DataGrid
                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .MuiDataGrid-row': {
                            border: '1px solid #eeeeee',
                        }
                    }}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    getRowId={(row) => row.id}
                    columns={tableHeader}
                    rowsPerPageOptions={[20, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pagination
                    rows={tableCells}/>)}
            </Card>
        </>
    ) : null;
};

export default TableComponent;
