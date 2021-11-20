import {isTableItem, OutputItem,} from '@hedgehog/core';

import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableComponentProps {
    tableItem: OutputItem
}

const useStyles = makeStyles({
    table: {
        minWidth: 50,
    },
});


const TableComponent: React.FC<TableComponentProps> = (props: TableComponentProps) => {
    const {tableItem} = props;
    const currentTable = isTableItem(tableItem) ? tableItem.table : null;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {currentTable?.headers.map(eachHeader => {
                            return (<TableCell key={"headerOf" + eachHeader} size="small">{eachHeader}</TableCell>);
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentTable?.cells.map(eachCellRow => {
                        return (<TableRow key={"rowOf" + eachCellRow[0]}> {
                            eachCellRow.map(eachCell => {
                                return <TableCell key={"cellOf" + eachCell} size="small">{eachCell}</TableCell>;
                            })
                        }
                        </TableRow>);
                    })

                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;
