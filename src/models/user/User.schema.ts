import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String },
  date: { type: Date, default: Date.now },
});

export { userSchema };
