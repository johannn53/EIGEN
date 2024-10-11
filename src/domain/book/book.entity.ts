// IMPORT LIBRARY
import mongoose, { Document, Schema } from 'mongoose';

// Define a TypeScript interface for Book
export interface IBook extends Document {
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowed: boolean;
}

// Define the Mongoose schema for Book
const BookSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  borrowed: {
    type: Boolean,
    default: false,
  },
});

// Create and export the Mongoose model for Book
const BookModel = mongoose.model<IBook>('Book', BookSchema);

// EXPORT MODULE
export default BookModel;
