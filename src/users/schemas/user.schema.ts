import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true, maxlength: 30},
  email: {type: String, unique: true, required: true, maxlength: 255},
  password: {type: String, required: true, maxlength: 30, minlength: 6},
  isActive: { type: Boolean, default: true},
  createdAt: { type: Date, default: Date.now }
});