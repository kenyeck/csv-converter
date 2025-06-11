import Papa from 'papaparse';
import XLSX from 'xlsx';
import type { ProcessedData } from '../types/file';

export const parseCSV = (buffer: Buffer): Promise<ProcessedData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(buffer.toString(), {
      complete: (result) => {
        resolve({ data: result.data });
      },
      error: (error: unknown) => reject(error),
    });
  });
};

export const parseXLSX = (buffer: Buffer): ProcessedData => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  return { data };
};