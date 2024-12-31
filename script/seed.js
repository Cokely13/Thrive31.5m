'use strict';

const { db, models: { User, StrengthExercise, CardioExercise } } = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', password: '123' }),
    User.create({ username: 'Scott', password: '123' }),
  ]);

  // Creating Strength Exercises
  const strengthExercises = await Promise.all([
    StrengthExercise.create({ userId: users[0].id, type: 'bench', currentBest: 225, goal: 250, date: '2024-12-29', effort: 8 }),
    StrengthExercise.create({ userId: users[1].id, type: 'squat', currentBest: 315, goal: 350, date: '2024-12-29', effort: 9 }),
  ]);

  // Creating Cardio Exercises
  const cardioExercises = await Promise.all([
    CardioExercise.create({ userId: users[0].id, type: 'mile', currentBest: '6:30', goal: '6:00', averageTime: '6:45', date: '2024-12-29', effort: 7 }),
    CardioExercise.create({ userId: users[1].id, type: '5k', currentBest: '25:00', goal: '24:00', averageTime: '26:00', date: '2024-12-29', effort: 6 }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${strengthExercises.length} strength exercises`);
  console.log(`seeded ${cardioExercises.length} cardio exercises`);
  console.log('seeded successfully');

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    strengthExercises,
    cardioExercises,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
