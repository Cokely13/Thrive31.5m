const router = require('express').Router();
const { models: { CardioStat } } = require('../db');

// Get all cardio stats
router.get('/', async (req, res, next) => {
  try {
    const cardioStats = await CardioStat.findAll();
    res.json(cardioStats);
  } catch (err) {
    next(err);
  }
});

// Get a single cardio stat by ID
router.get('/:id', async (req, res, next) => {
  try {
    const cardioStat = await CardioStat.findByPk(req.params.id);
    res.json(cardioStat);
  } catch (err) {
    next(err);
  }
});

// Create a new cardio stat
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await CardioStat.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Update a cardio stat by ID
router.put('/:id', async (req, res, next) => {
  try {
    const cardioStat = await CardioStat.findByPk(req.params.id);
    res.send(await cardioStat.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a cardio stat by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const cardioStat = await CardioStat.findByPk(req.params.id);
    await cardioStat.destroy();
    res.send(cardioStat);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
