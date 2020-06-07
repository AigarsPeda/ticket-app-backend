import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  role?: string;
  date?: Date;
  tickets?: any[];
  comparePassword(password: string): Promise<boolean>;
}
