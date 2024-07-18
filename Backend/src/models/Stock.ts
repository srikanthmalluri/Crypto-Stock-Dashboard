// src/models/Stock.ts
import { Schema, model } from 'mongoose';

const schema = new Schema({
  code: { type: String, required: true },
  rate: { type: Number, required: true },
  createdat: { type: Date, default: Date.now }
});

export const Stock = model('Stock', schema);
