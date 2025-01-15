import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import cardioStatsReducer from './allCardioStatsStore'
import singleCardioStatReducer from './singleCardioStatStore';
import strengthStatsReducer from './allStrengthStatsStore';
import singleStrengthStatReducer from './singleStrengthStatStore';
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'
import auth from './auth'
import singleEventReducer from './singleEventStore'
import eventsReducer from './allEventsStore'
import singleBookReducer from './singleBookStore'
import booksReducer from './allBooksStore'
import singleGoalReducer from './singleGoalStore'
import goalsReducer from './allGoalsStore'
import daysReducer from './allDaysStore'
import singleDayReducer from './singleDayStore'
import cardioTestsReducer from './allCardioTestsStore'
import strengthTestsReducer from './allStrengthTestsStore'
import singleStrengthTestReducer from './singleStrengthTestStore'
import singleCardioTestReducer from './singleCardioTestStore'
import racesReducer from './allRacesStore'
import singleRaceReducer from './singleRaceStore'

const reducer = combineReducers({ auth,
  allCardioStats: cardioStatsReducer,
  singleCardioStat: singleCardioStatReducer,
  allStrengthStats: strengthStatsReducer,
  singleStrengthStat: singleStrengthStatReducer,
  allUsers: usersReducer,
  singleUser: singleUserReducer,
  allEvents: eventsReducer,
  singleEvent: singleEventReducer,
  singleBook: singleBookReducer,
  allBooks: booksReducer,
  singleGoal: singleGoalReducer,
  allGoals: goalsReducer,
  allDays: daysReducer,
  singleDay: singleDayReducer,
  allCardioTests: cardioTestsReducer,
  allStrengthTests: strengthTestsReducer,
  singleStrengthTest: singleStrengthTestReducer,
  singleCardioTest: singleCardioTestReducer,
  allRaces: racesReducer,
  singleRace: singleRaceReducer
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
