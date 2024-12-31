'use strict';

const { db, models: { User, StrengthStat, CardioStat, StrengthTest, CardioTest } } = require('../server/db');

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  // Creating Strength Stats
  const strengthStats = await Promise.all([
    StrengthStat.create({ userId: users[0].id, type: 'bench', record: 0 }), // Temporary record value
    StrengthStat.create({ userId: users[1].id, type: 'squat', record: 0 }), // Temporary record value
  ]);

  // Creating Cardio Stats
  const cardioStats = await Promise.all([
    CardioStat.create({ userId: users[0].id, type: 'mile', record: '00:00', averageTime: '00:00' }), // Temporary values
    CardioStat.create({ userId: users[1].id, type: '5k', record: '00:00', averageTime: '00:00' }), // Temporary values
  ]);

  // Creating Strength Tests
  const strengthTests = await Promise.all([
    StrengthTest.create({ userId: users[0].id, type: 'bench', result: 225, date: '2024-12-30', effort: 8 }),
    StrengthTest.create({ userId: users[0].id, type: 'bench', result: 235, date: '2024-12-31', effort: 9 }),
    StrengthTest.create({ userId: users[1].id, type: 'squat', result: 300, date: '2024-12-30', effort: 7 }),
    StrengthTest.create({ userId: users[1].id, type: 'squat', result: 315, date: '2024-12-31', effort: 9 }),
  ]);

  // Creating Cardio Tests
  const cardioTests = await Promise.all([
    CardioTest.create({ userId: users[0].id, type: 'mile', result: '6:40', date: '2024-12-30', effort: 7 }),
    CardioTest.create({ userId: users[0].id, type: 'mile', result: '6:20', date: '2024-12-31', effort: 9 }),
    CardioTest.create({ userId: users[1].id, type: '5k', result: '26:00', date: '2024-12-30', effort: 6 }),
    CardioTest.create({ userId: users[1].id, type: '5k', result: '24:30', date: '2024-12-31', effort: 8 }),
  ]);

  // Update StrengthStat Records
  for (const stat of strengthStats) {
    const maxResult = await StrengthTest.max('result', {
      where: { userId: stat.userId, type: stat.type },
    });
    await stat.update({ record: maxResult });
  }

  // Update CardioStat Records
  for (const stat of cardioStats) {
    const tests = await CardioTest.findAll({
      where: { userId: stat.userId, type: stat.type },
    });

    const times = tests.map(test => {
      const [minutes, seconds] = test.result.split(':').map(Number);
      return minutes * 60 + seconds;
    });

    const minTime = Math.min(...times);
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;

    const formatTime = time => `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`;

    await stat.update({
      record: formatTime(minTime),
      averageTime: formatTime(avgTime),
    });
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${strengthStats.length} strength stats`);
  console.log(`seeded ${cardioStats.length} cardio stats`);
  console.log(`seeded ${strengthTests.length} strength tests`);
  console.log(`seeded ${cardioTests.length} cardio tests`);
  console.log('seeded successfully');

  return {
    users,
    strengthStats,
    cardioStats,
    strengthTests,
    cardioTests,
  };
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
