import { Context, Markup } from 'telegraf';
import { doc } from '../core';

export const CELLS = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'];

export const getTable = async (ctx: Context) => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells(CELLS);

  const table = {} as Record<keyof typeof CELLS, string>;

  CELLS.forEach(async (item) => {
    const cell =  await sheet.getCellByA1(item);

    table[item as keyof typeof CELLS] = cell.value.toString();
  })

  // @ts-ignore
  ctx.session.table = table;
}

export const getCell = (key: string, ctx: Context): string => {
  // @ts-ignore
  return ctx.session.table[key];
}