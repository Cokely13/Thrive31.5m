const Sequelize = require('sequelize');
const db = require('../db');

const Race = db.define('race', {
  name: {
    type: Sequelize.STRING,
    allowNull: false, // Every race must have a name
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false, // The race must have a date
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false, // Location is required
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true, // Ensures it's a valid URL
    },
    allowNull: true, // URL is optional
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true, // Type of race (e.g., "Triathlon", "Marathon")
  },
  distance: {
    type: Sequelize.STRING,
    allowNull: true, // Distance of the race (e.g., "5K", "10K", "Ironman")
  },
});

module.exports = Race;
