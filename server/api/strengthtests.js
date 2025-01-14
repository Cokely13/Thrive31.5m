const router = require('express').Router();
const { models: { StrengthTest, StrengthStat } } = require('../db');

// Get all strength tests
router.get('/', async (req, res, next) => {
  try {
    const strengthTests = await StrengthTest.findAll();
    res.json(strengthTests);
  } catch (err) {
    next(err);
  }
});

// Get a single strength test by ID
router.get('/:id', async (req, res, next) => {
  try {
    const strengthTest = await StrengthTest.findByPk(req.params.id);
    res.json(strengthTest);
  } catch (err) {
    next(err);
  }
});

// Create a new strength test
router.post('/', async (req, res, next) => {
  try {
    // Create the new StrengthTest
    const test = await StrengthTest.create(req.body);

    // Find the associated StrengthStat
    const strengthStat = await StrengthStat.findOne({
      where: { userId: req.body.userId, type: req.body.type },
    });
    if (strengthStat) {
      // Update the record if the test result is higher
      if (test.result > strengthStat.record) {
        await strengthStat.update({ record: test.result });
      }
    }

    res.status(201).send(test);
  } catch (error) {
    next(error);
  }})

// Update a strength test by ID
router.put('/:id', async (req, res, next) => {
  try {
    const strengthTest = await StrengthTest.findByPk(req.params.id);
    res.send(await strengthTest.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a strength test by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const strengthTest = await StrengthTest.findByPk(req.params.id);
    await strengthTest.destroy();
    res.send(strengthTest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
