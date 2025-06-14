export interface Error {
   type: string;
   code: string;
   message: string;
   row: number;
}

export interface Meta {
   delimiter: string; // Delimiter used
   linebreak: string; // Line break sequence used
   aborted: boolean; // Whether process was aborted
   fields: string[]; // Array of field names
   truncated: boolean; // Whether preview consumed all input
   renamedHeaders: string; // Headers that are automatically renamed by the library to avoid duplication. {Column 1_1: 'Column 1' // the later header 'Column 1' was renamed to 'Column 1_1'}
}

export interface ProcessedData {
   data: [string[]];
   error: Error[];
   meta: Meta;
}

export interface FileData {
   file: File;
   processedData: ProcessedData;
}
