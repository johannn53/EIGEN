// IMPORT LIBRARY
import { Application } from 'express';

// IMPORT MODULE
import bookRouter from './domain/book/book.router';
import memberRouter from './domain/member/member.router';

// Function to register all routes
const registerRoutes = (app: Application): void => {
  app.use('/books', bookRouter);
  app.use('/member', memberRouter);
};

// EXPORT MODULE
export default registerRoutes;
