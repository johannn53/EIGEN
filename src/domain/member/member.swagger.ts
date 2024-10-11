/**
 * @swagger
 * /member/all-members:
 *   get:
 *     summary: Get all active members
 *     description: Retrieves a list of members who are currently active.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: A list of active members.
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
 *                         description: The unique ID of the member.
 *                         example: "61234abcde5678"
 *                       name:
 *                         type: string
 *                         description: The name of the member.
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         description: The email of the member.
 *                         example: "john.doe@example.com"
 *                       status:
 *                         type: string
 *                         description: The status of the member (active/inactive).
 *                         example: "active"
 *       400:
 *         description: No member found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No member found!"
 *       500:
 *         description: Failed to fetch members.
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
 *                   example: "Failed to fetch members."
 */

/**
 * @swagger
 * /member/borrow-books:
 *   post:
 *     summary: Borrow books for a member
 *     description: Allows a member to borrow books, ensuring they are not penalized and do not exceed the borrowing limit.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: The unique ID of the member borrowing the books.
 *                 example: "61234abcde5678"
 *               bookIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the books to borrow.
 *                 example: ["61234abcde1234", "61234abcde5678"]
 *     responses:
 *       200:
 *         description: Books borrowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Member successfully borrowed 2 books"
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *                 unavailableBooks:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Titles of the books that are unavailable.
 *       403:
 *         description: Borrowing limit exceeded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "You cannot borrow more than 2 books in total."
 *       500:
 *         description: Failed to borrow books.
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
 *                   example: "Failed when borrowing books."
 */

/**
 * @swagger
 * /member/return-books:
 *   post:
 *     summary: Return borrowed books for a member
 *     description: Allows a member to return borrowed books and applies penalties if books are returned late.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: The unique ID of the member returning the books.
 *                 example: "61234abcde5678"
 *               bookIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the books to return.
 *                 example: ["61234abcde1234", "61234abcde5678"]
 *     responses:
 *       200:
 *         description: Books returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Books returned successfully"
 *                 penalized:
 *                   type: boolean
 *                   example: true
 *                 penalty_end_date:
 *                   type: string
 *                   format: date
 *                   example: "DD/MM/YYYY"
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Some books are not borrowed by this member."
 *       404:
 *         description: Member not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Member not found"
 *       500:
 *         description: Failed to return books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error when returning books"
 */

export {};
