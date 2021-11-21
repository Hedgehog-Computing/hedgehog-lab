import { isTableItem, OutputItem } from "@hedgehog/core";

import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

interface TableComponentProps {
  tableItem: OutputItem;
}

const useStyles = makeStyles({
  table: {
    minWidth: 50,
  },
});

const TableComponent: React.FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { tableItem } = props;
  const currentTable = isTableItem(tableItem) ? tableItem.table : null;
  const classes = useStyles();
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    currentTable?.options?.rows || 10
  );
  const [allCells, setAllCells] = useState<string[][]>(
    currentTable?.cells || []
  );
  const [cells, setCells] = useState<string[][]>(
    allCells.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    setCells(
      allCells.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
    );
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRows = +event.target.value;
    setRowsPerPage(newRows);
    setPage(0);
    setCells(allCells.slice(0, newRows));
  };

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setPage(0);
    setRowsPerPage(currentTable?.options?.rows || 10);
    setOrder("asc");
    setOrderBy("");
  }, [currentTable]);

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
  }, [order, orderBy]);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(currentTable?.options?.rows || 10);
    setCells(allCells.slice(0, currentTable?.options?.rows || 10));
  }, [allCells]);

  return currentTable ? (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {currentTable.headers.map((eachHeader) => {
                return (
                  <TableCell key={"headerOf" + eachHeader} size='small'>
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
                  key={"rowOf" + eachCellRow[0] + Date.now().toString() + i}>
                  {" "}
                  {eachCellRow.map((eachCell) => {
                    return (
                      <TableCell key={"cellOf" + eachCell} size='small'>
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
              ...(currentTable?.options?.rows
                ? [currentTable.options.rows]
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
