// IMPORT LIBRARY
import mongoose, { Document, Schema } from 'mongoose';

// Define a TypeScript interface for Member's borrowed books
export interface IBorrowedBook {
  book_id: mongoose.Types.ObjectId; // Reference to the book ID
  title: string;
  return_deadline: Date;
}

// Define a TypeScript interface for Member
export interface IMember extends Document {
  code: string;
  name: string;
  borrowed_books: Array<IBorrowedBook>; // Array of book IDs
  penalty_end_date?: Date | null;
  is_penalized: boolean;
  total_borrowed_books: number;
  status: string;
}

// Define the Mongoose schema for Member's borrowed books
const BorrowedBookSchema: Schema = new Schema({
  book_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Book', // Referencing the Book model
  },
  title: {
    type: String,
    required: true,
  },
  return_deadline: {
    type: Date,
    required: true,
  },
});

// Define the Mongoose schema for Member
const MemberSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Ensure code is unique
  },
  name: {
    type: String,
    required: true,
  },
  borrowed_books: [BorrowedBookSchema],
  penalty_end_date: {
    type: Date,
    default: null, // Default to null when no penalty is applied
  },
  is_penalized: {
    type: Boolean,
    default: false,
  },
  total_borrowed_books: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },
});

// Create and export the Mongoose model for Member
const MemberModel = mongoose.model<IMember>('Member', MemberSchema);

// EXPORT MODULE
export default MemberModel;
