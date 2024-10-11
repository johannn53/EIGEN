// IMPORT LIBRARY
import express from 'express';

// IMPORT MODULE
import { getAllMembers, memberBorrowBook, memberReturningBorrowedBooks } from './member.controller';

const router = express.Router();

// ROOUTER LIST
router.get('/all-members', getAllMembers);
router.post('/borrow-books', memberBorrowBook);
router.post('/return-books', memberReturningBorrowedBooks);

// EXPORT MODULE
export default router;
