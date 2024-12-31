const Sequelize = require('sequelize');
const db = require('../db');

const CardioTest = db.define('cardioTest', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['mile', '5k']], // Matches CardioStats types
    },
  },
  result: {
    type: Sequelize.STRING,
    allowNull: false, // Represents time in "minutes:seconds" format
    validate: {
      is: /^\d+:\d{2}$/, // Validates "minutes:seconds" format
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

module.exports = CardioTest;
