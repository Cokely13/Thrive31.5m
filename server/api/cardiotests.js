const router = require('express').Router();
const { models: { CardioTest } } = require('../db');

// Get all cardio tests
router.get('/', async (req, res, next) => {
  try {
    const cardioTests = await CardioTest.findAll();
    res.json(cardioTests);
  } catch (err) {
    next(err);
  }
});

// Get a single cardio test by ID
router.get('/:id', async (req, res, next) => {
  try {
    const cardioTest = await CardioTest.findByPk(req.params.id);
    res.json(cardioTest);
  } catch (err) {
    next(err);
  }
});

// Create a new cardio test
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await CardioTest.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Update a cardio test by ID
router.put('/:id', async (req, res, next) => {
  try {
    const cardioTest = await CardioTest.findByPk(req.params.id);
    res.send(await cardioTest.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a cardio test by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const cardioTest = await CardioTest.findByPk(req.params.id);
    await cardioTest.destroy();
    res.send(cardioTest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
