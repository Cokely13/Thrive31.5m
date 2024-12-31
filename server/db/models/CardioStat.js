const Sequelize = require('sequelize');
const db = require('../db');

const CardioStat = db.define('cardioStat', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['mile', '5k']], // Add more types as needed
    },
  },
  record: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^\d+:\d{2}$/, // Validates "minutes:seconds" format
    },
  },
  goal: {
    type: Sequelize.STRING,
    validate: {
      is: /^\d+:\d{2}$/, // Validates "minutes:seconds" format
    },
  },
  averageTime: {
    type: Sequelize.STRING,
    validate: {
      is: /^\d+:\d{2}$/, // Validates "minutes:seconds" format
    },
  },
  unit: {
    type: Sequelize.STRING,
    defaultValue: 'minutes:seconds',
    allowNull: false,
  },
});

module.exports = CardioStat;
