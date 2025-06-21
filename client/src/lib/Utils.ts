import { filesize } from 'filesize';
import Papa from 'papaparse';
import type { FileData } from 'types/file';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';
import SqlString from 'sqlstring';

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
   let fileData: FileData | null = null;
   let workbook: WorkBook | null = null;
   let sheetName: string | null = null;
   let worksheet: WorkSheet | null = null;
   let fileType = file.type || '';

   if (!fileType && file.name.endsWith('.tsv')) {
      fileType = 'text/tab-separated-values';
   }

   switch (fileType) {
      case 'text/csv':
      case 'text/tab-separated-values':
      case 'text/plain':
         // handle text files (CSV, TSV, TXT)
         const result = Papa.parse(await file.text(), { preview: 5 });
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

export const jsonToXML = (
   json: string[][],
   rootName: string = 'root',
   itemName: string = 'item'
) => {
   let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;
   json.forEach((item) => {
      xml += `  <${itemName}>\n`;
      Object.entries(item).forEach(([key, value]) => {
         xml += `    <${key}>${value}</${key}>\n`;
      });
      xml += `  </${itemName}>\n`;
   });
   xml += `</${rootName}>`;
   return xml;
};

// Helper function to infer SQL data type from JavaScript value
const inferSQLType = (value: string | number | boolean | Date) => {
   if (typeof value === 'string') {
      const length = value.length > 255 ? 255 : value.length || 50;
      return `VARCHAR(${length})`;
   } else if (Number.isInteger(value)) {
      return 'INT';
   } else if (typeof value === 'number') {
      return 'FLOAT';
   } else if (typeof value === 'boolean') {
      return 'BIT';
   } else if (value instanceof Date) {
      return 'DATETIME';
   } else {
      return 'TEXT'; // Fallback for complex or null values
   }
};

export const jsonToSQL = (filename: string, json: string[][]) => {
   try {
      // Parse JSON input
      if (!Array.isArray(json) || json.length === 0) {
         throw new Error('Input must be a non-empty array of objects');
      }

      // Get column names and types from the first object
      const columns = Object.keys(json[0]).map((key) => {
         // @ts-ignore
         const value = json[0][key]; // as keyof (typeof json)[0]];
         const sqlType = inferSQLType(value);
         return `${key} ${sqlType}`;
      });

      // Generate CREATE TABLE statement
      const tableName = filename.split('.', filename.lastIndexOf('.'))[0].replace(/\W+/g, '_').toUpperCase(); // Sanitize table name
      const createTableSQL = `CREATE TABLE ${tableName} (\n${columns.join(',\n')}\n);`;

      // Generate INSERT INTO statements
      const insertSQL = json
         .map((row) => {
            const keys = Object.keys(row).map((key) => key);
            const values = Object.values(row).map((value) => SqlString.escape(value));
            return `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${values.join(', ')});`;
         })
         .join('\n');

      // Combine SQL statements
      return `-- SQL Insert statements generated from ${filename}\n\n${createTableSQL}\n\n${insertSQL}`;
   } catch (error: unknown) {
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
   }
};
