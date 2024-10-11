// IMPORT LIBRARY
import { Router } from 'express';

// IMPORT MODULE
import { getAllBooks } from './book.controller';

const router = Router();

// Define book routes
router.get('/all-books', getAllBooks);

// EXPORT MODULE
export default router;
