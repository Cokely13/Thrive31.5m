// Import necessary modules
const router = require('express').Router();
const { models: { Event, User}} = require('../db'); // Adjust path to models if needed

// GET /api/events - Get all events
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// GET /api/events/:id - Get a single event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    if (event) {
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/events - Create a new event
router.post('/', async (req, res, next) => {

  console.log("CHEC!!!!")
  try {
    const { name, date, time, eventType, importance, userId } = req.body;
    const newEvent = await Event.create({ name, date, time, eventType, importance, userId });
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

// PUT /api/events/:id - Update an event by ID
router.put('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      const updatedEvent = await event.update(req.body);
      res.json(updatedEvent);
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/events/:id - Delete an event by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
