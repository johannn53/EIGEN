/**
 * @swagger
 * /books/all-books:
 *   get:
 *     summary: Get all available books (not borrowed)
 *     description: Retrieves a list of books that are currently available and not borrowed.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of available books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the book.
 *                         example: "61234abcde1234"
 *                       title:
 *                         type: string
 *                         description: The title of the book.
 *                         example: "The Great Gatsby"
 *                       author:
 *                         type: string
 *                         description: The author of the book.
 *                         example: "F. Scott Fitzgerald"
 *                       stock:
 *                         type: integer
 *                         description: The number of copies available.
 *                         example: 3
 *       500:
 *         description: Failed to fetch books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch books."
 */

export {};
