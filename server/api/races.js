const router = require('express').Router();
const { models: { Race } } = require('../db');

// Get all races
router.get('/', async (req, res, next) => {
  try {
    const races = await Race.findAll();
    res.json(races);
  } catch (err) {
    next(err);
  }
});

// Get a single race by ID
router.get('/:id', async (req, res, next) => {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      res.json(race);
    } else {
      res.status(404).send('Race not found');
    }
  } catch (err) {
    next(err);
  }
});

// Create a new race
router.post('/', async (req, res, next) => {
  try {
    const newRace = await Race.create(req.body);
    res.status(201).send(newRace);
  } catch (err) {
    next(err);
  }
});

// Update a race by ID
router.put('/:id', async (req, res, next) => {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      const updatedRace = await race.update(req.body);
      res.send(updatedRace);
    } else {
      res.status(404).send('Race not found');
    }
  } catch (err) {
    next(err);
  }
});

// Delete a race by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      await race.destroy();
      res.send(race);
    } else {
      res.status(404).send('Race not found');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
