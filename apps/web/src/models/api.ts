export interface ApiResult<T> {
   status: number;
   statusText: string;
   data: T;
}
