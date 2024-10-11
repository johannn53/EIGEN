// IMPORT LIBRARY
import { Request, Response } from 'express';
import moment from 'moment';

// IMPORT MODULE
import MemberModel from './member.entity';
import BookModel from '../book/book.entity';

/**
 * Fetches all active members from the database.
 *
 * @function getAllMembers
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Promise<any>} JSON response with members data or an error message.
 */
export const getAllMembers = async (req: Request, res: Response): Promise<any> => {
  try {
    const members = await MemberModel.find({ status: 'active' });

    // Check if no members found
    if (!members.length) {
      return res.json({
        status: 400,
        message: 'No member found!',
      });
    }

    // Return members data
    return res.json({
      status: 200,
      data: members,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch members.' });
  }
};

/**
 * Allows a member to borrow books if they meet certain conditions, such as not being penalized or exceeding the borrowing limit.
 *
 * @function memberBorrowBook
 *
 * @async
 * @param {Request} req - Express request object containing member ID and book IDs in the body.
 * @param {Response} res - Express response object used to return success or error messages.
 *
 * @returns {Promise<any>} JSON response with the borrowing status or an error message.
 */
export const memberBorrowBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { memberId, bookIds } = req.body;

    // Fetch member data
    const memberData = await MemberModel.findById(memberId);

    // *************** START Validation for member
    // If member not found
    if (!memberData) {
      return res.json({
        status: 200,
        message: 'Member not found',
      });
    }

    const now = moment();

    // Check if member penalized
    if (memberData.is_penalized) {
      // Check if penalty has expired
      if (memberData.penalty_end_date && moment(memberData.penalty_end_date).isAfter(now)) {
        return res.json({
          status: 200,
          message: `Member currently is being penalized untill ${moment(memberData.penalty_end_date).format('DD/MM/YYYY')}`,
        });
      } else {
        // If penalty is over, reset penalized status
        memberData.is_penalized = false;
        memberData.penalty_end_date = null; // Reset penalty end date
        await memberData.save(); // Save the updated member data
      }
    }

    // Check if member has 2 active borrowed books
    if (memberData.total_borrowed_books >= 2) {
      return res.json({
        status: 200,
        message: 'Member already have 2 borrowed books, Cant order more than 2 books',
      });
    }
    // *************** END Validation for member

    // find book data
    const booksData = await BookModel.find({ _id: { $in: bookIds } });

    // *************** START Validation for books
    // Check if books exist
    if (!booksData.length) {
      return res.status(200).json({
        status: 400,
        message: 'Book not found',
      });
    }

    // check if there's unavailable book to borrow
    const unavailableBooks = booksData.filter((book) => book.borrowed);

    // if there's unavailable book to borrow
    if (unavailableBooks.length) {
      return res.status(400).json({
        message: 'Some books are already borrowed by other members.',
        unavailableBooks: unavailableBooks.map((book) => book.title), // Return the titles of unavailable books
      });
    }

    // check total borrowed books by member in total
    const booksToBorrow = bookIds.length + memberData.total_borrowed_books;
    if (booksToBorrow > 2) {
      return res.status(403).json({
        message: 'You cannot borrow more than 2 books in total.',
      });
    }
    // *************** END Validation for books

    // Calculate the return deadline (7 days from today) for each book
    const borrowedBooksWithDeadlines = booksData.map((book) => {
      const returnDeadline = moment().add(7, 'days').toDate(); // Updated to use ISO format
      return {
        book_id: book._id,
        title: book.title,
        return_deadline: returnDeadline,
      };
    });

    // Update member data
    await MemberModel.updateOne(
      { _id: memberId }, // Find the member by their ID
      {
        $push: {
          borrowed_books: borrowedBooksWithDeadlines,
        },
        $set: {
          total_borrowed_books: booksToBorrow,
        },
      }
    );

    // Update books data
    for (const book of booksData) {
      const bookQuantityAfterBorrowed = book.stock - 1;

      // Update the book's stock in the database
      await BookModel.updateOne({ _id: book._id }, { $set: { stock: bookQuantityAfterBorrowed } });

      // If the stock becomes 0, mark the book as borrowed
      if (bookQuantityAfterBorrowed === 0) {
        await BookModel.updateOne({ _id: book._id }, { $set: { borrowed: true } });
      }
    }

    return res.json({
      status: 200,
      message: `Member sucessfully borrow ${bookIds.length} books`,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed when borrowing books.' });
  }
};

/**
 * Handles the process of returning borrowed books for a member. It checks if the member borrowed the books, returns them, and applies penalties if necessary.
 *
 * @function memberReturningBorrowedBooks
 *
 * @async
 * @param {Request} req - Express request object containing member ID and book IDs in the body.
 * @param {Response} res - Express response object used to return success or error messages.
 *
 * @returns {Promise<any>} JSON response indicating the status of the book return process, including penalties if applicable.
 */
export const memberReturningBorrowedBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const { memberId, bookIds } = req.body;

    // Fetch member data
    const memberData = await MemberModel.findById(memberId);

    // Check if member data exist
    if (!memberData) {
      return res.json({
        status: 404,
        message: 'Member not found',
      });
    }

    // Check if the member has borrowed the books and that all bookIds are valid
    const borrowedBooks = memberData.borrowed_books.filter((borrowedBook) => bookIds.includes(borrowedBook.book_id.toString()));

    // If not all books in bookIds are borrowed by the member
    if (borrowedBooks.length !== bookIds.length) {
      return res.json({
        status: 400,
        message: 'Some books are not borrowed by this member.',
      });
    }

    // Variables to track late returns and penalties
    let isPenalized = false;
    const today = moment();

    // Loop borrowed book
    for (const borrowedBook of borrowedBooks) {
      const returnDeadline = moment(borrowedBook.return_deadline);

      // If the book is returned late, apply a penalty
      if (today.isAfter(returnDeadline)) {
        isPenalized = true;
      }

      // Update book model
      await BookModel.updateOne({ _id: borrowedBook.book_id }, { $inc: { stock: 1 }, $set: { borrowed: false } });
    }

    // Remove the returned books from the member's borrowed_books array
    const updatedBorrowedBooks = memberData.borrowed_books.filter((borrowedBook) => !bookIds.includes(borrowedBook.book_id.toString()));

    // Update the member's borrowed_books and total_borrowed_books
    const updateData: any = {
      borrowed_books: updatedBorrowedBooks,
      total_borrowed_books: updatedBorrowedBooks.length,
    };

    // Check if member is being penalized
    if (isPenalized) {
      // Set penalty_end_date for 3 days from now if there's a penalty
      const penaltyEndDate = moment().add(3, 'days').toDate();
      updateData.is_penalized = true;
      updateData.penalty_end_date = penaltyEndDate;
    }

    // Update member data
    await MemberModel.updateOne({ _id: memberId }, { $set: updateData });

    return res.json({
      status: 200,
      message: 'Books returned successfully',
      penalized: isPenalized,
      penalty_end_date: isPenalized ? moment(updateData.penalty_end_date).format('DD/MM/YYYY') : null,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: 'Error when returning books',
    });
  }
};
