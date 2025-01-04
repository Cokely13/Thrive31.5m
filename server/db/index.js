const db = require('./db');
const StrengthStat = require('./models/StrengthStat');
const CardioStat = require('./models/CardioStat');
const StrengthTest = require('./models/StrengthTest');
const CardioTest = require('./models/CardioTest');
const Book = require('./models/Book');
const Day = require('./models/Day');
const Goal = require('./models/Goal');
const Event = require('./models/Event')
const User = require('./models/User');

// Associations go here!
// A User has many StrengthStats
User.hasMany(StrengthStat, { foreignKey: 'userId', onDelete: 'CASCADE' });
StrengthStat.belongsTo(User, { foreignKey: 'userId' });

// A User has many CardioStats
User.hasMany(CardioStat, { foreignKey: 'userId', onDelete: 'CASCADE' });
CardioStat.belongsTo(User, { foreignKey: 'userId' });

// A User has many StrengthTests
User.hasMany(StrengthTest, { foreignKey: 'userId', onDelete: 'CASCADE' });
StrengthTest.belongsTo(User, { foreignKey: 'userId' });

// A User has many CardioTests
User.hasMany(CardioTest, { foreignKey: 'userId', onDelete: 'CASCADE' });
CardioTest.belongsTo(User, { foreignKey: 'userId' });

// A User has many Events
User.hasMany(Event, { foreignKey: 'userId', onDelete: 'CASCADE' });
Event.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Book, { foreignKey: 'userId', onDelete: 'CASCADE' });
Book.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Goal, { foreignKey: 'userId', onDelete: 'CASCADE' });
Goal.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Day, { foreignKey: 'userId', onDelete: 'CASCADE' });
Day.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  db,
  models: {
    User,
    StrengthStat,
    CardioStat,
    StrengthTest,
    CardioTest,
    Event,
    Book,
    Goal,
    Day
  },
};
