import mongoose from "mongoose";

const ticketSchema: mongoose.Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tickedId: { type: String },
  fullName: { type: String },
  email: { type: String },
  status: { type: String, default: "Open" },
  department: { type: String },
  priority: { type: String },
  subject: { type: String },
  description: { type: String },
  created: { type: Date, default: Date.now },
  closed: { type: Boolean, default: false },
  dueDate: { type: Date },
});

export { ticketSchema };
