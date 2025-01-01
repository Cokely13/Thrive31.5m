const { DataTypes } = require('sequelize');
const db = require('../db'); // Adjust the path based on your project structure

// Define the Event model
const Event = db.define('event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  eventType: {
    type: DataTypes.ENUM('Race', 'Workout', 'Meeting', 'Personal', 'Other'),
    defaultValue: 'Other',
  },
  importance: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
});

module.exports = Event;
