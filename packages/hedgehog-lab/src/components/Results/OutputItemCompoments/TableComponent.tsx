import {isTableItem, OutputItem} from "@hedgehog/core";

import React, {useCallback, useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

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

    const currentTableExtend = currentTable as any
    const currentTableOptions = currentTableExtend?.options;

    const [rowsPerPage, setRowsPerPage] = useState<number>(
        currentTableOptions?.rows || 10
    )

    const [allCells, setAllCells] = useState<string[][]>(
        currentTable?.cells || []
    );
    const [cells, setCells] = useState<string[][]>(
        allCells.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        if (orderBy !== "" && currentTable) {
            const index = currentTable.headers.indexOf(orderBy);
            setAllCells(
                [...currentTable.cells].sort((a, b) =>
                    order === "asc"
                        ? Number(a[index]) - Number(b[index])
                        : Number(b[index]) - Number(a[index])
                )
            );
        }
    }, [order, orderBy, currentTable]);

    useEffect(() => {
        setPage(0);
        setRowsPerPage(currentTableOptions?.rows || 10);
        setCells(allCells.slice(0, currentTableOptions?.rows || 10));
    }, [allCells, setPage, setRowsPerPage, setCells, currentTableOptions?.rows]);

    return currentTable ? (
        <>
            <TableContainer component={Paper}>
                <Table
                    stickyHeader
                    sx={{minWidth: '50px'}}
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            {currentTable.headers.map((eachHeader) => {
                                return (
                                    <TableCell key={"headerOf" + eachHeader}>
                                        <TableSortLabel
                                            active={orderBy === eachHeader}
                                            direction={orderBy === eachHeader ? order : "asc"}
                                            onClick={createSortHandler(eachHeader)}>
                                            {eachHeader}
                                        </TableSortLabel>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cells.map((eachCellRow, i) => {
                            return (
                                <TableRow
                                    sx={{
                                        transition: 'box-shadow .2s,transform .2s',
                                        ":hover": {
                                            boxShadow: '0 3px 15px -2px rgb(0 0 0 / 12%)',
                                            transform: 'translateY(-4px)'
                                        }
                                    }}
                                    key={"rowOf" + eachCellRow[0] + Date.now().toString() + i}>
                                    {" "}
                                    {eachCellRow.map((eachCell) => {
                                        return (
                                            <TableCell key={"cellOf" + eachCell}>
                                                {eachCell}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={Array.from(
                    new Set(
                        [
                            10,
                            25,
                            100,
                            ...(currentTableOptions?.rows
                                ? [currentTableOptions.rows]
                                : []),
                        ].sort((a, b) => a - b)
                    )
                )}
                component='div'
                count={currentTable.cells.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    ) : null;
};

export default TableComponent;
