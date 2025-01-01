const Sequelize = require('sequelize');
const db = require('../db');

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  completionDate: {
    type: Sequelize.DATEONLY, // Captures only day/month/year
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
