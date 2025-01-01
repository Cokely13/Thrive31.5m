const Sequelize = require('sequelize');
const db = require('../db');

const Goal = db.define('goal', {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['exercise', 'reading', 'personal', 'work', 'other']], // Example categories
    },
    defaultValue: 'other',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  targetDate: {
    type: Sequelize.DATEONLY, // Captures only day/month/year
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM('pending', 'in progress', 'completed'),
    defaultValue: 'pending',
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Goal;
