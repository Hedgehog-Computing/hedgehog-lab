/*
  Table is the data tructure that's designed for tabular data 
  such as CSV file or matrix in CSV format as data frame
*/

import * as csv from 'csv/lib/sync';

export class Table {
  // 2D string contains the table cells
  cells: string[][];

  // row number
  rows: number;

  // column number
  cols: number;

  // array of string that contains header cells
  headers: string[];

  // containsHeaders is true if this table contains headers
  containsHeaders: boolean;

  /* The constructor contains three parameters: 
    1. input a. raw csv string or b. 2-D string array as the raw data
    2. boolean header? if it contains headers
  */
  constructor(input?: string | string[][] | Table, header?: boolean) {
    if (header === undefined) {
      this.containsHeaders = false;
    } else {
      this.containsHeaders = header;
    }
    this.cells = new Array(0);
    this.rows = 0;
    this.cols = 0;
    this.headers = new Array(0);
    if (typeof input === 'string') {
      const records = (csv.parse as any)(input, {
        columns: false,
        skip_empty_lines: true,
        quote: '"',
        ltrim: true,
        rtrim: true,
        delimiter: ','
      });
      this.cells = records;
      this.rows = records.length;
      this.cols = this.rows === 0 ? 0 : records[0].length;
    } else if (input instanceof Array) {
      this.cells = input;
      this.rows = input.length;
      this.cols = this.rows === 0 ? 0 : input[0].length;
      this.headers = new Array(0);
    }

    // craete headers if it exists
    if (this.containsHeaders === true) {
      // fetch the first array in cells into headers
      if (this.cells.length > 1) {
        this.headers = this.cells[0];
        const newCells: string[][] = [];
        for (let idx = 1; idx < this.cells.length; idx++) {
          newCells.push(this.cells[idx]);
        }
        this.cells = newCells;
      } else {
        throw 'If "containsHeaders" is set as true, the table must contains at least one row.';
      }
    }
  }

  /**
   * Insert a new row (array of string) at the end of table.
   */
  insert(newTuple: string[]): void {
    if (newTuple.length === this.cols) {
      this.cells.push(newTuple);
    } else {
      throw (
        'The length of new tuple inserting to the table is ' +
        newTuple.length +
        ' but the columns of table is ' +
        this.cols +
        '. Please make  sure that they are with the same length.'
      );
    }
  }
}
