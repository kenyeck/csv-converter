import { filesize } from 'filesize';
import Papa from 'papaparse';
import type { FileData } from 'types/file';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';

export const messageTimeout = 5000;

export const getFileSizeAsString = (size: number) => {
   return filesize(size, { round: 0 });
};

export const getFileTypeAsString = (type: string) => {
   switch (type) {
      case 'text/csv':
         return 'CSV';
      case 'text/tab-separated-values':
         return 'TSV';
      case 'text/plain':
         return 'TXT';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
         return `Excel (xlsx)`;
      default:
         throw Error('unknown file type');
   }
};

export const getFileDelimiterAsString = (delimiter: string) => {
   switch (delimiter) {
      case ',':
         return 'Comma (,)';
      case '\t':
         return 'Tab (\\t)';
      case '|':
         return 'Pipe (|)';
      case ';':
         return 'Semicolon (;)';
      default:
         throw Error('unknown file type');
   }
};

export const processFile = async (file: File): Promise<FileData> => {
   var fileData: FileData | null = null;
   var workbook: WorkBook | null = null;
   var sheetName: string | null = null;
   var worksheet: WorkSheet | null = null;

   var fileType = file.type || '';
   if (!fileType && file.name.endsWith('.tsv')) {
      fileType = 'text/tab-separated-values';
   }

   switch (fileType) {
      case 'text/csv':
      case 'text/tab-separated-values':
      case 'text/plain':
         // handle text files (CSV, TSV, TXT)
         var result = Papa.parse(await file.text(), { preview: 5 });
         const delimiter = result.meta.delimiter ?? ',';
         workbook = read(await file.text(), { type: 'string', FS: delimiter });
         sheetName = workbook.SheetNames[0];
         worksheet = workbook.Sheets[sheetName];
         fileData = {
            name: file.name,
            type: fileType,
            size: file.size,
            delimiter: delimiter,
            json: utils.sheet_to_json(worksheet)
         };
         break;

      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
         // handle Excel files (xlsx, xls)
         workbook = read(await file.arrayBuffer(), { type: 'binary' });
         sheetName = workbook.SheetNames[0];
         worksheet = workbook.Sheets[sheetName];
         fileData = {
            name: file.name,
            type: fileType,
            size: file.size,
            json: utils.sheet_to_json(worksheet)
         };
         break;

      default:
         throw Error('unknown file type');
   }

   return fileData;
};
