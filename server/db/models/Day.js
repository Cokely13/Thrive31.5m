const Sequelize = require('sequelize');
const db = require('../db');

const Day = db.define('day', {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    unique: 'uniqueDayForUser',
  },
  mood: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 },
  },
  exercise: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 },
  },
  goals: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 },
  },
  sleep: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 },
  },
  nutrition: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Day;
