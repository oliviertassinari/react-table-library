import { TableElementRef } from '@table-library/react-table-library/types/layout';

export const getHeaderColumns = (tableElementRef: TableElementRef): HTMLElement[] => {
  const thead = tableElementRef.current!.querySelector('.tr-header');

  return Array.from(thead?.querySelectorAll('.th') || []);
};

type Callback = (cell: HTMLElement, index: number, size: number) => void;

const applyToBaseColumns = (
  tableElementRef: TableElementRef,
  callback: Callback,
  containerSelector: string,
  selector: string,
) =>
  Array.from(tableElementRef.current!.querySelectorAll(containerSelector)).forEach((row) => {
    const rowCells = Array.from(row.querySelectorAll(selector)) as HTMLElement[];

    const size = rowCells.length;
    rowCells.forEach((cell, index) => callback(cell, index, size));
  });

export const applyToHeaderColumns = (tableElementRef: TableElementRef, callback: Callback) =>
  applyToBaseColumns(tableElementRef, callback, '.tr-header', '.th');

export const applyToColumns = (tableElementRef: TableElementRef, callback: Callback) =>
  applyToBaseColumns(tableElementRef, callback, '.tr-body', '.td');
