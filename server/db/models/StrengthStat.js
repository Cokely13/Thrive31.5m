const Sequelize = require('sequelize');
const db = require('../db');

const StrengthStat = db.define('strengthStat', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['bench', 'squat', 'deadlift']], // Add more types as needed
    },
  },
  record: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  goal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  unit: {
    type: Sequelize.STRING,
    defaultValue: 'lbs',
    allowNull: false,
  },
});

module.exports = StrengthStat;
