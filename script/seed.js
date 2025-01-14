'use strict';

const axios = require('axios');
const { db, models: { User, StrengthStat, CardioStat, StrengthTest, CardioTest, Event, Day, Race } } = require('../server/db');

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const API_KEY = 'udx9nyz6kwvh434tgxyhvymt';

  const fetchRaces = async () => {
    const BASE_URL = 'https://api.amp.active.com/v2/search';
    const MAX_RESULTS_PER_PAGE = 50; // Maximum allowed per API documentation
    let currentPage = 1;
    let totalResults = [];
    let hasMoreResults = true;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Throttling function

    try {
      while (hasMoreResults) {
        const response = await axios.get(BASE_URL, {
          params: {
            near: 'Massachusetts',
            topicName: 'Running OR Triathlon',
            category: 'Event',
            start_date: `${new Date().toISOString().split('T')[0]}..2025-12-31`, // From today to the end of 2025
            per_page: MAX_RESULTS_PER_PAGE,
            current_page: currentPage,
            api_key: API_KEY,
          },
        });

        const { results, total_results } = response.data;
        console.log(`Fetched ${results.length} results on page ${currentPage}.`);

        // Process each event
        const processedResults = results
          .map((event) => {
            // Attempt to extract distance from assetAttributes
            const distanceAttr = event.assetAttributes?.find(
              (attr) => attr.attributeType === 'Distance (running)'
            );

            // Fallback to extracting distance from the name
            const distanceFromName = event.assetName?.match(/\b(\d+(\.\d+)?\s?(K|k|km|mi|mile|Miles))\b/);

            return {
              name: event.assetName || 'Unnamed Event',
              date: event.activityStartDate || 'Date not available',
              location: `${event.place?.cityName || 'Unknown'}, ${event.place?.stateProvinceCode || 'Unknown'}`,
              url: event.registrationUrlAdr || event.urlAdr || 'No URL provided',
              distance: distanceAttr?.attributeValue || distanceFromName?.[0] || 'Unknown',
            };
          })
          // Exclude events with "Unknown" distance
          .filter((event) => event.distance !== 'Unknown');

        totalResults.push(...processedResults);

        // Check if there are more pages
        hasMoreResults = totalResults.length < total_results && results.length > 0;
        currentPage += 1;

        if (hasMoreResults) {
          await delay(500); // Delay for 500ms (2 requests per second allowed)
        }
      }

      console.log(`Total Valid Events Fetched: ${totalResults.length}`);
      return totalResults;
    } catch (error) {
      console.error('Error fetching events:', error.response?.data || error.message);
      return [];
    }
  };








    // Fetch and create races
    const racesData = await fetchRaces();
    const races = await Promise.all(
      racesData.map((raceData) => Race.create(raceData))
    );


  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'ryan', password: '123' }),
    User.create({ username: 'scott', password: '123' }),
  ]);

  // Creating Strength Stats
  const strengthStats = await Promise.all([
    StrengthStat.create({ userId: users[0].id, type: 'bench', record: 0 }),
    StrengthStat.create({ userId: users[1].id, type: 'squat', record: 0 }),
  ]);

  // Creating Cardio Stats
  const cardioStats = await Promise.all([
    CardioStat.create({ userId: users[0].id, type: 'mile', record: '00:00', averageTime: '00:00' }),
    CardioStat.create({ userId: users[1].id, type: '5k', record: '00:00', averageTime: '00:00' }),
  ]);

  // Creating Strength Tests
  const strengthTests = await Promise.all([
    StrengthTest.create({ userId: users[0].id, type: 'bench', result: 225, date: '2024-01-10', effort: 8 }),
    StrengthTest.create({ userId: users[0].id, type: 'bench', result: 235, date: '2024-06-15', effort: 9 }),
    StrengthTest.create({ userId: users[0].id, type: 'bench', result: 240, date: '2025-01-01', effort: 9 }),
    StrengthTest.create({ userId: users[1].id, type: 'squat', result: 300, date: '2024-02-20', effort: 7 }),
    StrengthTest.create({ userId: users[1].id, type: 'squat', result: 315, date: '2024-08-25', effort: 9 }),
    StrengthTest.create({ userId: users[1].id, type: 'squat', result: 320, date: '2025-01-02', effort: 10 }),
  ]);

  // Creating Cardio Tests
  const cardioTests = await Promise.all([
    CardioTest.create({ userId: users[0].id, type: 'mile', result: '6:40', date: '2024-03-05', effort: 7 }),
    CardioTest.create({ userId: users[0].id, type: 'mile', result: '6:20', date: '2024-07-10', effort: 9 }),
    CardioTest.create({ userId: users[0].id, type: 'mile', result: '6:15', date: '2025-01-01', effort: 8 }),
    CardioTest.create({ userId: users[1].id, type: '5k', result: '26:00', date: '2024-04-15', effort: 6 }),
    CardioTest.create({ userId: users[1].id, type: '5k', result: '24:30', date: '2024-09-20', effort: 8 }),
    CardioTest.create({ userId: users[1].id, type: '5k', result: '23:50', date: '2025-01-02', effort: 9 }),
  ]);

  // Creating Events
  const events = await Promise.all([
    Event.create({
      userId: users[0].id,
      name: 'Marathon Training Start',
      date: '2024-01-05',
      time: '07:00',
      eventType: 'Workout',
      importance: 'High',
    }),
    Event.create({
      userId: users[1].id,
      name: 'Squat Personal Best Attempt',
      date: '2024-02-20',
      time: '10:00',
      eventType: 'Workout',
      importance: 'Medium',
    }),
    Event.create({
      userId: users[0].id,
      name: 'Hyrox Competition',
      date: '2024-03-10',
      time: '09:00',
      eventType: 'Race',
      importance: 'High',
    }),
    Event.create({
      userId: users[1].id,
      name: 'Trail Running Meetup',
      date: '2024-04-15',
      time: '06:30',
      eventType: 'Personal',
      importance: 'Low',
    }),
  ]);

  // Creating Days
  const days = await Promise.all([
    Day.create({ userId: users[0].id, date: '2024-12-31', mood: 8, exercise: 7, goals: 6, sleep: 8, nutrition: 9 }),
    Day.create({ userId: users[0].id, date: '2025-01-01', mood: 9, exercise: 8, goals: 7, sleep: 9, nutrition: 8 }),
    Day.create({ userId: users[0].id, date: '2025-01-02', mood: 7, exercise: 9, goals: 8, sleep: 6, nutrition: 7 }),
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

    const formatTime = (time) => {
      const roundedTime = Math.round(time); // Round to the nearest second
      return `${Math.floor(roundedTime / 60)}:${String(roundedTime % 60).padStart(2, '0')}`;
    };

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
  console.log(`seeded ${events.length} events`);
  console.log(`seeded ${days.length} days`);
  console.log('seeded successfully');

  return {
    users,
    strengthStats,
    cardioStats,
    strengthTests,
    cardioTests,
    events,
    days,
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
