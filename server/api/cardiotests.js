const router = require('express').Router();
const { models: { CardioTest, CardioStat } } = require('../db');

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
    const test = await CardioTest.create(req.body);
    const allResults = await CardioTest.findAll({ where: { userId: req.body.userId, type: req.body.type } });
    const minTime = allResults.reduce((min, test) => (test.result < min ? test.result : min), allResults[0].result);
    const avgTime = allResults.reduce((total, test) => total + test.result.split(':').reduce((m, s) => m * 60 + +s, 0), 0) / allResults.length;
    const averageFormatted = `${Math.floor(avgTime / 60)}:${String(avgTime % 60).padStart(2, '0')}`;
    const cardioStat = await CardioStat.findOne({ where: { userId: req.body.userId, type: req.body.type } });
    if (cardioStat) {
      await cardioStat.update({ record: minTime, averageTime: averageFormatted });
    }
    res.status(201).send(test);
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
