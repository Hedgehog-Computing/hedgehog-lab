import {
  OutputItem,
  isTableItem,
} from '@hedgehog/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Output from '../Output';

interface TableComponentProps {
  tableItem: OutputItem
}

const useStyles = makeStyles({
  table: {
    minWidth: 50,
  },
});


const TableComponent : React.FC<TableComponentProps> = (props: TableComponentProps) => {
  const {tableItem} = props;
  const currentTable = isTableItem(tableItem)? tableItem.table : null;
  const classes = useStyles();

  return ( 
  <TableContainer component={Paper}>
    <Table stickyHeader className={classes.table}  aria-label="a dense table">
      <TableHead>
        <TableRow>
          {currentTable?.headers.map(eachHeader=>{
            return (<TableCell key={"headerOf"+eachHeader} size="small">{eachHeader}</TableCell>);
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        { currentTable?.cells.map(eachCellRow =>{
          return (<TableRow key={"rowOf"+eachCellRow[0]}> {
            eachCellRow.map(eachCell=>{
              return <TableCell key={"cellOf"+eachCell} size="small">{eachCell}</TableCell>;
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