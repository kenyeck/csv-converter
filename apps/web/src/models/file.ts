
export enum FileType {
   CSV = 'text/csv',
   XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   XLS = 'application/vnd.ms-excel',
   TSV = 'text/tab-separated-values',
   Text = 'text/plain'
}

export enum FileDelimiter {
   Auto = 'auto',
   Comma = ',',
   Semicolon = ';',
   Tab = '\t',
   Pipe = '|',
   Hash = '#',
   Space = ' ',
   Custom = 'custom'
}

export enum FileEncoding {
   AUTO = 'auto',
   UTF8 = 'UTF-8',
   LATIN1 = 'LATIN-1',
   ASCII = 'ASCII'
}

export interface Error {
   type: string;
   code: string;
   message: string;
   row: number;
}

export interface FileData {
   name: string;
   type: FileType;
   size: number;
   delimiter?: FileDelimiter;
   encoding?: FileEncoding;
   json: Array<Record<string, string>>;
   pageSize?: number; // Number of rows per page
}


