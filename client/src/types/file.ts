
export interface Error {
   type: string;
   code: string;
   message: string;
   row: number;
}

export interface FileData {
   name: string;
   type: string;
   size: number;
   delimiter?: string; // Delimiter used
   json: string[][];
}


