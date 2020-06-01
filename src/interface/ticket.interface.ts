import mongoose from "mongoose";

export interface ITicket extends mongoose.Document {
  user: string;
  tickedId: string;
  fullName: string;
  email: string;
  status: string;
  department: string;
  priority: string;
  subject: string;
  description: string;
  created: Date;
  closed?: boolean;
  dueDate?: Date;
}
