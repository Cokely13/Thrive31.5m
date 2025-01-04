const router = require('express').Router();
const { models: { Day } } = require('../db');

// Get all days
router.get('/', async (req, res, next) => {
  try {
    const days = await Day.findAll();
    res.json(days);
  } catch (err) {
    next(err);
  }
});

// Get a single day by ID
router.get('/:id', async (req, res, next) => {
  try {
    const day = await Day.findByPk(req.params.id);
    res.json(day);
  } catch (err) {
    next(err);
  }
});

// Create a new day
router.post('/', async (req, res, next) => {
  try {
    const newDay = await Day.create(req.body);
    res.status(201).send(newDay);
  } catch (err) {
    next(err);
  }
});

// Update a day by ID
router.put('/:id', async (req, res, next) => {
  try {
    const day = await Day.findByPk(req.params.id);
    const updatedDay = await day.update(req.body);
    res.send(updatedDay);
  } catch (err) {
    next(err);
  }
});

// Delete a day by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const day = await Day.findByPk(req.params.id);
    await day.destroy();
    res.send(day);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
