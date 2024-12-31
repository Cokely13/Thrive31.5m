const router = require('express').Router();
const { models: { StrengthStat } } = require('../db');

// Get all strength stats
router.get('/', async (req, res, next) => {
  try {
    const strengthStats = await StrengthStat.findAll();
    res.json(strengthStats);
  } catch (err) {
    next(err);
  }
});

// Get a single strength stat by ID
router.get('/:id', async (req, res, next) => {
  try {
    const strengthStat = await StrengthStat.findByPk(req.params.id);
    res.json(strengthStat);
  } catch (err) {
    next(err);
  }
});

// Create a new strength stat
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await StrengthStat.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Update a strength stat by ID
router.put('/:id', async (req, res, next) => {
  try {
    const strengthStat = await StrengthStat.findByPk(req.params.id);
    res.send(await strengthStat.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a strength stat by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const strengthStat = await StrengthStat.findByPk(req.params.id);
    await strengthStat.destroy();
    res.send(strengthStat);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
