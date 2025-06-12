import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  username: string;
  name?: string;
  email: string;
  password: string;
}