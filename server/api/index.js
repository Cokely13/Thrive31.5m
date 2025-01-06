const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/strengthstats', require('./strengthstats'));
router.use('/cardiostats', require('./cardiostats'));
router.use('/strengthtests', require('./strengthtests'));
router.use('/cardiotests', require('./cardiotests'));
router.use('/events', require('./events'));

// 404 error handling
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
