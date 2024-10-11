// ***** THIS FILE IS TO STORE DATA TO THE DATABASE

// IMPORT LIBRARY
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Book from './domain/book/book.entity';
import Member from './domain/member/member.entity';

// Load environment variables from .env file
dotenv.config();

// BOOKS DATA
const books = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
    borrowed: false,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
    borrowed: false,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
    borrowed: false,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
    borrowed: false,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
    borrowed: false,
  },
];

// MEMBER DATA
const members = [
  {
    code: 'M001',
    name: 'Angga',
    borrowed_books: [],
    penalty_end_date: null,
    is_penalized: false,
    total_borrowed_books: 0,
    status: 'active',
  },
  {
    code: 'M002',
    name: 'Ferry',
    borrowed_books: [],
    penalty_end_date: null,
    is_penalized: false,
    total_borrowed_books: 0,
    status: 'deleted',
  },
  {
    code: 'M003',
    name: 'Putri',
    borrowed_books: [],
    penalty_end_date: null,
    is_penalized: false,
    total_borrowed_books: 0,
    status: 'active',
  },
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed data into MongoDB
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing collections
    await Book.deleteMany({});
    await Member.deleteMany({});

    // Insert books and members
    await Book.insertMany(books);
    await Member.insertMany(members);

    console.log('Data successfully seeded!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
};

seedData();
