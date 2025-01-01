const router = require('express').Router();
const { models: { Book } } = require('../db');

// Get all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Get a single book by ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
  } catch (err) {
    next(err);
  }
});

// Create a new book
router.post('/', async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).send(newBook);
  } catch (err) {
    next(err);
  }
});

// Update a book by ID
router.put('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    const updatedBook = await book.update(req.body);
    res.send(updatedBook);
  } catch (err) {
    next(err);
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.send(book);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
