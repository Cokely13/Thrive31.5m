const router = require('express').Router();
const { models: { User, StrengthStat, CardioStat, StrengthTest, CardioTest, Event, Book, Goal } } = require('../db');
module.exports = router;

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // Select only id and username
      attributes: ['id', 'username']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET a single user with all associated models
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username'],
      include: [
        { model: StrengthStat },
        { model: CardioStat },
        { model: StrengthTest },
        { model: CardioTest },
        { model: Event },
        { model: Book },
        { model: Goal},
      ],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
});
