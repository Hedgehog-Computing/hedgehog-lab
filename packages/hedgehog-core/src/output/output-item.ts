// each OutputItem represents one output item information
// which will be used to render a react component at output class
// which can be a string (into a react label)
// or a tuple of data and layout (into a figure of plotlyjs)
// and type is a string of "TEXT" or "DRAWING" or "TEX" or "FORMULA"

import { Table } from '../lib/table';

export type TextItem = {
  itemType: 'TEXT';
  text: string;
};

export const isTextItem = (item: OutputItem): item is TextItem => {
  return item.itemType === 'TEXT';
};

export type DrawingItem = {
  itemType: 'DRAWING';
  data: any;
  layout: any;
};

export type TableItem = {
  itemType: 'TABLE';
  table: Table;
};

export const isTableItem = (item: OutputItem): item is TableItem => {
  return item.itemType === 'TABLE';
};

export const isDrawingItem = (item: OutputItem): item is DrawingItem => {
  return item.itemType === 'DRAWING';
};

export type TeXItem = {
  itemType: 'TEX';
  text: string;
};

export const isTeXItem = (item: OutputItem): item is TeXItem => {
  return item.itemType === 'TEX';
};

export type FormulaItem = {
  itemType: 'FORMULA';
  text: string;
};

export const isFormulaItem = (item: OutputItem): item is FormulaItem => {
  return item.itemType === 'FORMULA';
};

export type MarkdownItem = {
  itemType: 'MARKDOWN';
  text: string;
};

export const isMarkdownItem = (item: OutputItem): item is MarkdownItem => {
  return item.itemType === 'MARKDOWN';
};

export type EChartItem = {
  itemType: 'ECHART';
  option: any;
};

export const isEChartItem = (item: OutputItem): item is MarkdownItem => {
  return item.itemType === 'ECHART';
};

export type OutputItem =
  | TextItem
  | DrawingItem
  | TeXItem
  | FormulaItem
  | MarkdownItem
  | TableItem
  | EChartItem;
