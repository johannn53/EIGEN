// IMPORT LIBRARY
import { Request, Response } from 'express';

// IMPORT MODULE
import BookModel from './book.entity';

/**
 * Fetches all available books that are not currently borrowed.
 * 
 * @param {Request} req - The request object containing the HTTP request information.
 * @param {Response} res - The response object used to send a response back to the client.
 * 
 * @returns {Promise<any>} A promise that resolves to the response object, containing the status and book data or an error message.
 * 
 * @throws {500} If there is an error fetching the books, a 500 status code with an error message is returned. 
 */
export const getAllBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const books = await BookModel.find({ borrowed: 'false' });

    // Check if no books found
    if (!books.length) {
      return res.status(200).json({
        status: 200,
        message: 'All books borrowed!',
      });
    }

    // Return books data
    return res.status(200).json({
      status: 200,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
};
