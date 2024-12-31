const Sequelize = require('sequelize');
const db = require('../db');

const StrengthTest = db.define('strengthTest', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['bench', 'squat', 'deadlift']], // Matches StrengthStats types
    },
  },
  result: {
    type: Sequelize.INTEGER,
    allowNull: false, // Represents the weight lifted in lbs
    validate: {
      min: 0,
    },
  },
  date: {
    type: Sequelize.DATEONLY, // Captures only day/month/year
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  effort: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10, // Scale from 1-10
    },
  },
});

module.exports = StrengthTest;
