const router = require('express').Router();
const { models: { Goal } } = require('../db');

// Get all goals
router.get('/', async (req, res, next) => {
  try {
    const goals = await Goal.findAll();
    res.json(goals);
  } catch (err) {
    next(err);
  }
});

// Get a single goal by ID
router.get('/:id', async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    res.json(goal);
  } catch (err) {
    next(err);
  }
});

// Create a new goal
router.post('/', async (req, res, next) => {
  try {
    const newGoal = await Goal.create(req.body);
    res.status(201).send(newGoal);
  } catch (err) {
    next(err);
  }
});

// Update a goal by ID
router.put('/:id', async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    const updatedGoal = await goal.update(req.body);
    res.send(updatedGoal);
  } catch (err) {
    next(err);
  }
});

// Delete a goal by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    await goal.destroy();
    res.send(goal);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
